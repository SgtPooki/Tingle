// HistoryIcon

function HistoryIcon(opts) {
  Icon.call(this, opts);
  this._initDOMElements(opts);
};
HistoryIcon.prototype = Object.create(Icon.prototype);
HistoryIcon.prototype.constructor = HistoryIcon;

HistoryIcon.prototype._initDOMElements = function(opts) {
  Icon.prototype._initDOMElements.call(this, opts);
  this.domNode.addClass('history-icon medium-circle');
};
