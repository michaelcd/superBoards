var React = require('react');

var LoadingScreen = React.createClass({
  render: function () {
    return (
      <div className="loading-screen">
        <div className="auth-form-window">
          Loading...
        </div>
      </div>
    );
  }
});

module.exports = LoadingScreen;
