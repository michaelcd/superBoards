var React = require('react');

// this.props.comment

var CommentResult = React.createClass({
  render: function () {
    return (
      <div className="comment-result-container">
        <a className="search-result-link"
          href={"#/boards/" + this.props.comment.board_id + "/cards/" + this.props.comment.card_id}>
          {this.props.comment.body}
        </a>
      </div>
    );
  }
});

module.exports = CommentResult;
