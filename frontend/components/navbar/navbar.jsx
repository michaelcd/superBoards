var React = require('react');
var Search = require('./search');
var UserButton = require('./userbutton');

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
      <a href="#/" className="navbar-logo">superBoards</a>
        <button className="boards-button navbar-button">
          <div className="boards-button-icon">
            <i className="fa fa-columns fa-fw"></i>
          </div>
          <div className="boards-button-text">Boards</div>
        </button>
        <Search />
        {list}
        <UserButton />
      </div>
    );
  }
});


module.exports = Navbar;
