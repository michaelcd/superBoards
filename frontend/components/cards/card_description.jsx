var React = require('react');
var CardStore = require('../../stores/card');
var ApiUtil = require('../../util/api_util');

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.carddetailview);
        if (e.target == component || $(component).has(e.target).length) {
            this.clickInside(e);
        } else {
            this.clickOutside(e);
        }
    },
    componentDidMount: function () {
        $(document).bind('click', this._clickDocument);
    },
    componentWillUnmount: function () {
        $(document).unbind('click', this._clickDocument);
    },
};

var CardDescription = Reacte.createClass({
  render: function () {
    return (
      
    );
  }
});

module.exports = CardDescription;
