# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(username: "GuestUser", password: "GuestUser")
User.create(username: "GuestUser2", password: "GuestUser2")
Board.create(title: "Groceries", author_id: 1)
Board.create(title: "Class Notes", author_id: 1)
Board.create(title: "Projects", author_id: 1)
