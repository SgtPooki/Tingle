// HistoryBox
// - Methods:
//   - addEntry(historyEvent)
// - Events:
//   - cleared: (<amount>)

L.Control.InfoBox.ListBox.HistoryBox = L.Control.InfoBox.ListBox.extend({
  _className: "L.Control.InfoBox.HistoryBox",

  options: {
    title: "Action History",
    className: "history",
    noResultsMessage: 'No applicable previous actions performed.',
    collapsed: ZConfig.getBooleanConfig("HistoryBox.collapsed")
  },

  initialize: function() {
    L.Control.InfoBox.ListBox.prototype.initialize.call(this);
    L.DomEvent.disableClickPropagation(this._listView.domNode[0]);
    L.DomEvent.on(this._listView.domNode[0], 'mousewheel', L.DomEvent.stopPropagation);
    this._addHistoryHandler();
  },

  onAdd: function() {
    L.Control.InfoBox.ListBox.prototype.onAdd.call(this);

    this._setupContainer(); // Since this is the only class I have manually setup collapse/expand functionality.
    this._setupExpandElement();

    this._addShrinkButton();
    this._addClearLink();

    this._updateCollapsedState();

    return this._container;
  },

  _setupContainer: function() {
    this._container = L.DomUtil.create(
      'div',
      this.options.className
    );
    $(this._container).append(this.domNode);
  },

  _setupExpandElement: function() {
    this.alternativeDomNode = L.DomUtil.create(
      'div',
      this.options.className + ' other-side'
    );
    $(this.alternativeDomNode).hide();
    $(this.alternativeDomNode).append(
      $('<a class="icon-BotW_Memories expand button" href="javascript:;"></a>')
    );
    L.DomEvent.on(
      this.alternativeDomNode,
      'click',
      this.toggle.bind(this)
    );
    $(this._container).append(this.alternativeDomNode);
  },

  _addShrinkButton: function() {
    this.shrinkButton = new ShrinkButton();
    L.DomEvent.on(
      this.shrinkButton.domNode[0],
      'click',
      this.toggle.bind(this)
    );
    $(this.headerDomNode).append(this.shrinkButton.domNode);
  },

  _addClearLink: function() {
    this.clearLink = new XButton({ tooltip: "Clear Entries" });
    L.DomEvent.on(
      this.clearLink.domNode[0],
      'click',
      this._listView.clear.bind(this._listView)
    );
    this._listView.headerDomNode.append(this.clearLink.domNode);
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

L.Control.InfoBox.ListBox.HistoryBox.include(Collapsable.prototype);

L.control.infoBox.listBox.historyBox = function(opts) {
  return new L.Control.InfoBox.ListBox.HistoryBox(opts);
};
