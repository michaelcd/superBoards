var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var BoardsIndex = require('./components/boardsindex');
var App = require('./components/app.jsx');
var BoardDetailView = require('./components/boarddetailview');


BoardStore = require('./stores/board');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={BoardsIndex} />
    <Route path="/boards/:id" component={BoardDetailView} />
  </Route>
);


document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('content');
  ReactDOM.render(<Router>{routes}</Router>, root);
});
