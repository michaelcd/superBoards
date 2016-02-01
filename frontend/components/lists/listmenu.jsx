var React = require('react');
var ApiUtil = require('../../util/api_util');

// this.props.list

var ListMenu = React.createClass({
  getInitialState: function () {
    return ({menu: false});
  },

  openMenu: function () {
    this.setState({menu: true});
  },

  closeMenu: function () {
    this.setState({menu: false});
  },

  archiveList: function (event) {
    event.preventDefault();
    var list = this.props.list;
    list.archived = true;
    ApiUtil.updateList(list);
    this.setState({menu: false});
  },

  deleteList: function (event) {
    event.preventDefault();
    ApiUtil.destroyList(this.props.list);
    this.setState({menu: false});
  },

  render: function () {
    var menu;

    if (this.state.menu === true) {
      menu = (
        <div className="pop-up-menu">
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">List Actions</div>
            <div className="pop-up-menu-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
          </div>
          <div className="pop-up-menu-options-list">
            <a href="#" onClick={this.archiveList}
              className="pop-up-menu-option">Archive List</a>
            <a href="#" onClick={this.deleteList}
              className="pop-up-menu-option">Delete List</a>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div onClick={this.openMenu} className="list-title-menu-button">
          <i className="fa fa-angle-double-down fa-fw" />
        </div>
        {menu}
      </div>
    );
  }
});

module.exports = ListMenu;
