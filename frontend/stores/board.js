var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var BoardConstants = require('../constants/board_constants');

var _boards = [];
var _board = {};

var BoardStore = new Store (AppDispatcher);

var resetBoards = function (boards) {
  // boards is an object, want to convert to an array to use .map later
  // CONFIRM THIS IS WORKING
  Object.keys(boards).forEach(function (key) {
    _boards.push(boards[key]);
  });
};




var resetBoard = function (board) {
  _board = board;
};

BoardStore.all = function () {
  return _boards;
};

BoardStore.single = function () {
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
