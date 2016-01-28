var React = require('react');

var Navbar = React.createClass({
  getInitialState: function () {
    return ({boardsList: false});
  },

  render: function () {
    var list;

    if (this.state.boardsList === true) {
      list = <div className="boards-list"></div>;
    }

    return(
      <div className="navbar group">
        <div className="boards-button" id="BoardsIcon">Boards</div>
          {list}
        <a href="#/" className="navbar-logo">superBoards</a>
        <div className="navbar-user" id="UserIcon">Username</div>
      </div>
    );
  }
});


module.exports = Navbar;
