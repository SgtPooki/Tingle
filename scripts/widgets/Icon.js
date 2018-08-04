// Icon
// - opts: [Object]
//   - color: [String]
//   - img: [String] - Class name suffix for icon selection.

function Icon(opts) {
  this._setDebugNames();
  opts = opts || {};

  this._initDOMElements(opts);
};
$.extend(Icon.prototype, DebugMixin.prototype);

Icon.prototype._initDOMElements = function(opts) {
  this.domNode = $('' +
    '<span class="icon-background icon-' + opts.img + '">' +
    '</span>'
  );

  this.domNode.css('background-color', opts.color);
  this.domNode.css('border-color', opts.color);
};
