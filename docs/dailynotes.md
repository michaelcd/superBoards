Current Notes

Phase 2.5

Schedule:
Thursday - List and Cards CRUD in React
Friday - Drag and drop

Thursday:
[X] - Issue - cancel board rename redirects to index
[X] - Flux cycle for List CRUD
[X] - NewList component; List creation in BoardDetail
[X] - ListNameUpdate; Edit List name in BoardDetail
[ ] - Board Options Menu - archival / destroy
[X] - Change BoardsController#index to retrieve only non-archived boards
[X] - Change BoardsController#show to retrieve only non-archived lists
[ ] - Change BoardsController#show to retrieve only non-archived cards
[X] - Implement Card component (basic list item with title to start)
[ ] - CardDetailView for CRUD options


Friday
[ ] - Drag and drop
[ ] - ReactAuth
[ ] - Board Sharing

Outstanding issues:
- NewList component: retains previous new list name after list created
- Refactor List controller and views (right now duplicates board partials)
- Logout button somewhere (temporary version)
- Minor issue: Value persists in Create Board form after board creation; will later
route to BoardDetailView so should be a nonissue;
- refactor: no camel case names in CSS class names. prefer dashed names
- File upload: attachments to cards

Review Lily's email
- Board sharing
- Style and seed as you go
- Implement search next week

Review JBuilder
- JBuilder templates required once List / Cards added

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
