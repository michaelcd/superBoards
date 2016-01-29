class Card < ActiveRecord::Base
  validates :ord, :title, :author_id, :list_id, presence: true
  validates :archived, inclusion: [true, false]

  belongs_to :list
  has_one :board, through: :list

  def self.reorder_cards(from, to, cards)
    cards = cards.sort_by { |card| card.ord }

    changed_card = cards[from]
    cards.delete(changed_card)
    cards.insert(to, changed_card)

    # 
    # if from > to
    # else
    #   cards.insert(to + 1, changed_card)
    # end

    cards.each_with_index do |card, index|
      card.ord = index
      card.save
    end
  end

  def self.sort_ord(cards)
    cards = cards.sort_by { |card| card.ord }


  end

end
