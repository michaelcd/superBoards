var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('../util/api_util');
var BoardStore = require('../stores/board');
var History = require('react-router').History;
// var ClickMixin = require('./mixin/clickmixin');

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.newBoardWrapper);
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

NewBoardIndexItem = React.createClass({
  mixins: [History, ClickMixin],

  getInitialState: function () {
    return ({form: false, formValue: ""});
  },

  itemClickHandler: function (event) {
    event.preventDefault();
    this.setState({form: true});
    // this.focusForm();
  },

  clickInside: function () {

  },

  clickOutside: function () {
    this.setState({form: false});
  },

  focusForm: function () {
    var that = this;
    setTimeout(function () {
      that.refs.boardnameInput.focus();
    }, 50);
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
        <form className="create-board-pop-up-menu"
          onSubmit={this.formOnSubmit}>
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">Create Board</div>
            <a href="#" onClick={this.cancelHandler} className="pop-up-menu-cancel">
              <i className="fa fa-times fa-fw" />
            </a>
          </div>
          <div className="pop-up-menu-options-list group">
            <input className="pop-up-input"
              ref="boardnameInput"
              onChange={this.formChangeHandler}
              value={this.state.formValue} />
            <button className="pop-up-rename-board">Create Board</button>
          </div>
        </form>
      );
    }

    return (
      <li className="new-board-wrapper" ref="newBoardWrapper">
        {content}
      </li>
    );
  }
});

module.exports = NewBoardIndexItem;
