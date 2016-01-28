var Dispatcher = require('../dispatcher/dispatcher.js');
var CurrentUserConstants = require('../constants/currentuser_constants');

module.exports = {
  receieveCurrentUser: function (user) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.CURRENT_USER_RECEIVED,
      user: user
    });
  }
};
