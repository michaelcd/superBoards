var React = require('react');
var ApiUtil = require('../util/api_util');
var Card = require('./card');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;

var cardTarget = {
  drop: function (props, monitor) {
    var draggedCard = monitor.getItem().card;
    // console.log(draggedCard);
    // console.log("from:" + draggedCard.ord + "to:" + props.pos);

    if (draggedCard.ord !== props.pos) {
      draggedCard.ord = props.card.ord;
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

var CardWrapper = React.createClass({
  propTypes: {
    pos: PropTypes.number.isRequired,
    ord: PropTypes.number.isRequired
  },

  render: function () {
    var connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className="card-wrapper">
        <Card card={this.props.card}/>
      </div>
    );
  }
});

module.exports = DropTarget(ItemTypes.CARD, cardTarget, collect)(CardWrapper);
