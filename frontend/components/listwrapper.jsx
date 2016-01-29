var React = require('react');
var List = require('./list');
var NewCard = require('./newcard');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;

// this.props.list
// render list, aware of position

var listTarget = {
  drop: function (props, monitor) {
    moveList(props.ord);
  }
};

var ListWrapper = React.createClass({
  propTypes: {
    ord: PropTypes.number.isRequired,
  },

  render: function () {
    var x = this.props.ord;

    return (
      <div className="list-wrapper">
        <List list={this.props.list} />
      </div>
    );
  }
});

module.exports = ListWrapper;
