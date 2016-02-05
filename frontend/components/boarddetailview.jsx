var React = require('react');
var BoardStore = require('../stores/board');
var ListWrapper = require('./lists/listwrapper');
var ListContainer = require('./lists/listcontainer');
var NewList = require('./lists/newlist');
var BoardMenu = require('./boards/boardmenu');
var BoardTitleButton = require('./boards/boardtitle');
var ApiUtil = require('../util/api_util');

// var DragDropContext = require('react-dnd').DragDropContext;
// var HTML5Backend = require('react-dnd-html5-backend');


BoardDetailView = React.createClass({
  getInitialState: function () {
    return({
      board: BoardStore.single(),
      title: BoardStore.single().title,
      form: false});
  },

  _onChange: function () {
    this.setState({board: BoardStore.single(), title: BoardStore.single().title,});
  },

  componentWillReceiveProps: function (props) {
    ApiUtil.fetchBoard(props.params.board_id);
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
    ApiUtil.fetchBoard(this.props.params.board_id);
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  render: function () {
    return (
      <div className="board-detail-view">
        <div className="board-header group">
          <BoardTitleButton />
          <BoardMenu board={this.state.board}/>
        </div>
        <ListContainer />
        {this.props.children}
      </div>
    );
  }
});

module.exports = BoardDetailView;
