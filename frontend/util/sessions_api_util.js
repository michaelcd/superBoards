var CurrentUserActions = require("./../actions/currentuser_actions");

var SessionsApiUtil = {
  login: function (credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials, // {email: "tommy...", password: "14.."}
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      }

    });
  },

  logout: function () {
    $.ajax({
      url: 'XXXX',
      type: 'XXXX',
      dataType: 'json',
      success: function () {
        console.log("logged out!");
      }
    });
  },

  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        console.log("fetched current user!");
        CurrentUserActions.receiveCurrentUser(currentUser);
        cb && cb(currentUser);
      }
    });
  }


};

module.exports = SessionsApiUtil;
