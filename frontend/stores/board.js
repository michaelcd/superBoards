var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var BoardConstants = require('../constants/board_constants');

var _boards = [];
var _sharedBoards = [];
var _board = {};

var BoardStore = new Store (AppDispatcher);

var resetBoards = function (boards) {
  _sharedBoards = boards.shared_boards;
  boards = boards.boards;
  _boards = [];
  Object.keys(boards).forEach(function (key) {
    _boards.push(boards[key]);
  });

};

var resetBoard = function (board) {
  if (BoardStore.findBoard(board.id) === {}) {
    _boards.push(board);
  }
  _board = board;
};

BoardStore.findBoard = function (id) {
  var board = {};

  for (var i = 0; i < _boards.length; i++) {
    if (_boards[i].id === id) {
      board = _boards[i];
    }
  }

  return board;
};

BoardStore.findList = function (id) {
  var list = {};

  console.log(_board);
  for (var i = 0; i < _board.lists.length; i++) {
    if (_board.lists[i].id === id) {
      board = _board.lists[i];
    }
  }

  return list;
};

BoardStore.ownBoards = function () {
  return _boards;
};

BoardStore.sharedBoards = function () {
  return _sharedBoards;
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
