# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(username: "GuestUser", password: "GuestUser")
User.create(username: "GuestUser2", password: "GuestUser2")
User.create(username: "TrollUser", password: "TrollUser")

# AppAcademy Boards
Board.create(title: "App Academy", author_id: 1)

List.create(title: "TAs", board_id: 1, ord: 0, archived: false)
Card.create(title: "Dan", list_id: 1, ord: 0, archived: false, author_id: 1)
Card.create(title: "Tommy", list_id: 1, ord: 1, archived: false, author_id: 1)
Card.create(title: "Carl", list_id: 1, ord: 2, archived: false, author_id: 1)
Card.create(title: "Lily", list_id: 1, ord: 3, archived: false, author_id: 1)
Card.create(title: "Fred", list_id: 1, ord: 4, archived: false, author_id: 1)

List.create(title: "Cats", board_id: 1, ord: 1, archived: false)
Card.create(title: "Gizmo", list_id: 2, ord: 0, archived: false, author_id: 1)
Card.create(title: "Sennacy", list_id: 2, ord: 1, archived: false, author_id: 1)
Card.create(title: "Breakfast", list_id: 2, ord: 2, archived: false, author_id: 1)

List.create(title: "Languages", board_id: 1, ord: 2, archived: false)
Card.create(title: "CSS", list_id: 3, ord: 0, archived: false, author_id: 1)
Card.create(title: "Ruby", list_id: 3, ord: 1, archived: false, author_id: 1)
Card.create(title: "Javascript", list_id: 3, ord: 2, archived: false, author_id: 1)
Card.create(title: "SQL", list_id: 3, ord: 3, archived: false, author_id: 1)
Card.create(title: "HTML", list_id: 3, ord: 4, archived: false, author_id: 1)

List.create(title: "Frameworks / Libraries", board_id: 1, ord: 3, archived: false)
Card.create(title: "Flux", list_id: 4, ord: 0, archived: false, author_id: 1)
Card.create(title: "Rails", list_id: 4, ord: 1, archived: false, author_id: 1)
Card.create(title: "JQuery", list_id: 4, ord: 2, archived: false, author_id: 1)
Card.create(title: "React", list_id: 4, ord: 3, archived: false, author_id: 1)

List.create(title: "Pods", board_id: 1, ord: 4, archived: false)
Card.create(title: "East Village", list_id: 5, ord: 0, archived: false, author_id: 1)
Card.create(title: "Harlem", list_id: 5, ord: 1, archived: false, author_id: 1)
Card.create(title: "Brooklyn", list_id: 5, ord: 2, archived: false, author_id: 1)
Card.create(title: "Soho", list_id: 5, ord: 3, archived: false, author_id: 1)

List.create(title: "Jonathan", board_id: 1, ord: 5, archived: false)
ycdi = Card.create(title: "You can do it!", list_id: 6, ord: 0, archived: false, author_id: 1)

# some test comments
# Comment.create(body: "Good morning everybody!", author_id: 3, card_id: 2)
# Comment.create(body: "Breaktime everybody!", author_id: 3, card_id: 2)
# Comment.create(body: "Alright it's 6 o'clock!", author_id: 3, card_id: 2)
# Comment.create(body: "Good morning pod!", author_id: 3, card_id: 4)
# Comment.create(body: "You can do it!", author_id: 3, card_id: ycdi.id)
# Comment.create(body: "You can do it!", author_id: 3, card_id: ycdi.id)
# Comment.create(body: "You can do it!", author_id: 3, card_id: ycdi.id)

# AppTour board and lists

demo_board = Board.create(title: "Welcome to superBoards. Click this board!", author_id: 1)
demo_board.shares.create(user_id: 2)
demo_list_1 = demo_board.lists.create(title: "Cards", ord: 0)
demo_list_2 = demo_board.lists.create(title: "Lists", ord: 1)
demo_list_3 = demo_board.lists.create(title: "Boards", ord: 2)

demo_list_1.cards.create(title: "Welcome to superBoards!", ord: 0, author_id: 1)
demo_list_1.cards.create(title: "This is a card.", ord: 1, author_id: 1)
demo_list_1.cards.create(title: "Click it to see more information about the card.", ord: 2, author_id: 1)

demo_list_2.cards.create(title: "You can have many lists within a board.", ord: 0)
demo_list_2.cards.create(title: "And many cards within those lists.", ord: 1)
demo_list_2.cards.create(title: "You can also reorder lists by dragging them.", ord: 2)
demo_list_2.cards.create(title: "Guess what? YOu can drag and drop cards too.", ord: 3)
demo_list_2.cards.create(title: "Try it. (We insist)", ord: 3)
