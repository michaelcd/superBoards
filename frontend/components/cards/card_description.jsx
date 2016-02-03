var React = require('react');
var ReactDOM = require('react-dom');
var CardStore = require('../../stores/card');
var ApiUtil = require('../../util/api_util');

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.carddescription);
        if (e.target == component || $(component).has(e.target).length) {
            this.clickInside(e);
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

var CardDescription = React.createClass({
  mixins: [ClickMixin],

  clickInside: function () {},

  getInitialState: function () {
    return({descriptionVal: "", descriptionEdit: false});
  },

  componentDidMount: function () {
    this.cardListener = CardStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.cardListener.remove();
  },

  _onChange: function () {
    this.setState({descriptionVal: CardStore.card().description});
  },

  editDescription: function () {
    this.setState({descriptionEdit: true});
  },

  descFormOnSubmit: function (e) {
    e.preventDefault();
    var card = this.props.card;
    card.description = this.state.descriptionVal;
    ApiUtil.updateCard(card);
    this.setState({descriptionEdit: false});
  },

  changeHandler: function (e) {
    this.setState({descriptionVal: e.currentTarget.value});
  },

  closeMenu: function (e) {
    this.setState({descriptionEdit: false});
  },

  render: function () {

    if (this.state.descriptionEdit === true) {
      description = (
        <div className="edit-description-box" ref="carddescription">
          <div className="edit-description-heading">Description</div>
          <form onSubmit={this.descFormOnSubmit}>
            <textarea type="text"
              className="edit-description-textarea"
              onChange={this.changeHandler}
              value={this.state.descriptionVal} />
            <button className="list-form-save">Save</button>
            <div className="list-form-cancel" onClick={this.closeMenu}>
              <i className="fa fa-times fa-fw" />
            </div>
          </form>
        </div>
      );
    } else {
      description = (
        <div className="edit-description-box" onClick={this.editDescription}>
          <div className="edit-description-heading">Description</div>
          <div className="edit-description-box-description">{this.state.descriptionVal}</div>
        </div>
      );
    }

    return (
      <div className="card-detail-description-box">
        {description}
      </div>
    );
  }
});

module.exports = CardDescription;
