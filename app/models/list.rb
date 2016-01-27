class List < ActiveRecord::Base
  validates :ord, :title, :board_id, presence: true
  validates :archived, inclusion: [true, false]

  belongs_to :board
  has_many :cards

end
