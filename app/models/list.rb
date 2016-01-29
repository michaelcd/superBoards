class List < ActiveRecord::Base
  validates :ord, :title, :board_id, presence: true
  validates :archived, inclusion: [true, false]
  # validates :ord, uniqueness: { scope: :board }

  belongs_to :board
  has_many :cards

  def self.reorder_lists(from, to, lists)
    lists = lists.sort_by { |list| list.ord }

    changed_list = lists[from]
    lists.delete(changed_list)
    lists.insert(to, changed_list)

    # 
    # if from > to
    # elsif from < to
    #   lists.insert(to + 1, changed_list)
    # end


    lists.each_with_index do |list, index|
      list.ord = index
      list.save
    end
  end
end
