var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('../../util/api_util');
var BoardStore = require('../../stores/board');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;

var listTarget = {
  drop: function (props, monitor) {
    var draggedList = monitor.getItem().list;
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

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.newlist);
        if (e.target == component || $(component).has(e.target).length) {
            this.openMenu(e);
        } else {
            this.closeMenu(e);
        }
    },
    componentDidMount: function () {
        $(document).bind('click', this._clickDocument);
    },
    componentWillUnmount: function () {
        $(document).unbind('click', this._clickDocument);
    },
};

var NewList = React.createClass({
  mixins: [ClickMixin],

  propTypes: {
    ord: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired
  },

  openMenu: function () {

  },

  closeMenu: function () {
    this.setState({form: false});
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
    this.setState({formValue: ""});
  },

  formChangeHandler: function (event) {
    this.setState({formValue: event.currentTarget.value});
  },

  render: function () {
    var content;
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;

    if (this.state.form === true) {
      content = (
        <div className="list-form group" ref="newlist">
          <form onSubmit={this.formOnSubmit}>
            <input type="text"
              className="list-form-input"
              onChange={this.formChangeHandler}
              value={this.state.formValue}/>
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
        <div className="drag-drop-list-placeholder">
          <div className="add-list-button"
            onClick={this.itemClickHandler}>
            <div className="add-list-text">Add a list...</div>
          </div>
          {isOver &&
            <div className="drag-drop-list-filler"></div>}
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
