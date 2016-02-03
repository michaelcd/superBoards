var React = require('react');

var ListResults = React.createClass({
  render: function () {

    var lists = this.props.lists.map(function (list) {
      return (
        <div className="search-result-container" key={list.id}>
          <a className="search-result-link"
            href={"#/boards/" + list.board_id}>
            {list.title}
          </a>
        </div>
      );
    });


    var list;


    return (
      <div className="results">
        <div className="search-result-label">Lists</div>
        {lists}
      </div>
    );
  }
});

module.exports = ListResults;
