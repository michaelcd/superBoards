var React = require('react');
var ApiUtil = require('../../util/api_util');
var BoardStore = require('../../stores/board');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;

var listTarget = {
  drop: function (props, monitor) {
    var draggedList = monitor.getItem().list;

    console.log("from: " + draggedList.ord + " to: " + props.ord);

    if (draggedList.ord !== props.ord) {
      draggedList.ord = props.ord;
      ApiUtil.moveList(draggedList);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var NewList = React.createClass({
  propTypes: {
    ord: PropTypes.number.isRequired,
  },

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
    var connectDropTarget = this.props.connectDropTarget;

    if (this.state.form === true) {
      content = (
        <div className="list-form group">
          <form onSubmit={this.formOnSubmit}>
            <input type="text"
              className="list-form-input"
              onChange={this.formChangeHandler} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel-wrapper" onClick={this.cancelHandler}>
              <div className="list-form-cancel" onClick={this.closeMenu}>
                <i className="fa fa-times fa-fw" />
              </div>
            </a>
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


    return connectDropTarget(
      <li className="new-list">
        {content}
      </li>
    );
  }
});

module.exports = DropTarget(ItemTypes.LIST, listTarget, collect)(NewList);
