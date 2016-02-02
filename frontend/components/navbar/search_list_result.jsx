var React = require('react');

var ListResult = React.createClass({
  render: function () {
    var list;

    if (this.props.list !== undefined) {
      list = (
        <a className="search-result-link"
          href={"#/boards/" + this.props.list.board_id}>
          {this.props.list.title}
        </a>
      );
    }


    return (
      <div className="list-result-container">
        {list}
      </div>
    );
  }
});

module.exports = ListResult;
