var React = require('react');
var CardStore = require('../../stores/card');
var BoardStore = require('../../stores/board');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;


// this.props.card

var CardDetailActions = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({confirm: false});
  },

  // pending functionality: confirm window for archival/deletion
  // openConfirm: function (event) {
  //   event.preventDefault();
  //   this.setState({confirm: true});
  // },

  archiveCard: function () {
    var card = this.props.card;
    card.archived = true;
    ApiUtil.updateCard(card);
    this.history.pushState(null, "/boards/" + this.props.boardId);
  },

  deleteCard: function () {
    ApiUtil.destroyCard(this.props.card);
    this.history.pushState(null, "/boards/" + this.props.boardId);
  },

  render: function () {
    var confirm;

    if (this.state.confirm === true) {
      confirm = (
        <div></div>
      );
    }


    return (
      <div className="window-sidebar">
        <div className="sidebar-actions-menu-title">Actions</div>
        <div className="sidebar-action" onClick={this.archiveCard}>Archive</div>
        <div className="sidebar-action" onClick={this.deleteCard}>Destroy</div>
      </div>
    );
  }
});

module.exports = CardDetailActions;
