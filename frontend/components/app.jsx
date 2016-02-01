var React = require('react');
var Navbar = require('./navbar/navbar');
var BoardsIndex = require('./boardsindex');
var SessionsApiUtil = require('./../util/sessions_api_util');
var CurrentUserStore = require("./../stores/currentuser");


 var App = React.createClass({
   componentDidMount: function () {
     CurrentUserStore.addListener(this.forceUpdate.bind(this));
     SessionsApiUtil.fetchCurrentUser();
   },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>PLEASE WAIT</p>;
    }

    return (
      <div className="App">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
