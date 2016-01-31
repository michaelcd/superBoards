# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(username: "GuestUser", password: "GuestUser")
User.create(username: "GuestUser2", password: "GuestUser2")

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
Card.create(title: "You can do it!", list_id: 6, ord: 0, archived: false, author_id: 1)

# AppTour board and lists

Board.create(title: "superBoards Tour", author_id: 1)
