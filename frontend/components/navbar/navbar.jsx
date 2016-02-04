var React = require('react');
var Search = require('./search');
var UserButton = require('./userbutton');
var BoardButton = require('./boardbutton');


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
      <a href="#/" className="navbar-logo">
        <img src={logoNavBarPath}/>
      </a>
        <BoardButton />
        <Search />
        {list}
        <UserButton />
      </div>
    );
  }
});


module.exports = Navbar;
