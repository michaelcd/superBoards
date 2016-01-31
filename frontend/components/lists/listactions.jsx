var React = require('react');

var ListActions = React.createClass({
  render: function () {
    return (
      <div className="list-actions-menu">
        <div className="list-actions-title">List Actions</div>
        <div className="list-actions-cancel">X</div>
        <a href="#" className="list-actions-option">Add Card</a>
        <a href="#" className="list-actions-option">Copy List</a>
        <a href="#" className="list-actions-option">Archive List</a>
      </div>
    );
  }
});

module.exports = ListActions;
