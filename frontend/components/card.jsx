var React = require('react');
var ApiUtil = require('../util/api_util');

var Card = React.createClass({
  render: function () {
    return(
      <div className="card">
        <div className="card-title">{this.props.card.title}</div>
      </div>
    );
  }
});

module.exports = Card;
