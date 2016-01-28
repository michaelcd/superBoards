var React = require('react');
var ApiUtil = require('../util/api_util');

var NewCard = React.createClass({
  render: function () {
    return(
      <div className="new-card">
        <div className="new-card-title">Add a card...</div>
      </div>
    );
  }
});

module.exports = NewCard;
