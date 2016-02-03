var React = require('react');


var BoardResults = React.createClass({
  clickLink: function () {
    this.history.pushState(null, "#/boards/" + board.id);
  },

  render: function () {

    var boards = this.props.boards.map(function (board) {
      return (
        <div className="search-result-container" key={board.id}>
          <a className="search-result-link"
            href={"#/boards/" + board.id}>
            {board.title}
          </a>
        </div>
      );
    });




    return (
      <div className="results">
        <div className="search-result-label">Boards</div>
        {boards}
      </div>
    );
  }
});

module.exports = BoardResults;
