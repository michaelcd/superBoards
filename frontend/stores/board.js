var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _boards = {};
var _board = {};

var BoardStore = new Store (AppDispatcher);

module.exports = BoardStore;
