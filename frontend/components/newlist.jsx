var React = require('react');
var ApiUtil = require('../util/api_util');
var BoardStore = require('../stores/board');

var NewList = React.createClass({
  getInitialState: function () {
    return ({form: false, formValue: ""});
  },

  itemClickHandler: function () {
    this.setState({form: true});
  },

  cancelHandler: function (event) {
    event.preventDefault();
    this.setState({form: false});
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
    this.setState({form: false, formValue: ""});
  },

  formChangeHandler: function (event) {
    this.setState({formValue: event.currentTarget.value});
  },

  render: function () {
    var content;
    if (this.state.form === true) {
      content = (
        <div className="list-form group">
          <form onSubmit={this.formOnSubmit}>
            <textarea type="text"
              className="list-form-input"
              onChange={this.formChangeHandler} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel" onClick={this.cancelHandler}>X</a>
          </form>
        </div>
      );
    } else {
      content = (
        <div className="add-list-button"
          onClick={this.itemClickHandler}>
          <div className="add-list-text">Add a list...</div>
        </div>
      );
    }


    return(
      <li className="new-list">
        {content}
      </li>
    );
  }
});

module.exports = NewList;
