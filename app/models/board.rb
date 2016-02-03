class Board < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title]

  validates :title, :author_id, presence: true
  validates :archived, inclusion: [true, false]

  has_many :lists
  has_many :shares, class_name: "BoardShare", foreign_key: :board_id
  has_many :cards, through: :lists
  # board has many users, through board shares




end
