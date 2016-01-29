var React = require('react');
var ApiUtil = require('../util/api_util');

// this.props.list

var NewCard = React.createClass({
  getInitialState: function () {
    return ({form: false, input: ""});
  },

  clickHandler: function (event) {
    event.preventDefault();
    this.setState({form: true});
  },

  submitHandler: function (event) {
    event.preventDefault();
    var card = {
      title: this.state.input,
      ord: this.props.list.cards.length,
      list_id: this.props.list.id,
      archived: false
    };
    ApiUtil.createCard(card);
    this.setState({form: false});
  },

  formChangeHandler: function (event) {
    this.setState({input: event.currentTarget.value});
  },

  cancelHandler: function (event) {
    event.preventDefault();
    this.setState({form: false, input: ""});
  },

  render: function () {
    var form;
    if (this.state.form) {
      form = (
        <form className="new-card-form">
          <input className="new-card-input"
            type="text" onChange={this.formChangeHandler}>
          </input>
          <button className="new-card-button" onClick={this.submitHandler}>
            Add</button>
          <a href="#" className="new-card-cancel"
            onClick={this.cancelHandler}>X</a>
        </form>
      );
    } else {
      form = (
        <div className="new-card">
          <a href="#" className="new-card-title"
            onClick={this.clickHandler}>Add a card...</a>
        </div>
      );
    }

    return(
      <div className="new-card-container">
        {form}
      </div>
    );
  }
});

module.exports = NewCard;
