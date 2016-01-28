var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var CurrentUserStore = new Store (AppDispatcher);

module.exports = CurrentUserStore;
