class Comment < ActiveRecord::Base
  validates :body, :author_id, :card_id, presence: true

  belongs_to :card

end
