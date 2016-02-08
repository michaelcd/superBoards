var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var CurrentUserConstants = require('../constants/currentuser_constants');

var ErrorStore = new Store (AppDispatcher);

var _errors = [];

var resetErrors = function (errors) {
  _errors = errors.responseJSON[0];
  console.log(_errors);
};

ErrorStore.all = function () {
  return _errors.slice(0);
};

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CurrentUserConstants.ERRORS_RECEIVED:
      resetErrors(payload.errors);
      ErrorStore.__emitChange();
      break;
  }
};

module.exports = ErrorStore;
