var React = require('react');
var ApiUtil = require('../../util/api_util');
var Comment = require('./comment');

var CommentView = React.createClass({
  getInitialState: function () {
    return ({inputVal: ""});
  },

  _onChange: function (e) {
    this.setState({inputVal: e.currentTarget.value});
  },

  addComment: function (event) {
    console.log(event.currentTarget);
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
    var formval = this.state.inputVal;

    if (this.props.comments) {
      commentsList = (
        this.props.comments.map(function (comment) {
          return (
            <Comment key={comment.id} comment={comment} />
          );
        })
      );
    } else {
      commentsList = (
        <div>There are no comments on this card.</div>
      );
    }

    return (
      <div className="comment-section-container">
        <div className="window-content-main-title">Add Comment</div>
        <div className="new-comment-container group">
          <form className="new-comment-form" onSubmit={this.addComment}>
            <input type="text"
              className="new-comment-input"
              onChange={this.changeHandler}
              value={formval} />
            <button className="new-comment-button">Save Comment</button>
          </form>
        </div>
        <div className="window-content-main-title">Comments</div>
        <div className="comments-list">
          {commentsList}
        </div>
      </div>
    );
  }
});

module.exports = CommentView;
