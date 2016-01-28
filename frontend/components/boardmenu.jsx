var React = require('react');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

// this.props.board

var BoardMenu = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({
      buttonClass: "board-menu-button",
      menuClass: "hidden",
      archiveConfirm: "hidden"
    });
  },

  buttonClick: function (event) {
    event.preventDefault();
    this.setState({buttonClass: "hidden", menuClass: "board-menu-options"});
  },

  menuClose: function (event) {
    event.preventDefault();
    this.setState({buttonClass: "board-menu-button", menuClass: "hidden"});
  },

  archiveBoard: function (event) {
    event.preventDefault();
    var board = this.props.board;
    board.archived = true;
    ApiUtil.updateBoard(board);
    this.history.pushState(null, "#/");
  },

  archiveShow: function (event) {
    event.preventDefault();
    this.setState({archiveConfirm: "archive-board-confirm"});

  },

  render: function () {
    return (
      <div className="board-menu">
        <a href="#" className={this.state.buttonClass} onClick={this.buttonClick}>
          Board Menu</a>
        <div className={this.state.menuClass}>
          <a href="#" className="board-menu-close" onClick={this.menuClose}>X</a>
          <div>Share Board</div>
          <a href="#" onClick={this.archiveShow}>Archive Board</a>
            <div className={this.state.archiveConfirm}>
              <button onClick={this.archiveBoard}>Confirm</button>
            </div>
        </div>
      </div>
    );
  }
});

module.exports = BoardMenu;
