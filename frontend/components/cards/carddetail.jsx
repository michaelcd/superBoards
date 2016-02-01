var React = require('react');
var CardStore = require('../../stores/card');
var ApiUtil = require('../../util/api_util');


var CardDetail = React.createClass({
  getInitialState: function () {
    return ({card: CardStore.card(), board_id: BoardStore.single().id});
  },

  componentDidMount: function () {
    this.cardListener = CardStore.addListener(this._onChange);
    ApiUtil.fetchCard(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.cardListener.remove();
  },

  _onChange: function () {
    this.setState({card: CardStore.card(), board_id: BoardStore.single().id});
  },

  render: function () {
    return (
        <div className="window-overlay">
          <div className="window-content">
            <div className="card-detail-view">
              <a href={"#/boards/" + this.state.board_id} className="card-detail-cancel">
                <i className="fa fa-times fa-fw" />
              </a>
              <div className="card-detail-header">
                <div className="card-detail-title">
                  {this.state.card.title}
                </div>
                <div className="card-detail-header-words">
                  in list <div className="card-detail-header-list-title">
                    list title placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = CardDetail;
