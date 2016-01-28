var React = require('react');
var BoardsIndexItem = require('./boardsindexitem');

// this.props.board - Board object passed in by BoardsIndex

var BoardsIndexItem = React.createClass({
  render: function () {
    return (
      <li><a href={"#/boards/" + this.props.board.id} className="BoardsIndexItem">
        {this.props.board.title}
      </a></li>
    );
  }
});

module.exports = BoardsIndexItem;
