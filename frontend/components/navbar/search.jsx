var React = require('react');

var Search = React.createClass({
  render: function () {
    return (
      <div className="navbar-search-container navbar-button">
        <input className="navbar-search-input" />
        <div className="navbar-search-icon"></div>
      </div>
    );
  }
});

module.exports = Search;
