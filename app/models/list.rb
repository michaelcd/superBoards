class List < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title]

  validates :ord, :title, :board_id, presence: true
  validates :archived, inclusion: [true, false]
  # validates :ord, uniqueness: { scope: :board }

  belongs_to :board
  has_many :cards

  # def self.reorder_lists(from, to, lists)
  #   lists = lists.sort_by { |list| list.ord }
  #
  #   changed_list = lists[from]
  #   lists.delete(changed_list)
  #   lists.insert(to, changed_list)
  #
  #   lists.each_with_index do |list, index|
  #     list.ord = index
  #     list.save
  #   end
  # end

  def self.reorder_lists(lists_array)
    lists_array.each_with_index do |list, index|
      list.ord = index
      list.save
    end
    lists_array
  end

  def self.move_list_within_board(from, to, lists)
    lists = lists.sort_by { |list| list.ord }
    changed_list = lists[from]
    lists.delete(changed_list)
    lists.insert(to, changed_list)
    lists = lists.select {|list| !list.nil?}
    self.reorder_lists(lists)
  end
end
