var React = require('react');
var ApiUtil = require('../../util/api_util');
var Card = require('./card');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/itemtypes');
var DropTarget = require('react-dnd').DropTarget;

var cardTarget = {
  drop: function (props, monitor) {
    var draggedCard = monitor.getItem().card;
  
    if ((draggedCard.ord !== props.card.ord) ||
      (draggedCard.list_id !== props.card.list_id)) {
      draggedCard.ord = props.card.ord;
      draggedCard.list_id = props.card.list_id;
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
    listId: PropTypes.number.isRequired,
    ord: PropTypes.number.isRequired
  },

  render: function () {
    var connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className="card-wrapper">
        <Card list={this.props.list} card={this.props.card}/>
      </div>
    );
  }
});

module.exports = DropTarget(ItemTypes.CARD, cardTarget, collect)(CardWrapper);
