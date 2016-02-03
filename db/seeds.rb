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
Comment.create(body: "Good morning everybody!", author_id: 3, card_id: 2)
Comment.create(body: "Breaktime everybody!", author_id: 3, card_id: 2)
Comment.create(body: "Alright it's 6 o'clock!", author_id: 3, card_id: 2)
Comment.create(body: "Good morning pod!", author_id: 3, card_id: 4)
Comment.create(body: "You can do it!", author_id: 3, card_id: ycdi.id)
Comment.create(body: "You can do it!", author_id: 3, card_id: ycdi.id)
Comment.create(body: "You can do it!", author_id: 3, card_id: ycdi.id)


# AppTour board and lists

board_b = Board.create(title: "In superBoards, you have boards. Click this one", author_id: 2)
BoardShare.create(board_id: board_b.id, user_id: 1)
a = List.create(title: "And boards have lists.", board_id: board_b.id, ord: 0, archived: false)
a.cards.create(title: "And lists have cards.", ord: 0, archived: false, author_id: 2)
b = List.create(title: "Cards can be dragged between lists.", board_id: board_b.id, ord: 1, archived: false)
Card.create(title: "Try dragging this card.", list_id: b.id, author_id: 2, archived: false, ord: 0)
Card.create(title: "Or this card.", list_id: b.id, author_id: 2, archived: false, ord: 1)
Card.create(title: "Or this one", list_id: b.id, author_id: 2, archived: false, ord: 2)
c = List.create(title: "Cards can also have comments.", board_id: board_b.id, ord: 2, archived: false)
comment_card = Card.create(title: "This card has some comments.", list_id: c.id, author_id: 2, archived: false, ord: 0)
Card.create(title: "Click that card to see comments!!", list_id: c.id, author_id: 2, archived: false, ord: 1)
comment_card.comments.create(body: "I'm commenting!", author_id: 1)
comment_card.comments.create(body: "I'm commenting too!", author_id: 2)
