// ListView
// - opts: [Object]
//   - noResultsMessage: [String] The message to display when there are no entries present.
// - Methods
//   - addEntry(<HTML>): Adds a new row containing the provided contents to the main lower content area.

function ListView(opts) {
  opts = opts || {};

  this._initSettings(opts);
  this._initDOMElements(opts);

  this.clear();
};

ListView.prototype = {
  _initSettings: function(opts) {
    this.noResultsMessage = getSetOrDefaultValue(opts.noResultsMessage, "No entries.");
  },

  _initDOMElements: function(opts) {
    this.domNode = $('' +
      '<div class="list-view">' +
        '<div class="no-entries">' +
          this.noResultsMessage +
        '</div>' +
        '<div class="entries">' +
          '<div class="header">' +
            '<span class="amount"></span> entries.' +
          '</div>' +
          '<ul class="list">' +
          '</ul>' +
        '</div>' +
      '</div>'
    );//maybe switch to no amount text and display total on bottom, possibly with pagination all in a status bar with clickable page arrows or just scroll..!

    this.noEntriesDomNode = this.domNode.find('.no-entries');
    this.entriesDomNode = this.domNode.find('.entries');
    this.currentAmountDomNode = this.entriesDomNode.find('.header .amount');
    this.entryListDomNode = this.entriesDomNode.find('.list');

    this.entryDomNodeTemplate = '<li class="entry"></div>';
    this.separatorDomNodeTemplate = '' +
      '<div class="leaflet-control-layers-separator">' +
      '</div>' +
    '';
  },

  addEntry: function (contents) {
    this.noEntriesDomNode.hide();
    this.entriesDomNode.show();

    this.entryListDomNode.append($(this.entryDomNodeTemplate).append(contents));
    this.entryListDomNode.append($(this.separatorDomNodeTemplate));

    this.currentAmount++;
    this.currentAmountDomNode.text(this.currentAmount);
  },

  clear: function() {
    this.noEntriesDomNode.show();
    this.entriesDomNode.hide();
    this.entryListDomNode.empty();
    this.currentAmount = 0;
  }
};
