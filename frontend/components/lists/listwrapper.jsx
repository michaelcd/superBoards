var React = require('react');
var List = require('./list');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;
var ApiUtil = require('../../util/api_util');

// this.props.list
// render list, aware of position
// Wrapper needs source item position to render correctly (like Trello)

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
    isOver: PropTypes.bool.isRequired
  },

  render: function () {
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;
    
    return connectDropTarget(
      <div className="list-wrapper">
        <div className="drag-drop-list-placeholder">
        <List list={this.props.list} />
        {isOver &&
          <div className="drag-drop-list-filler"></div>}
        </div>
      </div>
    );
  }
});

module.exports = DropTarget(ItemTypes.LIST, listTarget, collect)(ListWrapper);
