var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var CardConstants = require('../constants/card_constants');

var _card = {};
var CardStore = new Store (AppDispatcher);

var resetCard = function (card) {
  _card = card;
};

CardStore.card = function () {
  return _card;
};

CardStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CardConstants.CARD_RECEIVED:
      resetCard(payload.card);
      CardStore.__emitChange();
      break;
  }
};

module.exports = CardStore;
