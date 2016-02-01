var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var CurrentUserConstants = require('../constants/currentuser_constants');

var CurrentUserStore = new Store (AppDispatcher);

var _currentUser = {};
var _currentUserHasBeenFetched = false;

CurrentUserStore.currentUser = function () {
  return $.extend({}, _currentUser);
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  if (payload.actionType === CurrentUserConstants.CURRENT_USER_RECEIVED) {
    // do stuff
    _currentUserHasBeenFetched = true;
    _currentUser = payload.currentUser;
    CurrentUserStore.__emitChange();
  }
};

module.exports = CurrentUserStore;
