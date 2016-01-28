var React = require('react');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');
var List = require('./list');
var NewList = require('./newlist');

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
    console.log(this.state.board);
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
    ApiUtil.fetchBoard(this.props.params.id);
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

  cancelHandler: function () {
    this.setState({indexItem: "NewBoard", form: "hidden"});
  },

  render: function () {
    var lists;
    if (this.state.board.lists !== undefined) {
      lists = (this.state.board.lists.map(function (list) {
        return <List list={list} key={list.id}/>;
      }));
    } else {
      lists = (<div></div>);
    }

    return (
      <div className="board-detail-view group">
        <div className="board-title" onClick={this.nameClickHandler}>
          {this.state.board.title}</div>
        <form className={this.state.form} onSubmit={this.formSubmitHandler}>
            <div className="name-update-container group">
              <div className="name-update-title">Rename Board</div>
              <a href="#" className="name-update-cancel" onClick={this.form}>X</a>
            </div>
            <input type="text" value={this.state.title}
              onChange={this.formChangeHandler} />
            <button>Rename</button>
          </form>
        {lists}
        <NewList />
      </div>
    );
  }
});

module.exports = BoardDetailView;