var React = require('react');
var Card = require('./card');
var NewCard = require('./newcard');
var ApiUtil = require('../util/api_util');

// this.props.list

var List = React.createClass({
  getInitialState: function () {
    return ({
      titleClass: "list-title",
      formClass: "hidden",
      formVal: this.props.list.title
    });
  },

  formChange: function (event) {
    this.setState({formVal: event.currentTarget.value});
  },

  formSubmit: function (event) {
    event.preventDefault();
    this.props.list.title = this.state.formVal;
    ApiUtil.updateList(this.props.list);
    this.setState({titleClass: "list-title", formClass: "hidden"});
  },

  titleClick: function () {
    this.setState({titleClass: "hidden", formClass:"list-rename-form"});
  },

  cancelHandler: function (event) {
    event.preventDefault();
    this.setState({titleClass: "list-title", formClass: "hidden"});
  },

  render: function () {
    var cards;
    var that = this;
    cards = this.props.list.cards.map(function (card) {
      return <Card key={card.id} card={card}/>;
    });

    return(
      <li className="list">
        <div className="list-title-container">
          <div onClick={this.titleClick} className={this.state.titleClass}>
            {this.props.list.title}</div>
          <div className={this.state.formClass}>
            <input className="list-rename-input"
              type="text"
              onChange={this.formChange}
              value={this.state.formVal} />
            <button className="list-rename-button" onClick={this.formSubmit}>
              Rename List</button>
            <a href="#" className="list-rename-cancel" onClick={this.cancelHandler}>X</a>
          </div>
        </div>
        <div className="cards">
          {cards}
        </div>
        <NewCard list={this.props.list} />
      </li>
    );
  }
});

module.exports = List;
