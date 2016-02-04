var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('../../util/api_util');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.newcard);
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

// this.props.list

var cardTarget = {
  drop: function (props, monitor) {
    var draggedCard = monitor.getItem().card;
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
  mixins: [ClickMixin],

  propTypes: {
    isOver: PropTypes.bool.isRequired,
    listId: PropTypes.number.isRequired,
    ord: PropTypes.number.isRequired
  },

  clickInside: function () {

  },

  clickOutside: function () {
    this.setState({form: false});
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
    this.setState({input: ""});
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
    var input = this.state.input;
    var isOver = this.props.isOver;

    var form;
    if (this.state.form) {
      form = (
        <form className="new-card-form group" ref="newcard">
          <input className="new-card-input"
            type="text" onChange={this.formChangeHandler}
            value={input}>
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
        <div className="drag-drop-card-placeholder">
          <div className="new-card">
            <a href="#" className="new-card-title"
              onClick={this.clickHandler}>
              Add a card...
            </a>
          </div>
          {isOver &&
            <div className="drag-drop-card-filler"></div>}
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
