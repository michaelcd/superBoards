class BoardShare < ActiveRecord::Base
  validates :user_id, :board_id, presence: true

  belongs_to :user
  belongs_to :board

end
