var React = require('react');
var ReactDnD = require('react-dnd');
var List = require('./list');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;
var ApiUtil = require('../../util/api_util');

// this.props.list
// render list, aware of position
// Wrapper needs source item position to render correctly (like Trello)


var listSource = {
  beginDrag: function (props) {
    return { list: props.list, id: props.id };
  }
};

var listTarget = {
  hover: function (props, monitor) {
    var draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.swapLists(draggedId, props.id);
    }
  },

  drop: function (props, monitor) {
    var draggedList = monitor.getItem().list;
    draggedList.ord = props.ord;
    ApiUtil.moveList(draggedList);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var ListWrapper = React.createClass({
  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    swapLists: React.PropTypes.func.isRequired,
    list: React.PropTypes.object.isRequired,
    ord: React.PropTypes.number.isRequired
  },

  render: function () {
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;

    return this.props.connectDragSource(this.props.connectDropTarget(
      <div className="list-wrapper">
        <div className="drag-drop-list-placeholder">
        <List list={this.props.list} />
        {isOver &&
          <div className="drag-drop-list-filler"></div>}
        </div>
      </div>
    ));
  }
});

var DragSourceDecorator = ReactDnD.DragSource(ItemTypes.LISTWRAPPER, listSource,
    function(connect, monitor) {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        };
});

var DropTargetDecorator = ReactDnD.DropTarget(ItemTypes.LISTWRAPPER, listTarget,
    function(connect) {
        return {
            connectDropTarget: connect.dropTarget()
        };
});

module.exports = DropTargetDecorator(DragSourceDecorator(ListWrapper));
