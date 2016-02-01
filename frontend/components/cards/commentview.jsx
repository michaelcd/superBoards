var React = require('react');

 var CommentView = React.createClass({
  componentDidMount: function () {
    // this.cardListener = CardStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    // this.cardListener.remove();
  },

  _onChange: function () {

  },

  render: function () {
    var commentsList;

    if (this.props.comments) {
      commentsList = (
        this.props.comments.map(function (comment) {
          return <div key={comment.id} className="comment">
            {comment.body} - {comment.author}
          </div>;
        })
      );
    } else {
      commentsList = (
        <div>There are no comments on this card.</div>
      );
    }

    return (
      <div className="comment-container">
        <div className="new-comment-container"></div>
        <div className="comments-list">
          {commentsList}
        </div>
      </div>
    );
  }
});

module.exports = CommentView;
