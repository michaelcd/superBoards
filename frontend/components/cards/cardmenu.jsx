var React = require('react');
var ApiUtil = require('../../util/api_util');

// this.props.card

var CardMenu = React.createClass({
  getInitialState: function () {
    return ({menu: false});
  },

  openMenu: function () {
    this.setState({menu: true});
  },

  closeMenu: function () {
    this.setState({menu: false})
  },

  archiveCard: function (event) {
    event.preventDefault();
    var card = this.props.card;
    card.archived = true;
    ApiUtil.updateCard(card);
    this.setState({menu: false})
  },

  deleteCard: function (event) {
    event.preventDefault();
    ApiUtil.destroyCard(this.props.card);
    this.setState({menu: false})
  },

  render: function () {
    var menu;

    if (this.state.menu === true) {
      menu = (
        <div className="list-actions-menu">
          <div className="list-actions-header group">
            <div className="list-actions-title">Card Actions</div>
            <div className="list-actions-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
          </div>
          <div className="list-actions-options-list">
            <a href="#" onClick={this.archiveCard}
              className="list-actions-option">Archive Card</a>
            <a href="#" onClick={this.deleteCard}
              className="list-actions-option">Delete Card</a>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div onClick={this.openMenu} className="card-menu-button">
          <i className="fa fa-pencil fa-fw" />
        </div>
        {menu}
      </div>
    );
  }
});

module.exports = CardMenu;
