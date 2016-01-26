# superBoards

[Heroku link][heroku]

[heroku]: http://superboards.herokuapp.com

## Minimum Viable Product

superBoards is a web application inspired by Trello built using Ruby on Rails and React.js. superBoards allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create an account
- [X] Log in / Log out
- [ ] Create, read, edit, and delete boards
- [ ] Create, read, edit, and delete lists
- [ ] Create, read, edit, and delete cards
- [ ] Organize cards and lists within boards
- [ ] Create, read, edit, and delete comments on cards
- [ ] Boards can be shared between users
- [ ] Tag cards with multiple tags and search cards by tag
- [ ] Search through cards for blocks of text

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Board Model and JSON API (1 day)

In Phase 1, I'll implement user signup and authentication (using BCrypt). After signup or signin, there will be a page containing the application's root React component. I will then setup the beginning JSON API for Boards before moving on to other models.

[Details][phase-one]

### Phase 2: Flux Architecture, Board and List CRUD (2.5 days)

Phase 2 will be focused on setting up Flux, the React router, and the React component structure for the main application. After the initial setup of Flux, a Board store will be implemented along with actions for basic CRUD functions. I will then create React views for `BoardsIndex`, `BoardsIndexItem`, and `BoardDetailView`. Afterwards, I will implement the List JSON API and also implement the `ListView` React components. At this point in time Board and List objects will have CRUD functionality, but Cards will not yet be accessible in the browser.

[Details][phase-two]

### Phase 3: Card CRUD and Tags (2 days)

Phase 3 adds organization to the Notes. Notes belong to a Notebook, which has
its own `Index` view. Create JSON API for Notebooks. Notes can also now be
tagged with multiple tags. Users can bring up notes in a separate `SearchIndex`
view by searching for their tags. Once the tag search is implemented, I will
extend this to a fuzzy search through every Note's content.

Phase 3 will add Card CRUD functionality to the application. Card data will be added to the JSON API, and `Card` components will be visible within the `ListView`. clicking a `Card` will bring the user to the `CardDetailView` where most of the data for Card objects will be accessible.

[Details][phase-three]

### Phase 4: Drag and drop fuctionality for Lists and Cards (1.5 days)

Using React Drag and Drop, drag-and-drop functionality will be added to Lists and Cards within the BoardDetailView.


[Details][phase-four]

### Phase 5: Comment CRUD added to cards (1 day)

In Phase 4, Comment CRUD functionality will be added within the `CardDetailView`. The `CommentIndexView` will be added along with nested `CommentIndexItem`s and a `NewCommentForm` component.

[Details][phase-five]





### Bonus Features (TBD)
- [ ] Changelogs for Cards
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
