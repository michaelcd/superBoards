var React = require('react');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');
var List = require('./list');
var ListWrapper = require('./listwrapper');
var NewList = require('./lists/newlist');
var BoardMenu = require('./boardmenu');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');

BoardDetailView = React.createClass({
  getInitialState: function () {
    return({
      board: BoardStore.single(),
      title: BoardStore.single().title,
      titleClass: "board-title",
      form: "hidden"});
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
    this.setState({form: "name-update group"});
  },

  formChangeHandler: function (event) {
    this.setState({title: event.currentTarget.value});
  },

  formSubmitHandler: function (event) {
    event.preventDefault();
    this.state.board.title = this.state.title;
    ApiUtil.updateBoard(this.state.board);
    this.setState({form: "hidden"});
  },

  cancelHandler: function (event) {
    event.preventDefault();
    this.setState({indexItem: "NewBoard", form: "hidden"});
  },

  render: function () {
    var lists;
    if (this.state.board.lists !== undefined) {
      lists = (this.state.board.lists.map(function (list) {
        return <ListWrapper key={list.id} list={list} ord={list.ord} />;
      }));
    } else {
      lists = (<div></div>);
    }

    return (
      <div className="board-detail-view">
        <div className="board-header group">
          <div className="board-title-button">
            <div className="board-title" onClick={this.nameClickHandler}>
              {this.state.board.title}
            </div>
          </div>
          <form className={this.state.form} onSubmit={this.formSubmitHandler}>
              <div className="name-update-container group">
                <div className="name-update-title">Rename Board</div>
                <a href="#" className="name-update-cancel" onClick={this.cancelHandler}>X</a>
              </div>
              <input type="text" value={this.state.title}
                onChange={this.formChangeHandler} />
              <button>Rename</button>
            </form>
          <BoardMenu board={this.state.board}/>
        </div>
        <ul className="list-container group">
          {lists}
          <div className="list-wrapper"><NewList board={this.state.board} /></div>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(BoardDetailView);
