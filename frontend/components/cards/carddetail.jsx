var React = require('react');
var ReactDOM = require('react-dom');
var CardStore = require('../../stores/card');
var BoardStore = require('../../stores/board');
var ApiUtil = require('../../util/api_util');
var CardDetailActions = require('./carddetail_actions');
var CommentView = require('./commentview');
var CardRename = require('./card_rename');
var CardDescription = require('./card_description');
var History = require('react-router').History;


var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.carddetailview);
        if (e.target == component || $(component).has(e.target).length) {
            this.clickInside(e);
        } else {
            this.clickOutside(e);
        }
    },
    componentDidMount: function () {
        $(document).bind('click', this._clickDocument);
    },
    componentWillUnmount: function () {
        $(document).unbind('click', this._clickDocument);
    },
};


var CardDetail = React.createClass({
  mixins: [History, ClickMixin],

  clickInside: function () {

  },

  clickOutside: function () {
    this.history.pushState(null, "/boards/" + this.props.params.board_id);
  },

  getInitialState: function () {
    return ({
      card: {},
      descriptionEdit: false,
      rename: false,
      descriptionVal: "",
      renameVal: ""
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
  },

  render: function () {
    return (
      <div className="window-overlay">
        <div className="window-content" ref="carddetailview">
          <div className="card-detail-view">
            <a href={"#/boards/" + this.props.params.board_id} className="card-detail-cancel">
              <i className="fa fa-times fa-fw" />
            </a>
            <div className="card-detail-header">
              <CardRename card={this.state.card} />
              <div className="card-detail-header-words">
                <div className="card-detail-header-list-title"></div>
              </div>
            </div>
          </div>
          <div className="window-content-main">
            <CardDescription card={this.state.card} />
            <CommentView comments={this.state.card.comments} card={this.state.card} />
          </div>
          <CardDetailActions card={this.state.card} boardId={this.props.params.board_id} />
        </div>
      </div>
    );
  }
});

module.exports = CardDetail;
