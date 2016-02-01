var Dispatcher = require('../dispatcher/dispatcher.js');
var CardConstants = require('../constants/card_constants');

module.exports = {
  receiveCard: function (card) {
    Dispatcher.dispatch({
      actionType: CardConstants.CARD_RECEIVED,
      card: card
    });
  }
};
