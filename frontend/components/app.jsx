var React = require('react');
var Navbar = require('./navbar');
var BoardsIndex = require('./boardsindex');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
});
