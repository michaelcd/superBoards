# Phase 3: Card CRUD and Tags (2 days)

## Rails
### Models
* Card
* Tag

### Controllers
* Api::CardsController (create, destroy, index, show, update)

### Views
* cards/index.json.jbuilder
* cards/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* ListView
  - Card
  - NewListItem
* CardDetailView

### Stores
* Card

### Actions
* ApiActions.receiveAllCards -> triggered by ApiUtil
* ApiActions.receiveSingleCard
* ApiActions.deleteCard
* CardActions.fetchAllCards -> triggers ApiUtil
* CardActions.fetchSingleCard
* CardActions.createCard
* CardActions.editCard
* CardActions.destroyCard

### ApiUtil
* ApiUtil.fetchAllCards
* ApiUtil.fetchSingleCard
* ApiUtil.createCard
* ApiUtil.editCard
* ApiUtil.destroyCard

## Gems/Libraries
