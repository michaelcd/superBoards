var BoardActions = require('../actions/board_actions.js');

var ApiUtil = {
  fetchAllBoards: function () {
    $.ajax({
     url: "api/boards",
     success: function (boards) {
      BoardActions.receiveAllBoards(boards);
     },
     failure: function () {
       console.log("failure");
     }
   });
  },

  fetchBoard: function (id) {
    $.ajax({
     url: "api/boards/" + id,
     success: function (board) {
      BoardActions.receiveSingleBoard(board);
     },
     failure: function () {
       console.log("failure");
     }
   });
  },

  createBoard: function (board) {
    $.ajax({
     url: "api/boards",
     method: "POST",
     data: {board: board},
     success: function (board) {
      BoardActions.receiveSingleBoard(board);
     },
     failure: function () {
      console.log("failure");
     }
   });
  },

  updateBoard: function (board) {
    $.ajax({
     url: "api/boards/" + board.id,
     method: "PATCH",
     data: {board: board},
     success: function (board) {
      BoardActions.receiveSingleBoard(board);
     },
     failure: function () {
      console.log("failure");
     }
   });
  },

  deleteBoard: function (board) {
    $.ajax({
     url: "api/boards/" + board.id,
     method: "DELETE",
     data: {board: board},
     success: function (boards) {
      BoardActions.receiveAllBoards(boards);
     },
     failure: function () {
      console.log("failure");
     }
   });
  },

  createList: function (list) {
    $.ajax({
     url: "api/lists",
     method: "POST",
     data: {list: list},
     success: function (board) {
      BoardActions.receiveSingleBoard(board);
     },
     failure: function () {
      console.log("failure");
     }
   });
 },

  updateList: function (list) {
    $.ajax({
     url: "api/lists/" + list.id,
     method: "PATCH",
     data: {list: list},
     success: function (board) {
      BoardActions.receiveSingleBoard(board);
     },
     failure: function () {
      console.log("failure");
     }
   });
  },

  destroyList: function (list) {
    $.ajax({
     url: "api/lists/" + list.id,
     method: "DELETE",
     success: function (board) {
      BoardActions.receiveSingleBoard(board);
     },
     failure: function () {
      console.log("failure");
     }
   });
  },
};

module.exports = ApiUtil;
