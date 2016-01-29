var React = require('react');
var Card = require('./card');
var NewCard = require('./newcard');
var ApiUtil = require('../util/api_util');
var DragSource = require('react-dnd').DragSource;
var ItemTypes = require('../constants/itemtypes');
var PropTypes = React.PropTypes;

// this.props.list

var listSource = {
  beginDrag: function (props) {
    return { id: props.list.id };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var List = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

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

    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
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
module.exports = DragSource(ItemTypes.LIST, listSource, collect)(List);
