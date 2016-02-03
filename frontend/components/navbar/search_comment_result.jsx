var React = require('react');

// this.props.comments

var CommentResults = React.createClass({
  render: function () {

    var comments = this.props.comments.map(function (comment) {
      return(
        <div className="search-result-container" key={comment.id}>
          <a className="search-result-link"
            href={"#/boards/" + comment.board_id + "/cards/" + comment.card_id}>
            {comment.body}
          </a>
        </div>
      );
    });

    return (
      <div className="results">
        <div className="search-result-label">Comments</div>
        {comments}
      </div>
    );
  }
});

module.exports = CommentResults;
