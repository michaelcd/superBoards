var React = require('react');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');
var ListWrapper = require('./lists/listwrapper');
var NewList = require('./lists/newlist');
var BoardMenu = require('./boardmenu');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');

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

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
    ApiUtil.fetchBoard(this.props.params.board_id);
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  nameClickHandler: function () {
    this.setState({form: true});
  },

  formChangeHandler: function (event) {
    this.setState({title: event.currentTarget.value});
  },

  formSubmitHandler: function (event) {
    event.preventDefault();
    this.state.board.title = this.state.title;
    ApiUtil.updateBoard(this.state.board);
    this.setState({form: false});
  },

  cancelHandler: function (event) {
    event.preventDefault();
    this.setState({form: false});
  },

  render: function () {
    var lists;
    var newListOrd = 0;

    if (this.state.board.lists !== undefined) {
      newListOrd = this.state.board.lists.length;
      lists = (this.state.board.lists.map(function (list) {
        return <ListWrapper key={list.id} list={list} ord={list.ord} />;
      }));
    } else {
      lists = (<div></div>);
    }

    var form;
    if (this.state.form === true) {
      form = (
        <form className="pop-up-menu" onSubmit={this.formSubmitHandler}>
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">Rename Board</div>
            <a href="#" className="pop-up-menu-cancel" onClick={this.cancelHandler}>
              <i className="fa fa-times fa-fw" />
            </a>
          </div>
          <div className="pop-up-menu-options-list group">
            <input className="pop-up-input" type="text" value={this.state.title}
              onChange={this.formChangeHandler} />
            <button className="pop-up-rename-board">Rename</button>
          </div>
        </form>
        );
    }

    return (
      <div className="board-detail-view">
        <div className="board-header group">
          <div className="board-title-button">
            <div className="board-title" onClick={this.nameClickHandler}>
              {this.state.board.title}
            </div>
          </div>
          {form}
          <BoardMenu board={this.state.board}/>
        </div>
        <ul className="list-container group">
          {lists}
          <div className="list-wrapper">
            <NewList
              board={this.state.board}
              ord={newListOrd}
            />
          </div>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(BoardDetailView);
