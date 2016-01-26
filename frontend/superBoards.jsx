var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var BoardsIndex = require('./components/boardsindex');
var App = require('./components/app.jsx');


BoardStore = require('./stores/board');

var routes = (
  <Route path="/" component={App}>
  </Route>
);


document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('content');
  ReactDOM.render(<Router>{routes}</Router>, root);
});
