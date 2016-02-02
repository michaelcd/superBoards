var React = require('react');
var List = require('./list');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;
var ApiUtil = require('../../util/api_util');

// this.props.list
// render list, aware of position

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

var ListWrapper = React.createClass({
  propTypes: {
    ord: PropTypes.number.isRequired,
  },


  render: function () {
    var connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className="list-wrapper">
        <List list={this.props.list} />
      </div>
    );
  }
});

module.exports = DropTarget(ItemTypes.LIST, listTarget, collect)(ListWrapper);
