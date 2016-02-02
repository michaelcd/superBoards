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
        <div className="edit-description-box">
          <div className="edit-description-heading">Description</div>
          <form onSubmit={this.descFormOnSubmit}>
            <textarea type="text"
              className="edit-description-textarea"
              onChange={this.descFormChangeHandler}
              value={this.state.descriptionVal} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel" onClick={this.descCancelHandler}>
              <i className="fa fa-times fa-fw" />
            </a>
          </form>
        </div>
      );
    } else {
      description = (
        <div className="edit-description-box" onClick={this.editDescription}>
          <div className="edit-description-heading">Description</div>
          <div className="edit-description-box-description">{this.state.descriptionVal}</div>
        </div>
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
                <div className="card-detail-header-list-title"></div>
              </div>
            </div>
          </div>
          <div className="window-content-main">
            <div className="card-detail-description-box">
              {description}
            </div>
            <CommentView comments={this.state.card.comments} card={this.state.card} />
          </div>
          <CardDetailActions card={this.state.card} boardId={this.props.params.board_id} />
        </div>
      </div>
    );
  }
});

module.exports = CardDetail;
