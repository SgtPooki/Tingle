// ListView
// - opts: [Object]
//   - noResultsMessage: [String] The message to display when there are no entries present.
// - Methods
//   - addEntry(<HTML>): Adds a new row containing the provided contents to the main lower content area.
// - Events:
//   - cleared: (<oldAmount>)

function ListView(opts) {
  opts = opts || {};

  this.eventNames = ['cleared'];
  this._initHandlers();

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
    );//maybe switch to no amount text in the header and display total on bottom, possibly with pagination all more succint in a status bar with clickable page arrows or just scroll..!

    this.noEntriesDomNode = this.domNode.find('.no-entries');
    this.entriesDomNode = this.domNode.find('.entries');
    this.headerDomNode = this.entriesDomNode.find('.header');
    this.currentAmountDomNode = this.headerDomNode.find('.amount');
    this.entryListDomNode = this.entriesDomNode.find('.list');

    this.entryDomNodeTemplate = '<li class="entry"></li>';
    this.separatorDomNodeTemplate = '' +
      '<div class="leaflet-control-layers-separator">' +
      '</div>' +
    '';
  },

  addEntry: function (contents, addlClassNames) {
    this.noEntriesDomNode.hide();
    this.entriesDomNode.show();

    if(this.currentAmount > 0) {
      this.entryListDomNode.append($(this.separatorDomNodeTemplate));
    }
    this.entryListDomNode.append($(this.entryDomNodeTemplate).addClass(addlClassNames).append(contents));

    this.currentAmount++;
    this.currentAmountDomNode.text(this.currentAmount);
  },

  clear: function() {
    this.noEntriesDomNode.show();
    this.entriesDomNode.hide();
    this.entryListDomNode.empty();
    var oldAmount = this.currentAmount;
    this.currentAmount = 0;
    this.triggerEventHandlers('cleared', oldAmount);
  }
};

$.extend(ListView.prototype, EventHandlersMixin.prototype);
