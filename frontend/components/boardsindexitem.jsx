var React = require('react');
var BoardsIndexItem = require('./boardsindexitem');

// Has individual board under this.props.board

var BoardsIndexItem = React.createClass({
  render: function () {
    return (
      <div className="BoardsIndexItem">
        {this.props.board.title}
      </div>
    );
  }
});

module.exports = BoardsIndexItem;
