var React = require('react');
var BoardsIndexItem = require('./boardsindexitem');
var NewBoardIndexItem = require('./newboardindexitem');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');

var BoardsIndex = React.createClass({
  getInitialState: function () {
    return ({
      boards: BoardStore.ownBoards(),
      sharedBoards: BoardStore.sharedBoards()
    });
  },

  _onChange: function () {
    this.setState({
      boards: BoardStore.ownBoards(),
      sharedBoards: BoardStore.sharedBoards()
    });
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
    ApiUtil.fetchAllBoards();
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  render: function () {
    var indexItems;
    var sharedIndexItems;

    if (this.state.boards !== undefined) {
      indexItems = (
        this.state.boards.map(function (board) {
          return <BoardsIndexItem key={board.id} className="BoardsIndexItem" board={board} />;
        })
      );
    }

    // if (this.state.sharedBoards !== undefined) {
    //   sharedIndexItems = (
    //     <div className="shared-boards group">
    //       <div className="boards-index-title-container">
    //         <div className="icon-container">
    //           <i className="fa fa-users fa-fw"></i>
    //         </div>
    //         <div className="boards-index-title">Shared Boards</div>
    //       </div>
    //       <div className="shared-boards group">
    //         <ul>
    //           {
    //             this.state.sharedBoards.map(function (board) {
    //               return <BoardsIndexItem
    //                 key={board.id}
    //                 className="BoardsIndexItem"
    //                 board={board} />;
    //             })
    //           }
    //         </ul>
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className="boards-index group">
        <div className="boards-index-title-container">
          <div className="icon-container">
            <i className="fa fa-user fa-fw"></i>
          </div>
          <div className="boards-index-title">My Boards</div>
        </div>
        <div className="user-boards group">
          <ul>
            {indexItems}
            <NewBoardIndexItem />
          </ul>
        </div>
        {sharedIndexItems}
      </div>
    );
  }
});

module.exports = BoardsIndex;
