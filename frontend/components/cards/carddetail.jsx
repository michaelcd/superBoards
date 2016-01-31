var React = require('react');

// this.props.list
// this.props.card

var CardDetail = React.createClass({
  render: function () {
    return (
      <div className="window-overlay">
        <div className="window-content">
          <div className="card-detail-view group"></div>
            <div className="card-detail-header">
              <div className="card-detail-title">
                {this.props.card.title}
              </div>
              in list
              <div className="card-detail-title-list">
                {this.props.list.title}
              </div>
            </div>
        </div>
      </div>
    );
  }
});

module.exports = CardDetail;
