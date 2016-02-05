var React = require('react');
var ReactDOM = require('react-dom');
var UserStore = require('../../stores/userstore');
var ApiUtil = require('../../util/api_util');

// this.props.board
// this.props.currentUser

// var ClickMixin = {
//     _clickDocument: function (e) {
//         var component = ReactDOM.findDOMNode(this.refs.sharemenu);
//         if (e.target == component || $(component).has(e.target).length) {
//             // this.openMenu(e);
//         } else {
//           setTimeout(function () {
//             this.closeMenu(e);
//           }.bind(this),500);
//
//         }
//     },
//     componentDidMount: function () {
//         $(document).bind('click', this._clickDocument);
//     },
//     componentWillUnmount: function () {
//         $(document).unbind('click', this._clickDocument);
//     },
// };

var ShareMenu = React.createClass({
  // mixins: [ClickMixin],

  getInitialState: function () {
    return ({menu: false, users: [], selectedId: 0, confirm: false});
  },

  closeMenu: function () {
    this.setState({menu: false});
  },

  openMenu: function (event) {
    event.preventDefault();
    this.setState({menu: true});
  },

  componentDidMount: function () {
    this.shareListener = UserStore.addListener(this._onChange);
    ApiUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.shareListener.remove();
  },

  _onChange: function () {
    this.setState({users: UserStore.all()});
  },

  shareSubmit: function (event) {
    event.preventDefault();
    var share = {
      user_id: this.state.selectedId,
      board_id: this.props.board.id
    };
    ApiUtil.createShare(share);
    this.setState({confirm: true, menu: false});
    setTimeout(function () {
      this.setState({confirm: false});
    }.bind(this), 1000);
  },

  handleChange: function (event) {
    this.setState({selectedId: event.target.value});
  },

  render: function () {
    var popup;
    var users = this.state.users.map(function (user) {
      if (user.id !== this.props.currentUser.id) {
        return <option key={user.id} value={user.id}>{user.username}</option>;
      }
    }.bind(this));

    var dropdown = (
      <select id="share-dropdown"
        className="custom-dropdown"
        value={this.state.selectedId}
        onChange={this.handleChange}>
        {users}
      </select>
    );

    if (this.state.menu === true) {
      popup = (
        <div className="share-pop-up-menu" ref="sharemenu">
          <div>Select a user to share this board with:</div>
          <form onSubmit={this.shareSubmit}>
            {dropdown}
            <button className="pop-up-rename-board archive-button">Share!</button>
            <div className="list-form-cancel share-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
          </form>
        </div>
      );
    }

    var linkOrConfirm;
    if (this.state.confirm === true) {
      linkOrConfirm = (
        <div className="pop-up-menu-option">Board Shared!</div>
      );
    } else {
      linkOrConfirm = (
        <a href="#" className="pop-up-menu-option" onClick={this.openMenu}>Share Board</a>
      );
    }

    return (
      <div>
        {linkOrConfirm}
        {popup}
      </div>
    );
  },
});

module.exports = ShareMenu;
