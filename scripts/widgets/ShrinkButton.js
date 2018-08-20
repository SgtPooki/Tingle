// ShrinkButton

function ShrinkButton(opts) {
  opts = opts || {};
  this._initDOMElements(opts);
};

ShrinkButton.prototype._initDOMElements = function(opts) {
  this.domNode = $('' +
    '<a class="button shrink icon-shrink ' + (opts.addlClasses || "") + '" href="#close">' +
    '</a>'
  );
};
