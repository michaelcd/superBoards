var React = require('react');
var ApiUtil = require('../util/api_util');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;

var cardSource = {
  beginDrag: function (props) {
    return { card: props.card };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var Card = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div className="card">
        <div className="card-title">{this.props.card.title}</div>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.CARD, cardSource, collect)(Card);
