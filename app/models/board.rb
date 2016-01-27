class Board < ActiveRecord::Base

  validates :title, :author_id, presence: true
  validates :archived, inclusion: [true, false]

  has_many :lists
  has_many :cards, through: :lists
  # board has many users, through board shares




end
