var React = require('react');
var ReactDOM = require('react-dom');
var CardStore = require('../../stores/card');
var ApiUtil = require('../../util/api_util');

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.cardrename);
        if (e.target == component || $(component).has(e.target).length) {
            this.openRename(e);
        } else {
            this.closeRename(e);
        }
    },
    componentDidMount: function () {
        $(document).bind('click', this._clickDocument);
    },
    componentWillUnmount: function () {
        $(document).unbind('click', this._clickDocument);
    },
};

var CardRename = React.createClass({
  mixins: [ClickMixin],

  getInitialState: function () {
    return({renameVal: "", rename: false});
  },

  componentDidMount: function () {
    this.cardListener = CardStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.cardListener.remove();
  },

  _onChange: function () {
    this.setState({renameVal: CardStore.card().title});
  },

  openRename: function () {
    this.setState({rename: true});
  },

  closeRename: function () {
    this.setState({rename: false});
  },

  renameFormOnSubmit: function (e) {
    e.preventDefault();
    var card = this.props.card;
    card.title = this.state.renameVal;
    console.log(card);
    ApiUtil.updateCard(card);
    this.setState({rename: false});
  },

  changeHandler: function (e) {
    this.setState({renameVal: e.currentTarget.value});
  },

  renameCancelHandler: function (e) {
    e.preventDefault();
    this.setState({rename: false});
  },


  render: function () {
    var input;

    if (this.state.renameVal === "") {
      input = this.props.card.title;
    } else {
      input = this.state.renameVal;
    }


    if (this.state.rename === true) {
      rename = (
        <div className="card-rename-form group" ref="cardrename">
          <form onSubmit={this.renameFormOnSubmit}>
            <input type="text"
              className="card-rename-form-input"
              onChange={this.changeHandler}
              value={input} />
            <button className="new-comment-button">Save</button>
            <a href="#" className="list-form-cancel" onClick={this.renameCancelHandler}>
              <i className="fa fa-times fa-fw" />
            </a>
          </form>
        </div>
      );
    } else {
      rename = (
        <div className="card-detail-title" onClick={this.openRename}>
          {this.props.card.title}</div>
      );
    }

    return (
      <div>{rename}</div>
    );
  }
});

module.exports = CardRename;
