// HistoryBox
// - Methods:
//   - addEntry(historyEvent)

L.Control.InfoBox.ListBox.HistoryBox = L.Control.InfoBox.ListBox.extend({
  _className: "L.Control.InfoBox.HistoryBox",

  options: {
    title: "Action History",
    className: "history",
    noResultsMessage: 'No applicable previous actions performed.'
  },

  initialize: function() {
    L.Control.InfoBox.ListBox.prototype.initialize.call(this);
    L.DomEvent.disableClickPropagation(this._listView.domNode[0]);
    L.DomEvent.on(this._listView.domNode[0], 'mousewheel', L.DomEvent.stopPropagation);
    this._addHistoryHandler();
  },

  onAdd: function() {
    L.Control.InfoBox.ListBox.prototype.onAdd.call(this);
    this.clearLink = $(
      '<a class="button icon-close2" href="javascript:; title="Clear Entries">×</a>'
    );
    L.DomEvent.on(
      this.clearLink[0],
      'click',
      this._listView.clear.bind(this._listView)
    );
    this._listView.headerDomNode.append(this.clearLink);

    return this.domNode;
  },

  _addHistoryHandler: function() {
    historyService.addEventHandler(
      'historyAction',
      this.addEntry.bind(this)
    );
  },

  addEntry: function (historyEvent) {
    this._listView.addEntry(
      new HistoryListEntry(historyEvent).domNode,
      ((historyEvent.test) ? "test" : "")
    );
  }

	// onRemove: function() {
	// 	locationInfo.destroy();
	// };
});

L.control.infoBox.listBox.historyBox = function(opts) {
  return new L.Control.InfoBox.ListBox.HistoryBox(opts);
};
