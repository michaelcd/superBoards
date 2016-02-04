var Dispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/user_constants');

module.exports = {
  receiveUsers: function (users) {
    Dispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  }
};
