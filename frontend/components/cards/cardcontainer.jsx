var React = require('react'),
    HTML5Backend = require('react-dnd-html5-backend'),
    CardWrapper = require("./cardwrapper"),
    ReactDnD = require('react-dnd');
var ApiUtil = require('../../util/api_util');
var NewList = require("./newcard");

// this.props.cards

// approach:
// set up so there is only one card container
// have list container handle card sorting as well
// sorted car
// Api Request for card movements works



var CardContainer = React.createClass({
  componentWillReceiveProps: function (props) {
    this.setState({cards: props.cards});
  },

  _onChange: function () {
    this.setState({});
  },

  componentDidMount: function () {
    this.boardListener = BoardStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.boardListener.remove();
  },

  getInitialState: function(){
      return ({});
  },

  compareCards: function(card1, card2){
      return card1.ord - card2.ord;
  },

  swapCards: function(id1, id2) {
      var cards = this.state.cards;

      var card1 = cards.filter(function(c){return c.id === id1;})[0];
      var card2 = cards.filter(function(c){return c.id === id2;})[0];
      var card1Order = card1.ord;
      card1.ord = card2.ord;
      card2.ord = card1Order;

      cards.sort(this.compareCards);

      this.setState({
          cards: cards
      });
  },

  render: function() {
    var cards;
    var that = this;
    var newCardOrd = this.props.list.cards.length;
    cards = this.props.list.cards.map(function (card) {
      return <CardWrapper
                id={card.id}
                key={card.id}
                card={card}
                list={that.props.list}
                ord={card.ord}
                swapCards={that.swapCards}
              />;
    });

      return (
        <div className="cards">
          {cards}
        </div>
      );
  }
});

module.exports = CardContainer;
