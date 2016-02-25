class Board < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title]

  validates :title, :author_id, presence: true
  validates :archived, inclusion: [true, false]

  has_many :lists
  has_many :shares, class_name: "BoardShare", foreign_key: :board_id
  has_many :cards, through: :lists
  # board has many users, through board shares

  def self.create_demo_board(user)
    user_id = user.id
    demo_board = Board.create(title: "Welcome to superBoards. Click this board!", author_id: user_id)
    demo_list_1 = demo_board.lists.create(title: "Cards", ord: 0)
    demo_list_2 = demo_board.lists.create(title: "Lists", ord: 1)
    demo_list_3 = demo_board.lists.create(title: "Boards", ord: 2)
    demo_list_1.cards.create(title: "Welcome to superBoards!", ord: 0, author_id: user_id)
    demo_list_1.cards.create(title: "This is a card.", ord: 1, author_id: user_id)
    demo_card = demo_list_1.cards.create(title: "Click this card to see more details.", ord: 2, author_id: user_id, description: "Cards can have a brief description.")
    demo_list_2.cards.create(title: "You can have many lists within a board.", ord: 0, author_id: user_id)
    demo_list_2.cards.create(title: "And many cards within those lists.", ord: 1, author_id: user_id)
    demo_list_2.cards.create(title: "You can also reorder lists by dragging them.", ord: 2, author_id: user_id)
    demo_list_2.cards.create(title: "Guess what? You can drag and drop cards too.", ord: 3, author_id: user_id)
    demo_list_2.cards.create(title: "Try it. (We insist)", ord: 4, author_id: user_id)
    demo_list_3.cards.create(title: "Boards hold all your content in superBoards.", ord: 0, author_id: user_id)
    demo_list_3.cards.create(title: "Boards can be shared with other users to collaborate!", ord: 1, author_id: user_id)
    demo_list_3.cards.create(title: "Sharing options are available in the board menu.", ord: 2, author_id: user_id)
    demo_list_3.cards.create(title: "Once you're finished with a board, you can archive it.", ord: 3, author_id: user_id)
    demo_list_3.cards.create(title: "Please note, only the owner of a board can share or archive it.", ord: 4, author_id: user_id)
    demo_card.comments.create(body: "Cards can also have comments.", author_id: 2)
    demo_card.comments.create(body: "All users that have access to a board can leave comments.", author_id: 2)
  end
end
