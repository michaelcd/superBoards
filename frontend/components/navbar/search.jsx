var React = require('react');
var SearchResultsStore = require('../../stores/search_results_store');
var SearchApiUtil = require('../../util/search_api_util');

var Search = React.createClass({
  getInitialState: function () {
    return ({results: {}, input: ""});
  },

  changeHandler: function (event) {
    this.setState({input: event.currentTarget.value});
    // SearchApiUtil.search(event.currentTarget.value);
  },

  componentDidMount: function () {
    this.storeListener = SearchResultsStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({results: SearchResultsStore.all()});
    console.log(this.state.results);
  },

  render: function () {
    return (
      <div className="navbar-search-container navbar-button">
        <input className="navbar-search-input"
          onChange={this.changeHandler}
          value={this.state.input}/>
        <div className="navbar-search-icon">
            <i className="fa fa-search fa-fw" />
        </div>
      </div>
    );
  }
});

module.exports = Search;
