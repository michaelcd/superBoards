var React = require('react');
var ReactDOM = require('react-dom');
var BoardStore = require('../../stores/board');
var CurrentUserStore = require('../../stores/currentuser');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var ShareMenu = require('./sharemenu');

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
      archiveConfirm: false,
      currentUser: CurrentUserStore.currentUser()
    });
  },

  componentDidMount: function () {
    this.userListener = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
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
    ApiUtil.archiveBoard(board);
    this.history.pushState(null, "#/");
  },

  archiveShow: function (event) {
    event.preventDefault();
    this.setState({archiveConfirm: true});
  },

  archiveConfirmClose: function () {
    event.preventDefault();
    this.setState({archiveConfirm: false});
  },

  render: function () {
    var content;
    var archiveConfirm;
    var shareMenu;
    var contentForUser;

    if (this.state.archiveConfirm === true) {
      archiveConfirm = (
        <div className="archive-board-confirm">
          <button className="pop-up-rename-board archive-button" onClick={this.archiveBoard}>
            Confirm Archival</button>
          <div className="list-form-cancel share-cancel" onClick={this.archiveConfirmClose}>
            <i className="fa fa-times fa-fw" />
          </div>
        </div>
      );
    }
    if (this.state.menu === true) {
      if (this.state.currentUser.id === this.props.board.author_id) {
        contentForUser = (
          <div className="pop-up-menu-options-list group">
            <ShareMenu board={this.props.board} currentUser={this.state.currentUser}/>
            <a href="#" className="pop-up-menu-option" onClick={this.archiveShow}>Archive Board</a>
            {archiveConfirm}
          </div>
        );
      } else {
        contentForUser = (
          <div className="pop-up-menu-title pop-up-notice">Board actions are only availble to the board owner.
          </div>
        );
      }

      content = (
        <div className="board-detail-pop-up" ref="boardmenu">
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">Board Actions</div>
            <div className="pop-up-menu-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
          </div>
          {contentForUser}
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
