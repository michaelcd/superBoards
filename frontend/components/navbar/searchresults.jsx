var React = require('react');
var CommentResult = require('./search_comment_result');
var CardResult = require('./search_card_result');
var ListResult = require('./search_list_result');
var BoardResult = require('./search_board_result');

// this.props.results (array)

var SearchResults = React.createClass({
  getInitialState: function () {
    return ({
      boards: [],
      lists: [],
      cards: [],
      comments: []
    });
  },

  componentWillReceiveProps: function () {
    setTimeout(function () {
      this.setState({
        boards: this.props.results.boards,
        lists: this.props.results.lists,
        cards: this.props.results.cards,
        comments: this.props.results.comments
      });
    }.bind(this), 1000);
  },

  render: function () {
    var comments;
    var cards;
    var lists;
    var boards;

    if (this.state.comments !== undefined) {
      comments = this.state.comments.map(function (comment) {
        return <CommentResult key={comment.id} comment={comment} />;
      });
    }

    if (this.state.cards !== undefined) {
      cards = this.state.cards.map(function (card) {
        return <CardResult key={card.id} card={card} />;
      });
    }

    if (this.state.lists !== undefined) {
      lists = this.state.lists.map(function (list) {
        return <ListResult key={list.id} list={list} />;
      });
    }

    if (this.state.boards !== undefined) {
      boards = this.state.boards.map(function (board) {
        return <BoardResult key={board.id} board={board} />;
      });
    }

    var content = (
      <div>
        <div className="comment-results">
          <div className="search-result-label">Comments</div>
          {comments}
        </div>
        <div className="card-results">
          <div className="search-result-label">Cards</div>
          {cards}
        </div>
        <div className="list-results">
          <div className="search-result-label">Lists</div>
          {lists}
        </div>
        <div className="board-results">
          <div className="search-result-label">Boards</div>
          {boards}
        </div>
      </div>
    );

    return (
      <div className="search-results-container">
        {content}
      </div>
    );
  }
});

module.exports = SearchResults;
