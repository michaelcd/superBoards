var React = require('react');
var ApiUtil = require('../util/api_util');
var BoardStore = require('../stores/board');

var NewList = React.createClass({
  getInitialState: function () {
    return ({listItem: "add-list-button", form: "hidden", formValue: ""});
  },

  itemClickHandler: function () {
    this.setState({listItem: "hidden", form: "board-form group"});
  },

  cancelHandler: function () {
    this.setState({listItem: "add-list-button", form: "hidden"});
  },

  formOnSubmit: function (event) {
    event.preventDefault();
    var list = {title: this.state.formValue};
    ApiUtil.createList(list);
    this.setState({listItem: "add-list-button", form: "hidden", formValue: ""});

  },

  formChangeHandler: function (event) {
    this.setState({formValue: event.target.value});
  },

  render: function () {
    return(
      <div className="new-list">
        <div className={this.state.listItem}>Add a list...</div>
        <div className={this.state.form}>
          <input type="text" value={this.state.inputVal} onChange={this.formChangeHandler} />
          <button className="new-list-save">Save</button>
        </div>
      </div>
    );
  }
});

module.exports = NewList;
