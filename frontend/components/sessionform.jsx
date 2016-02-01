var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serialize();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  guestSignin: function (event) {
    event.preventDefault();
    var credentials = "username=GuestUser&password=GuestUser";
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },


  render: function() {
    return (
      <div className="auth-form-window">
        <div className="auth-form-container group">
          <form className="auth-form" onSubmit={this.submit}>
            <div className="auth-form-title">superBoards Log In</div>
            <label>Username
              <input className="auth-form-input" type="text" name="username" />
            </label>
            <label>Password
              <input className="auth-form-input" type="password" name="password" />
            </label>
            <button className="auth-form-button">Log In</button>
          </form>
          <button className="auth-form-button guest-form-button" onClick={this.guestSignin}>
            Sign In as GuestUser</button>
        </div>
      </div>
    );
  },

});

module.exports = SessionForm;
