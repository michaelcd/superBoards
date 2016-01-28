Current Notes

Phase 2.5

Schedule:
Friday - Drag and drop

Friday 01/29/16
[ ] - Refactor pop up forms using if/else and variables
  [ ] - NewBoardIndexItem
  [ ] - BoardMenu
  [ ] - BoardDetailView - board renaming pop up
  [ ] - BoardMenu component
[ ] - SeedData
[ ] - CardDetailView, CRUD functions
[ ] - Change BoardsController#show to retrieve only non-archived cards

Friday
[ ] - Drag and drop
[ ] - React Auth
[ ] - Board Sharing


[ ] - Archived Boards View
[ ]- Refactor List controller and views (right now duplicates board partials)

Outstanding issues:

- Logout button somewhere (temporary version)
- Minor issue: Value persists in Create Board form after board creation; will later
route to BoardDetailView so should be a nonissue;
- refactor: no camel case names in CSS class names. prefer dashed names
- File upload: attachments to cards

Review Lily's email
- Board sharing
- Style and seed as you go
- Implement search next week

check out fontawesome for icons
https://fortawesome.github.io/Font-Awesome/

Drop and reseed database:
rake db:drop db:create db:migrate db:seed

daily setup:
cd desktop
git clone https://github.com/michaelcd/superBoards.git
cd superBoards
npm install
rake db:create db:migrate db:seed
atom .



Thursday 01/28/16
[X] - Issue - cancel board rename redirects to index
[X] - ApiUtil for List CRUD
[X] - NewList component; List creation in BoardDetail
[X] - ListNameUpdate; Edit List name in BoardDetail
[X] - Change BoardsController#index to retrieve only non-archived boards
[X] - Change BoardsController#show to retrieve only non-archived lists
[X] - Implement Card component (basic list item with title to start)
[X] - Implement Board Archival
[X] - CSS styling - board detail page, cards
[X] - Card creation inside List
[X] - NewList + NewCard component: retains previous new list name after list created
[X] - ApiUtil Card functions (destroyCard)
