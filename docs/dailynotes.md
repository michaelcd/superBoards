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
ellipsis-h


[ ] - Boards - prepare Rails for sharing functionality
[ ] - Navbar Board button component
[ ] - Card Detail View - CSS

CSS:
[ ] Link areas to widen: List title - click for rename
[ ] Link areas to widen: Card title - click to bring up card detail
[ ] NewCard add / close
[ ] BoardDetail menu CSS
[ ] BoardDetail - rename
[ ] NewBoardIndexItem - CSS
[ ]
[ ]
[ ]

[ ] - SeedData

Major features remaining:
[ ] - Tags
[ ] - Comments
[ ] - file uploads
[ ] - full text search
[ ] - Board Sharing


Polish / Optional :
[ ] - drag and drop previews
[ ] - rewrite loading screen
[ ] - Archived Boards View
[ ] - Refactor pop up forms using if/else and variables
  [ ] - NewBoardIndexItem
  [ ] - BoardMenu
  [ ] - BoardDetailView - board renaming pop up
  [ ] - BoardMenu component

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

Weekend:
[X] - List.jsx: CancelHandler no longer works - refactor for if/else statement on form render
[X] - CSS - scrollbar at bottom of window
[X] - List CRUD complete (create, reorder, rename, archive, destroy)
[X] - Drag and drop cards between lists
[X] - FontAwesome added to app. Several icons currently in use

Monday - Feb 1st
[X] - React Auth
[X] - Bug: new list no longer works
[X] - refactor CSS and pop-up menus
[X] - User menu - logout option
[X] - React login
[X] - redirect to login
[X] - Card renaming / Card Detail view
[X] - Card CRUD
[X] - Card Detail View - add side actions menu (archival and delete)
[X] - be able to refresh carddetailview without breaking it
