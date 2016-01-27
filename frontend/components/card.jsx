var React = require('react');
var ApiUtil = require('../util/api_util');

var Card = React.createClass({
  render: function () {
    return(
      <div className="card">
        <h2>{this.props.list.title}</h2>
      </div>
    );
  }
});

module.exports = Card;
