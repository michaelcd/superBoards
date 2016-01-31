var React = require('react');
var BoardsIndexItem = require('./boardsindexitem');

// this.props.board - Board object passed in by BoardsIndex

var BoardsIndexItem = React.createClass({
  render: function () {
    return (
      <li>
        <a href={"#/boards/" + this.props.board.id}
          className="board-index-item-wrapper">
          <div className="boards-index-item-title">
            {this.props.board.title}
          </div>
        </a>
      </li>
    );
  }
});

module.exports = BoardsIndexItem;
