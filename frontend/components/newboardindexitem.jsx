var React = require('react');
var ApiUtil = require('../util/api_util');
var BoardStore = require('../stores/board');
var History = require('react-router').History;


NewBoardIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({form: false, formValue: ""});
  },

  itemClickHandler: function (event) {
    event.preventDefault();
    this.setState({form: true});
  },

  cancelHandler: function () {
    this.setState({form: false});
  },

  formOnSubmit: function (event) {
    event.preventDefault();
    var board = {title: this.state.formValue};
    ApiUtil.createBoard(board);
    this.setState({form: false, formValue: ""});

    var that = this;
    setTimeout(function () {
      that.history.pushState(null, "/boards/" + BoardStore.single().id);
    }, 500);
  },

  formChangeHandler: function (event) {
    this.setState({formValue: event.target.value});
  },

  render: function () {
    var content;

    if (this.state.form !== true) {
      content = (
        <a href="#" className="new-board" onClick={this.itemClickHandler}>Create New Board</a>
        );
    } else {
      content = (
        <form className="create-board-pop-up-menu" onSubmit={this.formOnSubmit}>
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">Create Board</div>
            <a href="#" onClick={this.cancelHandler} className="pop-up-menu-cancel">
              <i className="fa fa-times fa-fw" />
            </a>
          </div>
          <div className="pop-up-menu-options-list group">
            <input className="pop-up-input" onChange={this.formChangeHandler} />
            <button className="pop-up-rename-board">Create Board</button>
          </div>
        </form>
      );
    }

    return (
      <li className="new-board-wrapper">
        {content}
      </li>
    );
  }
});

module.exports = NewBoardIndexItem;
