var React = require('react');
var ApiUtil = require('../util/api_util');
var BoardStore = require('../stores/board');
var History = require('react-router').History;


NewBoardIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({indexItem: "NewBoard", form: "hidden", formValue: ""});
  },

  itemClickHandler: function () {
    this.setState({indexItem: "hidden", form: "BoardForm"});
  },

  formOnSubmit: function (event) {
    event.preventDefault();
    var board = {title: this.state.formValue};
    ApiUtil.createBoard(board);
    this.setState({indexItem: "NewBoard", form: "hidden", formValue: ""});

    var that = this;
    setTimeout(function () {
      that.history.pushState(null, "/boards/" + BoardStore.single().id);
    }, 500);
  },

  formChangeHandler: function (event) {
    this.setState({formValue: event.target.value});
  },

  render: function () {

    return (
      <div>
        <li className={this.state.indexItem} onClick={this.itemClickHandler}>Create New Board</li>

        <form className={this.state.form} onSubmit={this.formOnSubmit}>
          <h2>Create Board</h2>
          <h3>Title</h3>
            <input onChange={this.formChangeHandler}></input>
        </form>
      </div>
    );
  }
});

module.exports = NewBoardIndexItem;
