class Card < ActiveRecord::Base
  validates :ord, :title, :author_id, :list_id, presence: true
  validates :archived, inclusion: [true, false]

  belongs_to :list
  has_one :board, through: :list
end
