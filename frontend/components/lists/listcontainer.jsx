var React = require('react');
var ListWrapper = require("./listwrapper");
var NewList = require("./newlist");
var ReactDnD = require('react-dnd');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var ApiUtil = require('../../util/api_util');


var Container = React.createClass({
  getInitialState: function(){
      return {lists: [] };
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  _onChange: function () {
    this.setState({lists: BoardStore.single().lists});
  },

  compareLists: function(list1, list2){
      return list1.order - list2.order;
  },

  swapLists: function(order1, order2) {
    var lists = this.state.lists;
    var list1 = lists.filter(function(c){return c.ord === order1;})[0];
    var list2 = lists.filter(function(c){return c.ord === order2;})[0];
    var list1Order = list1.order;
    list1.order = list2.order;
    list2.order = list1Order;
    lists.sort(this.compareLists);

    this.setState({
        lists: lists
    });
  },

  render: function() {

    if (this.state.lists !== undefined) {
      newListOrd = this.state.lists.length;
      lists = (this.state.lists.map(function (list) {
        return (
          <ListWrapper key={list.id}
            ord={list.ord}
            order={list.ord}
            list={list}
            swapLists={this.swapLists} />
        );
      }, this));
    } else {
      lists = (<div></div>);
    }


  return (
    <ul className="list-container">
      {lists}
      <div className="list-wrapper">
        <NewList
          board={this.props.board}
          ord={newListOrd} />
      </div>
    </ul>
    );
  }
});

module.exports = ReactDnD.DragDropContext(HTML5Backend)(Container);
