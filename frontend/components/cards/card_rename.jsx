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
    return({renameVal: this.props.card.title, rename: false});
  },

  componentWillReceiveProps: function () {
    this.setState({renameVal: this.props.card.title});
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
    ApiUtil.updateCard(card);
    this.setState({rename: false});
  },

  renameFormChangeHandler: function (e) {
    this.setState({renameVal: e.currentTarget.value});
  },

  renameCancelHandler: function (e) {
    e.preventDefault();
    this.setState({rename: false});
  },


  render: function () {


    if (this.state.rename === true) {
      rename = (
        <div className="card-rename-form group" ref="cardrename">
          <form onSubmit={this.renameFormOnSubmit}>
            <input type="text"
              className="card-rename-form-input"
              onChange={this.renameFormChangeHandler}
              value={this.state.renameVal} />
            <button className="list-form-save">Save</button>
            <a href="#" className="list-form-cancel" onClick={this.renameCancelHandler}>X</a>
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
