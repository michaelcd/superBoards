var React = require('react');
var ReactDOM = require('react-dom');
var BoardStore = require('../../stores/board');
var ApiUtil = require('../../util/api_util');


var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.searchComponent);
        if (e.target == component || $(component).has(e.target).length) {
            // this.clickInside(e);
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

var BoardButton = React.createClass({
  mixins: [ClickMixin],

  getInitialState: function () {
    return ({menu: false});
  },

  openMenu: function () {
    this.setState({menu: true});
  },

  menuToggle: function () {
    if (this.state.menu === true) {
      this.setState({menu: false});
    } else {
      this.setState({menu:true});
    }
  },

  closeMenu: function () {
    this.setState({menu: false});
  },

  _onChange: function () {
    this.setState({
      boards: BoardStore.ownBoards(),
      sharedBoards: BoardStore.sharedBoards()
    });
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
    ApiUtil.fetchAllBoards();
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  render: function () {
    var boards;
    var sharedBoards;
    var menu;

    if (this.state.boards !== undefined) {
      boards = this.state.boards.map(function (board) {
        return (
          <div key={board.id} className="boards-button-tile">
            <div className="tile-color-block"></div>
            <a href={"#/boards/" + board.id}>
              <div className="tile-title-container">
                <div className="tile-title-wrap">{board.title}</div>
              </div>
            </a>
          </div>
        );
      }.bind(this));
    }

    if (this.state.sharedBoards !== undefined) {
      sharedBoards = this.state.sharedBoards.map(function (board) {
        return (
          <div key={board.id} className="boards-button-tile">
            <div className="tile-color-block"></div>
            <a href={"#/boards/" + board.id}>
              <div className="tile-title-container">
                <div className="tile-title-wrap">{board.title}</div>
              </div>
            </a>
          </div>
        );
      }.bind(this));
    }

    if (this.state.menu === true) {
      menu = (
        <div className="boards-button-pop-up-container group">
          <div className="boards-button-pop-up">
            <div className="boards-button-header">My Boards</div>
            <div className="boards-button-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
            {boards}
            <div className="boards-button-header">Shared Boards</div>
            <div className="boards-button-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
            {sharedBoards}
          </div>
        </div>
      );
    }


    return (
      <div>
        <button className="boards-button navbar-button" onClick={this.openMenu}>
          <div className="boards-button-icon">
            <i className="fa fa-columns fa-fw"></i>
          </div>
          <div className="boards-button-text" >
            Boards
          </div>
        </button>
        {menu}
      </div>
    );
  }
});

module.exports = BoardButton;
