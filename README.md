## superBoards

[Live Site][site]

[site]: http://www.superboards.xyz

<img src="sboards.png" width="600" height="331" />

superBoards is a web application inspired by Trello built using Ruby on Rails and React.js.

###Drag-and-drop functionality
Using [React-DnD], drag and drop was implemented on `ListWrapper` and `CardWrapper` components. When a dragged object is dropped, an AJAX request is sent to the Rails controller to update the list or card with the new position. The `BoardStore` receives the updated JSON data, emits it's changed to listening components causing the `BoardDetailView` to update with the lists/cards in the new order.

### Authentication using BCrypt and Omniauth
[BCrypt] was used to hash users' passwords, which is then stored in the `User.password_digest` attribute. This improves site security as passwords are never stored in an SQL database.

[Omniauth-facebook] was also used to allow login for facebook users without creating a new account.

### Full text search using PgSearch
[PgSearch] was implemented to allow full text search of `Boards`, `Lists`, and `Cards`. All searchable models in Rails are given a polymorphic association to create one searchable join table in the database. Users can search by typing into a React `Search` component, which will send AJAX requests and then receive JSON data from Rails via the `SearchResultsStore`.


[BCrypt]: https://github.com/codahale/bcrypt-ruby
[Omniauth-facebook]: https://github.com/mkdynamic/omniauth-facebook
[React-DnD]: https://github.com/gaearon/react-dnd
[PgSearch]: https://github.com/Casecommons/pg_search
