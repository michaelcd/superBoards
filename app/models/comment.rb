class Comment < ActiveRecord::Base
  validates :body, :author_id, :card_id, presence: true

  belongs_to :card
  belongs_to :author, class_name: "User", foreign_key: :author_id

end
