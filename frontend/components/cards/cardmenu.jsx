var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('../../util/api_util');

// this.props.card

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.cardmenu);
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


var CardMenu = React.createClass({
  mixins: [ClickMixin],

  getInitialState: function () {
    return ({menu: false});
  },

  openMenu: function () {
    this.setState({menu: true});
  },

  closeMenu: function () {
    this.setState({menu: false});
  },

  archiveCard: function (event) {
    event.preventDefault();
    var card = this.props.card;
    card.archived = true;
    ApiUtil.updateCard(card);
    this.setState({menu: false});
  },

  deleteCard: function (event) {
    event.preventDefault();
    ApiUtil.destroyCard(this.props.card);
    this.setState({menu: false});
  },

  render: function () {
    var menu;

    if (this.state.menu === true) {
      menu = (
        <div className="pop-up-menu" ref="cardmenu">
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">Card Actions</div>
            <div className="pop-up-menu-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
          </div>
          <div className="pop-up-menu-options-list">
            <a href="#" onClick={this.archiveCard}
              className="pop-up-menu-option">Archive Card</a>
            <a href="#" onClick={this.deleteCard}
              className="pop-up-menu-option">Delete Card</a>
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
