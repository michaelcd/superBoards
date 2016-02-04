var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');

var UserStore = new Store (AppDispatcher);

var _users = [];

var resetUsers = function (users) {
  _users = users.users;
};

UserStore.all = function () {
  return _users.slice(0);
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.USERS_RECEIVED:
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
