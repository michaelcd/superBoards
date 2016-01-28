Current Notes

Phase 2.5

Schedule:
Thursday - List and Cards CRUD in React
Friday - Drag and drop

Thursday:
[ ] - Issue - cancel board rename redirects to index


[ ] - Flux cycle for List CRUD
[ ] - NewList component; List creation in BoardDetail
[ ] - ListNameUpdate; Edit List name in BoardDetail
[ ] - Board Options Menu - archival / destroy
[ ] - Change BoardsController#index to retrieve only non-archived boards
[ ] - Change BoardsController#show to retrieve only non-archived lists/cards
[ ] - Implement Card component (basic list item with title to start)
[ ] - CardDetailView for CRUD options


Friday
[ ] - Drag and drop
[ ] - Board Sharing

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
