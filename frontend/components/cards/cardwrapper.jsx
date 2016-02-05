var React = require('react');
var ApiUtil = require('../../util/api_util');
var Card = require('./card');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;
var ReactDnD = require('react-dnd');

var cardSource = {
  beginDrag: function (props) {
    return { card: props.card, id: props.id };
  }
};

var cardTarget = {
  hover: function (props, monitor) {
    var draggedId = monitor.getItem().id;
    if (draggedId !== props.id) {
      props.swapCards(draggedId, props.id);
    }
  },

  drop: function (props, monitor) {
    var draggedCard = monitor.getItem().card;
    draggedCard.ord = props.card.ord;
    draggedCard.list_id = props.card.list_id;
    ApiUtil.moveCard(draggedCard);
  }

  // drop: function (props, monitor) {
  //   var draggedCard = monitor.getItem().card;
  //
  //   if ((draggedCard.ord !== props.card.ord) ||
  //     (draggedCard.list_id !== props.card.list_id)) {
  //     draggedCard.ord = props.card.ord;
  //     draggedCard.list_id = props.card.list_id;
  //     ApiUtil.moveCard(draggedCard);
  //   }
  // }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var CardWrapper = React.createClass({
  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    swapCards: React.PropTypes.func.isRequired,
    card: React.PropTypes.object.isRequired,
    ord: React.PropTypes.number.isRequired,
  },

  render: function () {
    // var isOver = this.props.isOver;
    var isOver = this.props.isOver;
    var connectDropTarget = this.props.connectDropTarget;
    var cardOrPreview = "drag-drop-card-placeholder";

    if (isOver) {}

    return this.props.connectDragSource(this.props.connectDropTarget(
      <div className="card-wrapper">
        <div className={cardOrPreview}>
          <Card list={this.props.list} card={this.props.card}/>
        </div>
      </div>
    ));
  }
});

var DragSourceDecorator = ReactDnD.DragSource(ItemTypes.CARD, cardSource,
    function(connect, monitor) {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        };
});

var DropTargetDecorator = ReactDnD.DropTarget(ItemTypes.CARD, cardTarget,
    function(connect, monitor) {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver()
        };
});

module.exports = DropTargetDecorator(DragSourceDecorator(CardWrapper));
