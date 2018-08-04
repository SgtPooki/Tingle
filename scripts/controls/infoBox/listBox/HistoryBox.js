// HistoryBox

L.Control.InfoBox.ListBox.HistoryBox = L.Control.InfoBox.ListBox.extend({
  _className: "L.Control.InfoBox.HistoryBox",

  options: {
    title: "Action History",
    className: "history",
    noResultsMessage: 'No applicable previous actions performed.'
  },

  initialize: function() {
    L.Control.InfoBox.ListBox.prototype.initialize.call(this);
    this._addHistoryHandler();
  },

  _addHistoryHandler: function() {
    historyService.addEventHandler(
      'historyAction',
      this.addEntry.bind(this)
    );
  },

  addEntry: function (historyEvent) {
    this.listView.addEntry(
      new HistoryListEntry(historyEvent).domNode
    );
  }

	// onRemove: function() {
	// 	locationInfo.destroy();
	// };
});

L.control.infoBox.listBox.historyBox = function(opts) {
  return new L.Control.InfoBox.ListBox.HistoryBox(opts);
};
