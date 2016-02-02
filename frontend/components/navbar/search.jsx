var React = require('react');
var SearchResultsStore = require('../../stores/search_results_store');
var SearchApiUtil = require('../../util/search_api_util');
var CardResult = require('./search_card_result');
var ListResult = require('./search_list_result');
var BoardResult = require('./search_board_result');
var SearchResults = require('./searchresults');


var Search = React.createClass({
  getInitialState: function () {
    return ({results: {}, input: ""});
  },

  changeHandler: function (event) {
    this.setState({input: event.currentTarget.value});
    SearchApiUtil.search(event.currentTarget.value);
  },

  componentDidMount: function () {
    this.storeListener = SearchResultsStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({results: SearchResultsStore.all()});
  },

  openSearch: function () {
    this.setState({searching: true});
  },

  closeSearch: function (event) {
    console.log(event);
    this.setState({searching: false});
  },

  render: function () {
    var results;

    if (this.state.searching === true) {
      results = (
        <SearchResults results={this.state.results} />
      );
    }

    return (
      <div className="navbar-search-container navbar-button">
        <input className="navbar-search-input"
          onFocus={this.openSearch}
          onFocusOut={this.closeSearch}
          onChange={this.changeHandler}
          value={this.state.input}/>
        <div className="navbar-search-icon">
            <i className="fa fa-search fa-fw" />
        </div>
        {results}
      </div>
    );
  }
});

module.exports = Search;
