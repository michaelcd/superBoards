var React = require('react');
var BoardsIndexItem = require('./boardsindexitem');

// this.props.board - Board object passed in by BoardsIndex

var BoardsIndexItem = React.createClass({
  render: function () {
    return (
      <a href={"#/boards/" + this.props.board.id} className="BoardsIndexItem">
        {this.props.board.title}
      </a>
    );
  }
});

module.exports = BoardsIndexItem;
