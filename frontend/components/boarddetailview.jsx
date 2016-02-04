var React = require('react');
var BoardStore = require('../stores/board');
var ListWrapper = require('./lists/listwrapper');
var NewList = require('./lists/newlist');
var BoardMenu = require('./boardmenu');
var BoardTitleButton = require('./boards/boardtitle');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var ApiUtil = require('../util/api_util');
var Container = require('./lists/listcontainer');


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
    var lists;
    var newListOrd = 0;

    // if (this.state.board.lists !== undefined) {
    //   newListOrd = this.state.board.lists.length;
    //   lists = (this.state.board.lists.map(function (list) {
    //     return <ListWrapper key={list.id} list={list} ord={list.ord} />;
    //   }));
    // } else {
    //   lists = (<div></div>);
    // }

    return (
      <div className="board-detail-view">
        <div className="board-header group">
          <BoardTitleButton />
          <BoardMenu board={this.state.board}/>
        </div>
        <Container board={this.state.board}/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(BoardDetailView);
