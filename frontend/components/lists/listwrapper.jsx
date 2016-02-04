var React = require('react');
var ReactDnD = require('react-dnd');
var List = require('./list');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var ApiUtil = require('../../util/api_util');

var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

// this.props.list
// render list, aware of position

var listSource = {
  beginDrag: function (props) {
    return { list: props.list, order: props.order, ord: props.list.ord };
  }
};

var listTarget = {
  hover: function (props, monitor) {
    var draggedList = monitor.getItem();
    console.log(monitor.getItem().ord + "to" + props.ord);
    console.log(monitor.getItem().order + "to" + props.order);
    if (draggedList.order !== props.order) {
      props.swapLists(draggedList.order, props.order);
    }
  },

  drop: function (props, monitor) {
    var draggedList = monitor.getItem().list;
    if (draggedList.ord !== props.ord) {
      draggedList.ord = props.ord;
      ApiUtil.moveList(draggedList);
    }
  }
};

// function collect(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   };
// }
//
// function collect(connect, monitor) {
//   return {
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver()
//   };
// }

var ListWrapper = React.createClass({
  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    list: React.PropTypes.object.isRequired,
    swapLists: React.PropTypes.func.isRequired,
    ord: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired
  },

  render: function () {
    var connectDropTarget = this.props.connectDropTarget;

    return this.props.connectDragSource(this.props.connectDropTarget(
      <div className="list-wrapper">
        <List list={this.props.list}></List>
      </div>
    ));
  }
});

var DragSourceDecorator = ReactDnD.DragSource(ItemTypes.LISTWRAPPER, listSource,
  function (connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
});

var DropTargetDecorator = ReactDnD.DropTarget(ItemTypes.LISTWRAPPER, listTarget,
  function (connect) {
    return {
      connectDropTarget: connect.dropTarget()
    };
});

module.exports = DropTargetDecorator(DragSourceDecorator(ListWrapper));
