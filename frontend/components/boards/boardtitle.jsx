var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('../../util/api_util');
var BoardStore = require('../../stores/board');



var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.boardtitle);
        if (e.target == component || $(component).has(e.target).length) {
            this.openMenu(e);
        } else {
            this.closeMenu(e);
        }
    },
    componentDidMount: function () {
        $(document).bind('click', this._clickDocument);
    },
    componentWillUnmount: function () {
        $(document).unbind('click', this._clickDocument);
    },
};


var BoardTitleButton = React.createClass({
  mixins: [ClickMixin],

  getInitialState: function () {
    return ({form: false, board: {}, title: ""});
  },

  _onChange: function () {
    this.setState({board: BoardStore.single(), title: BoardStore.single().title});
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
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

  cancelHandler: function () {
    this.setState({form: false});
  },

  openMenu: function () {
    this.setState({form: true});
  },

  closeMenu: function () {
    this.setState({form: false});
  },

  render: function () {
    var form;
    if (this.state.form === true) {
      form = (
        <form className="pop-up-menu" ref="boardtitle"
          onSubmit={this.formSubmitHandler}>
          <div className="pop-up-menu-header group">
            <div className="pop-up-menu-title">Rename Board</div>
            <div className="pop-up-menu-cancel" onClick={this.cancelHandler}>
              <i className="fa fa-times fa-fw" />
            </div>
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
      <div className="board-title-button">
        <div className="board-title"
          onClick={this.nameClickHandler}>
          {this.state.title}
        </div>
        {form}
      </div>
    );
  }
});

module.exports = BoardTitleButton;
