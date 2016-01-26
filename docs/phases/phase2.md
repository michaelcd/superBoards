# Phase 2: Flux Architecture, Board and List CRUD (2.5 days)

## Rails
### Models
* List
* Card

### Controllers
* Api::ListsController (create, destroy, index, update)
* Api::CardsController (create, destroy, index, show, update)

### Views

## Flux
### Views (React Components)
* BoardsIndex
  - BoardsIndexItem
  - NewBoardIndexItem
* BoardDetailView
  - ListView

### Stores
* Board

### Actions
* ApiActions.receiveAllBoards -> triggered by ApiUtil
* ApiActions.receiveSingleBoard
* ApiActions.deleteBoard
* BoardActions.fetchAllBoards -> triggers ApiUtil
* BoardActions.fetchSingleBoard
* BoardActions.createBoard
* BoardActions.editBoard
* BoardActions.destroyBoard

### ApiUtil
* ApiUtil.fetchAllBoards
* ApiUtil.fetchSingleBoard
* ApiUtil.createBoard
* ApiUtil.editBoard
* ApiUtil.destroyBoard

## Gems/Libraries
* Flux Dispatcher (npm)
