var React = require('react');
var ApiUtil = require('../../util/api_util');

var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;

// this.props.list

var cardTarget = {
  drop: function (props, monitor) {
    var draggedCard = monitor.getItem().card;

    console.log("from: " + draggedCard.ord + " to: " + props.ord);
    console.log("from: " + draggedCard.list_id + " to: " + props.listId);

    if ((draggedCard.ord !== props.ord) ||
      (draggedCard.list_id !== props.listId)) {
      draggedCard.ord = props.ord;
      draggedCard.list_id = props.listId;
      ApiUtil.moveCard(draggedCard);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var NewCard = React.createClass({
  propTypes: {
    listId: PropTypes.number.isRequired,
    ord: PropTypes.number.isRequired
  },

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
    var connectDropTarget = this.props.connectDropTarget;

    var form;
    if (this.state.form) {
      form = (
        <form className="new-card-form group">
          <input className="new-card-input"
            type="text" onChange={this.formChangeHandler}>
          </input>
          <button className="list-form-save new-card-button" onClick={this.submitHandler}>
            Add</button>
          <div className="list-form-cancel" onClick={this.cancelHandler}>
            <i className="fa fa-times fa-fw" />
          </div>
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

    return connectDropTarget(
      <div className="new-card-container">
        {form}
      </div>
    );
  }
});



module.exports = DropTarget(ItemTypes.CARD, cardTarget, collect)(NewCard);
