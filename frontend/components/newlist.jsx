var React = require('react');
var ApiUtil = require('../util/api_util');
var BoardStore = require('../stores/board');

var NewList = React.createClass({
  getInitialState: function () {
    return ({listItem: "add-list-button", form: "hidden", formValue: ""});
  },

  itemClickHandler: function () {
    this.setState({listItem: "hidden", form: "list-form group"});
  },

  cancelHandler: function (event) {
    event.preventDefault();
    this.setState({listItem: "add-list-button", form: "hidden"});
  },

  formOnSubmit: function (event) {
    event.preventDefault();
    var list = {
      title: this.state.formValue,
      board_id: this.props.board.id,
      archived: false,
      ord: this.props.board.lists.length
    };
    ApiUtil.createList(list);
    this.setState({listItem: "add-list-button", form: "hidden", formValue: ""});
  },

  formChangeHandler: function (event) {
    this.setState({formValue: event.target.value});
  },

  render: function () {
    return(
      <div className="new-list">
        <div className={this.state.listItem} onClick={this.itemClickHandler}>Add a list...</div>
        <div className={this.state.form}>
          <form onSubmit={this.formOnSubmit}>
            <input type="text" className="list-form-input" value={this.state.inputVal} onChange={this.formChangeHandler} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel" onClick={this.cancelHandler}>X</a>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NewList;
