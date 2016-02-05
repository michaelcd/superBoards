var React = require('react'),
    HTML5Backend = require('react-dnd-html5-backend'),
    ListWrapper = require("./listwrapper"),
    ReactDnD = require('react-dnd');
var ApiUtil = require('../../util/api_util');
var NewList = require("./newlist");


// this.props.boards

var ListContainer = React.createClass({
  _onChange: function () {
    this.setState({lists: BoardStore.single().lists, title: BoardStore.single().title,});
  },

  componentWillReceiveProps: function (props) {
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  getInitialState: function(){
      return ({
          lists: BoardStore.single().lists
        });
  },

  compareLists: function(list1, list2){
      return list1.ord - list2.ord;
  },

  swapLists: function(id1, id2) {
      var lists = this.state.lists;

      var list1 = lists.filter(function(c){return c.id === id1;})[0];
      var list2 = lists.filter(function(c){return c.id === id2;})[0];
      var list1Order = list1.ord;
      list1.ord = list2.ord;
      list2.ord = list1Order;

      lists.sort(this.compareLists);
      console.log(lists);

      this.setState({
          lists: lists
      });
  },

  render: function() {
    var lists;
    var newListOrd = 0;
    var that = this;

    if (this.state.lists !== undefined) {
      newListOrd = this.state.lists.length;
      lists = (this.state.lists.map(function (list) {
        return <ListWrapper
          key={list.id}
          id={list.id}
          list={list}
          order={list.ord}
          ord={list.ord}
          swapLists={that.swapLists}/>;
      }));
    } else {
      lists = (<div></div>);
    }

      return (
        <ul className="list-container group">
          {lists}
          <div className="list-wrapper">
            <NewList
              board={this.state.board}
              ord={newListOrd} />
          </div>
        </ul>
      );
  }
});

module.exports = ReactDnD.DragDropContext(HTML5Backend)(ListContainer);
