// MarkerListView
// - opts: [Object] Typical options object.
//   - markerEntryClick: [Function] The function to execute when a marker entry in the list is clicked.

function MarkerListView(opts) {
  ListView.call(this, $.extend(this.options, opts));
  this._initSettings(opts);
};

MarkerListView.prototype = $.extend({}, ListView.prototype, {
  _initSettings: function(opts) {
    ListView.prototype._initSettings.call(this, opts);
    this.markerEntryClick = opts.markerEntryClick;
  },

  showMarkers: function(query, markers) {
    this.clear();

    this.currentSearchQueryDomNodes.text(query);

    this._addEntries(markers);
  },

  _addEntries: function(markers = []) {
    markers.forEach(function(marker) {
      this.addEntry(
        this._createEntry(
          marker,
          { onClick: this.markerEntryClick }
        ).domNode
      );
    }, this);
  },

  _createEntry: function(marker, opts) {
    return new MarkerListEntry(marker, opts);
  }
});
