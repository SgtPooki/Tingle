// XButton

function XButton(opts) {
  this._initDOMElements(opts);
};

XButton.prototype._initDOMElements = function(opts) {
  this.domNode = $('' +
    '<a class="button icon-close2" href="javascript:;" title="' + (opts.title || opts.tooltip) + '">' +
      '×' +
    '</a>'
  );
};
