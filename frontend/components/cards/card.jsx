var React = require('react');
var ApiUtil = require('../../util/api_util');
var CardMenu = require('./cardmenu');
var CardDetail = require('./carddetail');

// var DragSource = require('react-dnd').DragSource;
// var PropTypes = React.PropTypes;
// var ItemTypes = require('../../constants/itemtypes');
// var DropTarget = require('react-dnd').DropTarget;


//this.props.list
//this.props.card

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
  // propTypes: {
  //   connectDragSource: PropTypes.func.isRequired,
  //   isDragging: PropTypes.bool.isRequired
  // },

  getInitialState: function () {
    return ({detail: false});
  },

  titleClick: function () {},

  render: function () {
    // var connectDragSource = this.props.connectDragSource;
    // var isDragging = this.props.isDragging;
    var detail;

    if (this.state.detail === true) {
      detail = (
        <CardDetail list={this.props.list} card={this.props.card} />
      );
    }

    return (
      <div className="card">
        <a href={"#/boards/" + this.props.list.board_id + "/cards/" + this.props.card.id}
          className="card-title">
          {this.props.card.title}</a>
        {detail}
        <CardMenu card={this.props.card} />
      </div>
    );
  }
});

module.exports = Card;
