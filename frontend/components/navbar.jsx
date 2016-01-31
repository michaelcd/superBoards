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
        <button className="boards-button navbar-button">
          <div className="boards-button-text">Boards</div>
        </button>
        <div className="navbar-search-container"></div>
        {list}
      <a href="#/" className="navbar-logo">superBoards</a>
        <button className="user-button navbar-button">
          <div className="user-button-text">Username</div>
        </button>
      </div>
    );
  }
});


module.exports = Navbar;
