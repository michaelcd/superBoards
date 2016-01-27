Current Notes

Outstanding issues:
- Logout button somewhere (temporary version)
- Minor issue: Value persists in Create Board form after board creation; will later
route to BoardDetailView so should be a nonissue;
- refactor: no camel case names in CSS class names. prefer dashed names










BoardIndex View
- boards are sorted alphabetically (do on Rails side)

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
