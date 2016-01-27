var React = require('react');
var BoardStore = require('../stores/board');
var ApiUtil = require('../util/api_util');

BoardDetailView = React.createClass({
  getInitialState: function () {
    return({board: BoardStore.single()});
  },

  _onChange: function () {
    this.setState({board: BoardStore.single()});
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
    ApiUtil.fetchBoard(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  render: function () {
    return (
      <div>
        {this.state.board.title}
      </div>
    );
  }
});

module.exports = BoardDetailView;
