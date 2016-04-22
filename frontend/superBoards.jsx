var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var BoardsIndex = require('./components/boardsindex');
var App = require('./components/app.jsx');
var BoardDetailView = require('./components/boarddetailview');
var CardDetail = require('./components/cards/carddetail');
var CurrentUserStore = require('./stores/currentuser');
var SessionsApiUtil = require('./util/sessions_api_util');
var SessionForm = require('./components/sessionform');
var BoardStore = require('./stores/board');

var router = (
  <Router>
    <Route path="login" component={SessionForm} />
    <Route path="/" component={App} onEnter={_ensureLoggedIn}>
      <IndexRoute component={BoardsIndex} onEnter={_ensureLoggedIn} />
      <Route path="/boards/:board_id" component={BoardDetailView} >
        <Route path="/boards/:board_id/cards/:card_id" component={CardDetail} />
      </Route>
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn () {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/login");
    }
      callback();
    }
}


document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('content');
  ReactDOM.render(router, root);
});
