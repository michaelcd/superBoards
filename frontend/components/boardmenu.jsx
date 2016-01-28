var React = require('react');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');

var BoardMenu = React.createClass({
  getInitialState: function () {
    return ({buttonClass: "board-menu-button", menuClass: "hidden"});
  },

  buttonClick: function () {
    this.setState({buttonClass: "hidden", menuClass: "board-menu-options"});
  },

  menuClose: function (event) {
    event.preventDefault();
    this.setState({buttonClass: "board-menu-button", menuClass: "hidden"});
  },

  render: function () {
    return (
      <div className="board-menu">
        <div className={this.state.buttonClass} onClick={this.buttonClick}>
          Board Menu</div>
        <div className={this.state.menuClass}>
          <a href="#" className="board-menu-close" onClick={this.menuClose}>X</a>
          <div>Share Board</div>
          <div>Archive Board</div>
          <div>Delete Board</div>
        </div>
      </div>
    );
  }
});

module.exports = BoardMenu;
