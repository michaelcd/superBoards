var React = require('react');

var Search = React.createClass({
  changeHandler: function () {

  },

  render: function () {
    return (
      <div className="navbar-search-container navbar-button">
        <input className="navbar-search-input" onChange={this.changeHandler} />
        <div className="navbar-search-icon">
            <i className="fa fa-search fa-fw" />
        </div>
      </div>
    );
  }
});

module.exports = Search;
