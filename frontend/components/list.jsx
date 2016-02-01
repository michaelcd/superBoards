var React = require('react');
var CardWrapper = require('./cards/cardwrapper');
var NewCard = require('./newcard');
var ApiUtil = require('../util/api_util');
var DragSource = require('react-dnd').DragSource;
var ItemTypes = require('../constants/itemtypes');
var PropTypes = React.PropTypes;
var ListMenu = require('./lists/listmenu');

// this.props.list

var listSource = {
  beginDrag: function (props) {
    return { list: props.list };
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

  formChangeHandler: function (event) {
    this.setState({formVal: event.currentTarget.value});
  },

  formSubmit: function (event) {
    event.preventDefault();
    this.props.list.title = this.state.formVal;
    ApiUtil.updateList(this.props.list);
    this.setState({form: false});
  },

  titleClick: function () {
    this.setState({form: true});
  },

  cancelHandler: function (event) {
    event.preventDefault();
    this.setState({form: false});
  },

  render: function () {
    var cards;
    var that = this;
    cards = this.props.list.cards.map(function (card) {
      return <CardWrapper
        listId={that.props.list.id}
        key={card.id}
        card={card}
        list={that.props.list}
        ord={card.ord}
        />;
    });

    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    var content;

    if (this.state.form === true) {
      content = (
        <div className="list-form group">
          <form onSubmit={this.formSubmit}>
            <input type="text"
              className="list-form-input"
              onChange={this.formChangeHandler}
              value={this.state.formVal} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel" onClick={this.cancelHandler}>X</a>
          </form>
        </div>
      );
    } else {
      content = (
        <div className="list-title-container">
          <div onClick={this.titleClick} className="list-title">
            {this.props.list.title}
          </div>
          <ListMenu list={this.props.list}/>
        </div>
      );
    }

    return connectDragSource(
      <li className="list">
        {content}
        <div className="cards">
          {cards}
        </div>
        <NewCard list={this.props.list} />
      </li>
    );
  }
});

module.exports = DragSource(ItemTypes.LIST, listSource, collect)(List);
