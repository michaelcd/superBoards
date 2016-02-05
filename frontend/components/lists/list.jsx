var React = require('react');
var ReactDOM = require('react-dom');
var CardWrapper = require('./../cards/cardwrapper');
var CardContainer = require('./../cards/cardcontainer');
var NewCard = require('./../cards/newcard');
var ApiUtil = require('../../util/api_util');
var ListMenu = require('./listmenu');

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.listrename);
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

var List = React.createClass({
  mixins: [ClickMixin],

  getInitialState: function () {
    return ({
      titleClass: "list-title",
      formClass: "hidden",
      formVal: this.props.list.title
    });
  },

  formChangeHandler: function (event) {
    this.setState({formVal: event.currentTarget.value});
  },

  formSubmit: function (event) {
    event.preventDefault();
    this.props.list.title = this.state.formVal;
    ApiUtil.updateList(this.props.list);
    this.setState({form: false});
  },

  openMenu: function (e) {
    this.setState({form: true});
  },

  closeMenu: function (e) {
    this.setState({form: false});
  },

  titleClick: function () {
    this.setState({form: true});
  },

  cancelHandler: function (event) {
    event.preventDefault();
    this.setState({form: false});
  },

  render: function () {
    var cards;
    var that = this;
    var newCardOrd = this.props.list.cards.length;
    cards = this.props.list.cards.map(function (card) {
      return <CardWrapper
        listId={that.props.list.id}
        key={card.id}
        card={card}
        list={that.props.list}
        ord={card.ord}
        />;
    });

    // var connectDragSource = this.props.connectDragSource;
    // var isDragging = this.props.isDragging;

    var content;

    if (this.state.form === true) {
      content = (
        <div className="list-form group">
          <form onSubmit={this.formSubmit} ref="listrename">
            <input type="text"
              className="list-form-input"
              onChange={this.formChangeHandler}
              value={this.state.formVal} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel-wrapper" onClick={this.cancelHandler}>
              <div className="list-form-cancel">
                <i className="fa fa-times fa-fw" />
              </div>
            </a>
          </form>
        </div>
      );
    } else {
      content = (
        <div className="list-title-container">
          <div onClick={this.titleClick} className="list-title">
            {this.props.list.title}
          </div>
          <ListMenu list={this.props.list}/>
        </div>
      );
    }

    return (
      <li className="list">
        <div className="list-title-wrapper">{content}</div>
        <CardContainer
          cards={this.props.list.cards}
          list={this.props.list}
          />
        <NewCard
          listId={that.props.list.id}
          list={that.props.list}
          ord={newCardOrd}
          />
      </li>
    );
  }
});

module.exports = List;
