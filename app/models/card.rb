class Card < ActiveRecord::Base
  validates :ord, :title, :author_id, :list_id, presence: true
  validates :archived, inclusion: [true, false]

  belongs_to :list
  has_one :board, through: :list
  has_many :comments

  def self.reorder_cards(cards_array)
    cards_array.each_with_index do |card, index|
      card.ord = index
      card.save
    end
    cards_array
  end

  def self.move_card_within_list(from, to, cards)
    cards = cards.sort_by { |card| card.ord }
    changed_card = cards[from]
    cards.delete(changed_card)
    cards.insert(to, changed_card)
    self.reorder_cards(cards)
  end

  def self.move_card_between_lists(card, destination_list_id, destination_ord)
    original_list_cards = card.list.cards.to_a
    original_list_cards.delete(card)
    self.reorder_cards(original_list_cards)

    card.list_id = destination_list_id
    card.ord = List.find_by_id(destination_list_id).cards.to_a.length
    card.save

    destination_cards = card.list.cards.to_a
    self.move_card_within_list(card.ord, destination_ord, destination_cards)
  end
end
