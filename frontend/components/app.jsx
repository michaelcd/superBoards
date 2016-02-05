var React = require('react');
var Navbar = require('./navbar/navbar');
var BoardsIndex = require('./boardsindex');
var SessionsApiUtil = require('./../util/sessions_api_util');
var CurrentUserStore = require("./../stores/currentuser");
var LoadingScreen = require('./loadingscreen');


 var App = React.createClass({
   componentDidMount: function () {
    this.appListener = CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();
   },

   componentWillUnmount: function () {
    this.appListener.remove();
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <LoadingScreen />;
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
