Current Notes

<i class="fa fa-EXAMPLE fa-fw">
fontawesome icons to use:
fa-caret-square-o-down
angle-down
angle-double-down
archive
pencil
search
plus
minus

Weekend:
[X] - List.jsx: CancelHandler no longer works - refactor for if/else statement on form render
[X] - CSS - scrollbar at bottom of window
[ ] - Drag and drop cards between lists
[ ] - Card and List options menus
[ ] - Card renaming / Card Detail view
[ ] - Card and List archival




[ ] - Refactor pop up forms using if/else and variables
  [ ] - NewBoardIndexItem
  [ ] - BoardMenu
  [ ] - BoardDetailView - board renaming pop up
  [ ] - BoardMenu component

[ ] - SeedData
[ ] - CardDetailView, CRUD functions
[ ] - Change BoardsController#show to retrieve only non-archived cards
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

React DnD tutorial:
http://gaearon.github.io/react-dnd/docs-tutorial.html

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

Friday 01/29/16
[X] - Refactored Jbuilder views and Board/List/Card controllers
[X] - eliminated bugs related to board presentation / JSON object sorting
[X] - add logic to card.rb and list.rb : moving card/list when
      from < to
[X] - CSS styling on new list form
[X] - DRY up CSS styles for forms, cards
[X] - FIXED: lists aren't sorted when initially sent to BoardDetailView
[X] - Drag and drop for Lists
[X] - Drag and drop Cards within one list
