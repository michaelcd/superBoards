var React = require('react');
var CommentResults = require('./search_comment_result');
var CardResults = require('./search_card_result');
var ListResults = require('./search_list_result');
var BoardResults = require('./search_board_result');
var SearchResultsStore = require('../../stores/search_results_store');


// this.props.results (array)

var SearchResults = React.createClass({
  getInitialState: function () {
    return ({
      boards: SearchResultsStore.all().boards,
      lists: SearchResultsStore.all().lists,
      cards: SearchResultsStore.all().cards,
      comments: SearchResultsStore.all().comments
    });
  },

  componentDidMount: function () {
    this.storeListener = SearchResultsStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  _onChange: function () {
    this.setState({
      boards: SearchResultsStore.all().boards,
      lists: SearchResultsStore.all().lists,
      cards: SearchResultsStore.all().cards,
      comments: SearchResultsStore.all().comments
    });
  },

  clickResult: function () {

  },

  componentWillReceiveProps: function () {},

  render: function () {
    var comments;
    var cards;
    var lists;
    var boards;

    if ((this.state.comments !== undefined) && (this.state.comments.length > 0)) {
      comments = <CommentResults comments={this.state.comments} />;
    }

    if ((this.state.cards !== undefined) && (this.state.cards.length > 0)) {
      cards = <CardResults cards={this.state.cards} />;
    }

    if ((this.state.lists !== undefined) && (this.state.lists.length > 0)) {
      lists = <ListResults lists={this.state.lists} />;
    }

    if ((this.state.boards !== undefined) && (this.state.boards.length > 0)) {
      boards = <BoardResults boards={this.state.boards} />;
    }

    // <div className="search-results-header">Results</div>

    return (
      <div className="pop-up-container">
        <div className="search-results-container">
          {comments}
          {cards}
          {lists}
          {boards}
        </div>
      </div>
    );
  }
});

module.exports = SearchResults;
