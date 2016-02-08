var Dispatcher = require('../dispatcher/dispatcher.js');
var CurrentUserConstants = require('../constants/currentuser_constants');

module.exports = {
  receiveErrors: function (errors) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.ERRORS_RECEIVED,
      errors: errors
    });
  },

  receiveCurrentUser: function (user) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.CURRENT_USER_RECEIVED,
      currentUser: user
    });
  },

  logoutUser: function () {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.LOGOUT_USER
    });
  }
};
