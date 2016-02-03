var React = require('react');
var ReactDOM = require('react-dom');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

// this.props.board

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.boardmenu);
        if (e.target == component || $(component).has(e.target).length) {
            this.openMenu(e);
        } else {
            this.closeMenu(e);
        }
    },
    componentDidMount: function () {
        $(document).bind('click', this._clickDocument);
    },
    componentWillUnmount: function () {
        $(document).unbind('click', this._clickDocument);
    },
};

var BoardMenu = React.createClass({
  mixins: [History, ClickMixin],

  getInitialState: function () {
    return ({
      menu:false,
      archiveConfirm: false
    });
  },

  openMenu: function (event) {
    this.setState({menu: true});
  },

  closeMenu: function (event) {
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

  shareMenu: function (event) {
    event.preventDefault();
  },

  render: function () {
    var content;
    var archiveConfirm;
    if (this.state.archiveConfirm === true) {
      archiveConfirm = (
        <div className="archive-board-confirm">
          <button className="pop-up-rename-board archive-button" onClick={this.archiveBoard}>
            Confirm Archival</button>
        </div>
      );
    }
    if (this.state.menu === true) {
      content = (
        <div className="board-detail-pop-up" ref="boardmenu">
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">Board Actions</div>
            <div className="pop-up-menu-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
          </div>
          <div className="pop-up-menu-options-list group">
            <a href="#" className="pop-up-menu-option" onClick={this.shareMenu}>Share Board</a>
            <a href="#" className="pop-up-menu-option" onClick={this.archiveShow}>Archive Board</a>
            {archiveConfirm}
          </div>
        </div>
      );
    }

    return (
      <div className="board-menu">
        <div className="board-menu-button" onClick={this.openMenu}>
          <div className="board-menu-button-text">Show Menu</div>
        </div>
        {content}
      </div>
    );
  }
});

module.exports = BoardMenu;
