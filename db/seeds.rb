# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(username: "GuestUser", password: "GuestUser")
User.create(username: "GuestUser2", password: "GuestUser2")


# workout board and lists
Board.create(title: "Workouts", author_id: 1)
List.create(title: "Monday", board_id: 1, ord: 1, archived: false)
Card.create!(title: "Push-ups", list_id: 1, ord: 1, archived: false, author_id: 1)
Card.create!(title: "Pull-ups", list_id: 1, ord: 2, archived: false, author_id: 1)
Card.create!(title: "Deadlifts", list_id: 1, ord: 3, archived: false, author_id: 1)
List.create(title: "Wednesday", board_id: 1, ord: 2, archived: false)
Card.create(title: "Bench Press", list_id: 2, ord: 1, archived: false, author_id: 1)
Card.create(title: "Barbell row", list_id: 2, ord: 2, archived: false, author_id: 1)
Card.create(title: "Barbell squats", list_id: 2, ord: 3, archived: false, author_id: 1)
List.create(title: "Friday", board_id: 1, ord: 3, archived: false)
Card.create(title: "Barbell squats", list_id: 3, ord: 1, archived: false, author_id: 1)
Card.create(title: "Kettlebell swings", list_id: 3, ord: 2, archived: false, author_id: 1)
Card.create(title: "Cardio", list_id: 3, ord: 3, archived: false, author_id: 1)


# other boards
Board.create(title: "Groceries", author_id: 1)
Board.create(title: "Class Notes", author_id: 1)
Board.create(title: "Projects", author_id: 1)
