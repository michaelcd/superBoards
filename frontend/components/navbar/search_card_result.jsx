var React = require('react');

// this.props.card

var CardResults = React.createClass({
  render: function () {

    var cards = this.props.cards.map(function (card) {
      return (
        <div className="search-result-container" key={card.id}>
          <a className="search-result-link"
            href={"#/boards/" + card.board_id + "/cards/" + card.id}>
            {card.title}
          </a>
        </div>
      );
    });

    return (
      <div className="results">
        <div className="search-result-label">Cards</div>
        {cards}
      </div>

    );
  }
});

module.exports = CardResults;
