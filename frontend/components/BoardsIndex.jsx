var React = require('react');
var BoardsIndexItem = require('./boardsindexitem');
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
    ApiUtil.fetchAllBoards();
    this.boardListener = BoardStore.addListener(this._onChange);
  },

  render: function () {
    console.log(this.state);
    var indexItems = (
      this.state.boards.map(function (board) {
        return <BoardsIndexItem key={board.id} className="BoardsIndexItem" board={board} />;
      })
    ); // map all boards in state to Index item components
    return (
      <div className="BoardsIndex">
        {indexItems}
      </div>
    );
  }
});

module.exports = BoardsIndex;
