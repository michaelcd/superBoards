var React = require('react');

// this.props.card

var CardResult = React.createClass({

  render: function () {
    var card;
    console.log(this.props.card);

    if (this.props.card !== undefined) {
      card = (
        <a className="search-result-link"
          href={"#/boards/" + this.props.card.board_id + "/cards/" + this.props.card.id}>
          {this.props.card.title}
        </a>
      );
    }


    return (
      <div className="card-result-container">
        {card}
      </div>
    );
  }
});

module.exports = CardResult;
