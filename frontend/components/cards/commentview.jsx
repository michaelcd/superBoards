var React = require('react');
var ApiUtil = require('../../util/api_util');

var CommentView = React.createClass({
  getInitialState: function () {
    return ({inputVal: ""});
  },

  _onChange: function () {

  },

  addComment: function (event) {
    event.preventDefault();
    var comment = {body: this.state.inputVal, card_id: this.props.card.id};
    ApiUtil.createComment(comment);
    this.setState({inputVal: ""});
  },

  changeHandler: function (event) {
    this.setState({inputVal: event.currentTarget.value});
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
        <div className="new-comment-container">
          <form className="new-comment-form" onSubmit={this.addComment}>
            <input type="text" className="new-comment-input" onChange={this.changeHandler} />
            <button className="new-comment-button">Save Comment</button>
          </form>
        </div>
        <div className="comments-list">
          {commentsList}
        </div>
      </div>
    );
  }
});

module.exports = CommentView;
