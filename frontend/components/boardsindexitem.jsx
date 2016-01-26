var React = require('react');
var BoardsIndexItem = require('./boardsindexitem');

// this.props.board - Board object passed in by BoardsIndex

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
