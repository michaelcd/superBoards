var React = require('react');
var CardStore = require('../../stores/card');
var BoardStore = require('../../stores/board');
var ApiUtil = require('../../util/api_util');
var CardDetailActions = require('./carddetail_actions');
var CommentView = require('./commentview');


var CardDetail = React.createClass({
  getInitialState: function () {
    return ({
      card: CardStore.card(),
      description: false,
      rename: false,
      descriptionVal: CardStore.card().description,
      renameVal: CardStore.card().title
    });
  },

  componentDidMount: function () {
    this.cardListener = CardStore.addListener(this._onChange);
    ApiUtil.fetchCard(this.props.params.card_id);
  },

  componentWillUnmount: function () {
    this.cardListener.remove();
  },

  _onChange: function () {
    this.setState({card: CardStore.card()});
    this.setState({descriptionVal: this.state.card.description, renameVal: CardStore.card().title});
  },

  editDescription: function () {
    this.setState({description: true});
  },

  descFormOnSubmit: function (e) {
    e.preventDefault();
    var card = this.state.card;
    card.description = this.state.descriptionVal;
    ApiUtil.updateCard(card);
    this.setState({description: false});
  },

  descFormChangeHandler: function (e) {
    this.setState({descriptionVal: e.currentTarget.value});
  },

  descCancelHandler: function (e) {
    e.preventDefault();
    this.setState({description: false});
  },

  openRename: function () {
    this.setState({rename: true});
  },

  renameFormOnSubmit: function (e) {
    e.preventDefault();
    var card = this.state.card;
    card.title = this.state.renameVal;
    ApiUtil.updateCard(card);
    this.setState({rename: false});
  },

  renameFormChangeHandler: function (e) {
    this.setState({renameVal: e.currentTarget.value});
  },

  renameCancelHandler: function (e) {
    e.preventDefault();
    this.setState({rename: false});
  },

  render: function () {
    var description;
    var rename;

    if (this.state.description === true) {
      description = (
        <div className="list-form group">
          <form onSubmit={this.descFormOnSubmit}>
            <textarea type="text"
              className="list-form-input"
              onChange={this.descFormChangeHandler}
              value={this.state.descriptionVal} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel" onClick={this.descCancelHandler}>X</a>
          </form>
        </div>
      );
    } else {
      description = (
        <div className="edit-description" onClick={this.editDescription}>
          Edit the description...</div>
      );
    }

    if (this.state.rename === true) {
      rename = (
        <div className="list-form group">
          <form onSubmit={this.renameFormOnSubmit}>
            <textarea type="text"
              className="list-form-input"
              onChange={this.renameFormChangeHandler}
              value={this.state.renameVal} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel" onClick={this.renameCancelHandler}>X</a>
          </form>
        </div>
      );
    } else {
      rename = (
        <div className="card-detail-title" onClick={this.openRename}>
          {this.state.card.title}</div>
      );
    }

    return (
      <div className="window-overlay">
        <div className="window-content ">
          <div className="card-detail-view">
            <a href={"#/boards/" + this.props.params.board_id} className="card-detail-cancel">
              <i className="fa fa-times fa-fw" />
            </a>
            <div className="card-detail-header">
              {rename}
              <div className="card-detail-header-words">
                in list <div className="card-detail-header-list-title">
                  list placeholder</div>
              </div>
            </div>
            <div className="card-detail-main">
              <div className="card-detail-description">
                {description}
              </div>
            </div>
          </div>
          <CardDetailActions card={this.state.card} boardId={this.props.params.board_id} />
          <CommentView comments={this.state.card.comments} card={this.state.card} />
        </div>
      </div>
    );
  }
});

module.exports = CardDetail;
