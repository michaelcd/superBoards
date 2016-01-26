class Board < ActiveRecord::Base

  validates :title, :author_id, presence: true
  validates :archived, inclusion: [true, false]

  # board has many users, through board shares




end