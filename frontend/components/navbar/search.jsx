var React = require('react');
var ReactDOM = require('react-dom');
var SearchResultsStore = require('../../stores/search_results_store');
var SearchApiUtil = require('../../util/search_api_util');
var CardResult = require('./search_card_result');
var ListResult = require('./search_list_result');
var BoardResult = require('./search_board_result');
var SearchResults = require('./searchresults');

var ClickMixin = {
    _clickDocument: function (e) {
        var component = ReactDOM.findDOMNode(this.refs.searchComponent);
        if (e.target == component || $(component).has(e.target).length) {
            this.clickInside(e);
        } else {
            this.clickOutside(e);
        }
    },
    componentDidMount: function () {
        $(document).bind('click', this._clickDocument);
    },
    componentWillUnmount: function () {
        $(document).unbind('click', this._clickDocument);
    },
};

var Search = React.createClass({
  mixins: [ClickMixin],

  getInitialState: function () {
    return ({results: {}, input: ""});
  },

  changeHandler: function (event) {
    this.setState({input: event.currentTarget.value});
    SearchApiUtil.search(event.currentTarget.value);
  },

  componentDidMount: function () {},

  componentWillUnmount: function () {},

  _onChange: function () {},

  openSearch: function () {
    this.setState({searching: true});
  },

  closeSearch: function (event) {
    this.setState({searching: false});
  },

  clickInside: function () {
    this.setState({searching: true});
  },

  clickOutside: function (event) {
    this.setState({searching: false});
  },

  clearForm: function () {
    this.setState({searching: false, input: ""});
  },

  render: function () {
    var results;
    var input = this.state.input;

    if (this.state.searching === true) {
      results = (
        <SearchResults />
      );
    }

    return (
      <div className="navbar-search-container navbar-button" ref="searchComponent">
        <input className="navbar-search-input"
          onFocus={this.openSearch}
          onChange={this.changeHandler}
          value={input} />
        <div className="navbar-search-icon">
            <i className="fa fa-search fa-fw" />
        </div>
        <div>{results}</div>
      </div>
    );
  }
});

module.exports = Search;
