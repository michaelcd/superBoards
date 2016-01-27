var React = require('react');
var ApiUtil = require('../util/api_util');

var List = React.createClass({
  render: function () {
    var cards;

    return(
      <div className="list">
        <h2>{this.props.list.title}</h2>
        <div className="cards group">
          {cards}
        </div>
      </div>
    );
  }
});

module.exports = List;
