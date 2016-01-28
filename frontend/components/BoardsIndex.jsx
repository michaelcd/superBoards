var React = require('react');
var BoardsIndexItem = require('./boardsindexitem');
var NewBoardIndexItem = require('./newboardindexitem');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');

var BoardsIndex = React.createClass({
  getInitialState: function () {
    return ({boards: BoardStore.all()});
  },

  _onChange: function () {
    this.setState({boards: BoardStore.all()});
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
    ApiUtil.fetchAllBoards();
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  render: function () {
    var indexItems = (
      this.state.boards.map(function (board) {
        return <BoardsIndexItem key={board.id} className="BoardsIndexItem" board={board} />;
      })
    );
    return (
      <div className="boards-index group">
        <div className="user-boards group">
          <h2>My Boards</h2>
          <ul>
            {indexItems}
            <NewBoardIndexItem />
          </ul>
        </div>
        <div className="shared-boards group">
          <h2>Shared Boards</h2>
        </div>
        <a href="" className="archived-boards-link">View Archived Boards</a>
      </div>
    );
  }
});

module.exports = BoardsIndex;
