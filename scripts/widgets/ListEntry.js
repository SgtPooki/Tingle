// MarkerListEntry
// - opts: [Object] Typical options object.
//   - title
//   - description
//   - onClick: [Function] The function to call when clicked.  Enables the presentation flag / class name `clickable`.

function ListEntry(opts) {
  this._setDebugNames();
  this._initDOMElements(opts);
  this._setupUIInteraction(opts);
};

ListEntry.prototype = {
  _initDOMElements: function(opts) {
    this.domNode = $('' +
      '<div class="marker-entry">' +
        '<span class="icon">' +
        '</span>' +
        '<span class="details">' +
          '<div class="title">' +
            opts.title +
          '</div>' +
          '<div class="description">' +
            opts.description +
          '</div>' +
        '</span>' +
      '</div>'
    );

    if(opts.onClick) this.domNode.addClass('clickable');

    this.icon = this._makeIcon(opts);
    this.iconNode = this.domNode.find('.icon');
    this.iconNode.append(this.icon.domNode);
  },

  _makeIcon: $.noop,

  _setupUIInteraction: function(opts) {
    this.domNode.on('click', opts.onClick.bind(this, opts));
  }
};
$.extend(ListEntry.prototype, DebugMixin.prototype);
