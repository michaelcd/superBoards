var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submitLogin: function (e) {
    event.preventDefault();
    var credentials = "username=" + this.state.password + "&password=" + this.state.password;
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  registerUser: function (e) {
    event.preventDefault();
    var credentials = "username=" + this.state.password + "&password=" + this.state.password;
    SessionsApiUtil.createUser(credentials, function () {
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

  usernameCapture: function (event) {
    this.setState({username: event.currentTarget.value});
  },

  passwordCapture: function (event) {
    this.setState({password: event.currentTarget.value});
  },

  render: function() {
    return (
      <div className="auth-form-window">
        <div className="auth-form-container group">
          <form className="auth-form">
            <div className="auth-form-title">superBoards Log In</div>
            <label>Username</label>
            <input className="auth-form-input" type="text" name="username" onChange={this.usernameCapture} />
            <label>Password</label>
            <input className="auth-form-input" type="password" name="password" onChange={this.passwordCapture}/>
            <div className="auth-form-options-list">
              <button className="auth-form-option" onClick={this.guestSignin}>Sign in as GuestUser</button>
              <button className="auth-form-option" onClick={this.submitLogin}>Sign in with above credentials</button>
              <button className="auth-form-option" onClick={this.registerUser}>Register with above credentials</button>
              <a href="/auth/facebook" className="auth-form-option">Sign in with Facebook</a>
            </div>
          </form>
        </div>
      </div>
    );
  },

});

module.exports = SessionForm;
