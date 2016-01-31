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
    this.setState({menu: true, menuClass: "board-menu-options"});
  },

  menuClose: function (event) {
    event.preventDefault();
    this.setState({menu: false});
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
    this.setState({archiveConfirm: true});

  },

  render: function () {
    var content;
    var archiveConfirm;
    if (this.state.archiveConfirm === true) {
      var archiveConfirm = (
        <div className="archive-board-confirm">
          <button onClick={this.archiveBoard}>Confirm</button>
        </div>
      );
    }
    if (this.state.menu === true) {
      content = (
        <div className="board-menu-options">
          <a href="#" className="board-menu-close" onClick={this.menuClose}>X</a>
          <div>Share Board</div>
          <a href="#" onClick={this.archiveShow}>Archive Board</a>
          {archiveConfirm}
        </div>
      );
    } else {
      content = (
        <a href="#" className="board-menu-button" onClick={this.buttonClick}>
          Show Menu</a>
      );
    }
    return (
      <div className="board-menu">
        {content}
      </div>
    );
  }
});

module.exports = BoardMenu;
