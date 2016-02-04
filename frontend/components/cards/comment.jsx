var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('../../util/api_util');
var CurrentUserStore = require('../../stores/currentuser');

// this.props.comments

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.commentedit);
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

var Comment = React.createClass({
  mixins: [ClickMixin],

  getInitialState: function () {
    return ({
      user: CurrentUserStore.currentUser(),
      edit: false,
      input: this.props.comment.body
    });
  },

  clickInside: function () {},

  clickOutside: function () {
    this.setState({edit:false});
  },



  componentDidMount: function () {
    this.userListener = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  openEdit: function () {
    this.setState({edit: true});
  },

  submitEdit: function (e) {
    event.preventDefault();
    var comment = this.props.comment;
    comment.body = this.state.input;
    ApiUtil.updateComment(comment);
    this.setState({edit: false});
  },

  deleteComment: function (e) {
    event.preventDefault();
    var comment = this.props.comment;
    ApiUtil.deleteComment(comment);
  },

  commentChange: function (e) {
    this.setState({input: e.currentTarget.value});
  },

  render: function () {
    var formOptions;
    var commentOrInput;
    var commentAuthor;

    if (this.props.comment !== undefined) {
      if (this.props.comment.author_id === this.state.user.id) {
        formOptions =(
          <div className="comment-options-container group">
            <div className="comment-option-icon" onClick={this.openEdit}>
              <i className="fa fa-pencil fa-fw" />
            </div>
            <div className="comment-option-delete" onClick={this.deleteComment}>
              Delete
            </div>
          </div>
        );
      }
      if (this.state.edit === true) {
        commentOrInput = (
          <div>
            <form onSubmit={this.submitEdit} ref="commentedit">
              <div className="comment-box comment-edit-input" >
                <div className="comment">
                    <input onChange={this.commentChange} value={this.state.input} />
                </div>
              </div>
              <div className="comment-edit-submit" onClick={this.submitEdit}>Submit edit</div>
              </form>
          </div>
        );
      } else {
        commentOrInput = (
          <div>
            <div className="comment-box" >
              <div className="comment" onClick={this.openEdit}>
                {this.props.comment.body}
              </div>
            </div>
            {formOptions}
          </div>
        );
      }
      commentAuthor = this.props.comment.author;
    }

    return (
      <div className="comment-container">
        <div className="comment-author">
          {commentAuthor}
        </div>
        {commentOrInput}
      </div>
    );
  }
});

module.exports = Comment;
