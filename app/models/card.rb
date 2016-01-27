class Card < ActiveRecord::Base
  validates :ord, :title, :body, :author_id, :list_id, presence: true
  validates :archived, inclusion: [true, false]

end
