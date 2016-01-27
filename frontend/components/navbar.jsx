var React = require('react');

var Navbar = React.createClass({
  render: function () {
    return(
      <div className="Navbar group">
        <div className="Boards button" id="BoardsIcon">Boards</div>
          <div className="BoardsList"></div>
        <div className="NavbarLogo">superBoards</div>
        <div className="User button" id="UserIcon">Username</div>
        <a href="#">Logout</a>
      </div>
    );
  }
});


module.exports = Navbar;
