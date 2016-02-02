var React = require('react');

var BoardResult = React.createClass({
  render: function () {
    var board;

    if (this.props.board !== undefined) {
      board = (
        <a className="search-result-link"
          href={"#/boards/" + this.props.board.id}>
          {this.props.board.title}
        </a>
      );
    }


    return (
      <div className="board-result-container">
        {board}
      </div>
    );
  }
});

module.exports = BoardResult;
