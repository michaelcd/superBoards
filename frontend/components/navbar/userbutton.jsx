var React = require('react');
var CurrentUserStore = require('../../stores/currentuser');

var UserButton = React.createClass({
  getInitialState: function () {
    return ({
      currentUser: CurrentUserStore.currentUser(),
      initials: this.getInitials(),
      menu: false
    });
  },

  getInitials: function () {
    var username = CurrentUserStore.currentUser().username;
    var initials = "";
    for (var i = 0; i < username.length; i++) {
      if (username[i].match(/[A-Z]/)) {
        initials += username[i].match(/[A-Z]/);
      }
    }
    return initials;
  },

  componentDidMount: function () {
    CurrentUserStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  openMenu: function () {
    this.setState({menu: true});
  },

  closeMenu: function () {
    this.setState({menu: false});
  },

  logout: function (event) {
    event.preventDefault();
    
  },

  render: function () {
    var menu;
    if (this.state.menu === true) {
      menu = (
        <div className="user-menu">
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">
              {this.state.currentUser.username}
            </div>
            <div className="pop-up-menu-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
          </div>
          <div className="pop-up-menu-options-list">
            <a href="#" onClick={this.logout}
              className="pop-up-menu-option">Log Out</a>
          </div>
        </div>
      );
    }

    return(
      <div>
        <button className="user-button navbar-button" onClick={this.openMenu}>
          <div className="user-button-initials">
            {this.state.initials}
          </div>
          <div className="user-button-name">
            {this.state.currentUser.username}
          </div>
        </button>
        {menu}
      </div>
    );
  }
});


module.exports = UserButton;
