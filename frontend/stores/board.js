var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var BoardConstants = require('../constants/board_constants');

var _boards = [];
var _board = {};

var BoardStore = new Store (AppDispatcher);

var resetBoards = function (boards) {
  Object.keys(boards).forEach(function (key) {
    _boards.push(boards[key]);
  });
};

var resetBoard = function (board) {
  _boards.push(board);
  _board = board;
};

BoardStore.findBoard = function (id) {
  // find Board in current store with corresponding ID
  var board;

  for (var i = 0; i < _boards.length; i++) {
    if (_boards[i].id === id) {
      board = _boards[i];
    }
  }

  return board;
};

BoardStore.all = function () {
  return _boards;
};

BoardStore.single = function () {
  console.log(_board);
  return _board;
};

BoardStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case BoardConstants.BOARDS_RECEIVED:
      resetBoards(payload.boards);
      BoardStore.__emitChange();
      break;
    case BoardConstants.BOARD_RECEIVED:
      resetBoard(payload.board);
      BoardStore.__emitChange();
      break;
  }
};

module.exports = BoardStore;
