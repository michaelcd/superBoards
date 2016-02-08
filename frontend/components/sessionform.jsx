var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../util/sessions_api_util');
var ErrorStore = require('../stores/error');

var SessionForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({register: false, username: "", password: "", errors: []})
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this._onChange);
  },

  componeontWillUnmount: function () {
    this.errorListener();
  },

  _onChange: function () {
    this.setState({errors: ErrorStore.all()});
    console.log(this.state.errors);
  },

  submitLogin: function (e) {
    event.preventDefault();
    var credentials = "username=" + this.state.username + "&password=" + this.state.password;
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  registerUser: function (e) {
    event.preventDefault();
    var credentials = "username=" + this.state.username + "&password=" + this.state.password;
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

  openReg: function () {
    this.setState({register: true})
  },

  closeReg: function () {
    this.setState({register: false})
  },

  render: function() {
    var content;
    var errors;

    if (this.state.errors.length > 0) {
      errors = this.state.errors[0].map(function (error, i) {
          return <div key={i} className="error">{error}</div>;
        });
    }

    if (this.state.register === false) {
      content = (
        <div className="auth-form">
          <div className="auth-form-title">Sign In</div>
          <label>Username</label>
          <input className="auth-form-input" type="text" name="username" onChange={this.usernameCapture} />
          <label>Password</label>
          <input className="auth-form-input" type="password" name="password" onChange={this.passwordCapture}/>
          <div className="auth-form-errors">{errors}</div>
          <div className="auth-form-options-list">
            <button className="auth-form-option" onClick={this.submitLogin}>Sign in</button>
            <button className="auth-form-option" onClick={this.guestSignin}>Sign in as GuestUser</button>
            <a href="/auth/facebook" className="auth-form-option">Sign in with Facebook</a>
            <button className="auth-form-option" onClick={this.openReg}>Register a new account</button>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="auth-form">
          <div className="auth-form-title">Sign Up</div>
          <label>Username</label>
          <input className="auth-form-input" type="text" name="username" onChange={this.usernameCapture} />
          <label>Password</label>
          <input className="auth-form-input" type="password" name="password" onChange={this.passwordCapture}/>
          <div className="auth-form-errors">{errors}</div>
          <div className="auth-form-options-list">
            <button className="auth-form-option" onClick={this.registerUser}>Create a new account</button>
            <button className="auth-form-option" onClick={this.closeReg}>I already have an account.</button>
          </div>
        </div>
      );
    }


    return (
      <div className="auth-form-window">
        <div className="auth-container group">
          <div className="auth-form-container group">
            {content}
          </div>
          <div className="auth-logo-container">
            <img src={logoNavBarPath}/>
            <div></div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = SessionForm;
