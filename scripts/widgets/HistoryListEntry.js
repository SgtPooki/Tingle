// HistoryListEntry

function HistoryListEntry(opts) {
  this._initDOMElements(opts);
};
HistoryListEntry.prototype = Object.create(ListEntry.prototype);
HistoryListEntry.prototype.constructor = HistoryListEntry;

HistoryListEntry.prototype._initDOMElements = function(opts) {
  this.domNode = $('' +
    '<div>' +
      '<span class="icon ' + opts.type + '"></span>' +
      '<span class="details">' +
        '<div class="title">' +
          opts.title +
        '</div>' +
        '<div class="content">' +
          opts.content +
        '</div>' +
      '</span>' +
    '</div>' +
    ''
  );

  this.icon = new HistoryIcon({ img: opts.icon, color: opts.color });
  this.iconNode = this.domNode.find('.icon');
  this.iconNode.append(this.icon.domNode);
};
