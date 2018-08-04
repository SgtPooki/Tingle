// CategoryIcon

function CategoryIcon(opts) {
  Icon.call(this, opts);
  this._initDOMElements(opts);
};
CategoryIcon.prototype = Object.create(Icon.prototype);
CategoryIcon.prototype.constructor = CategoryIcon;

CategoryIcon.prototype._initDOMElements = function(opts) {
  Icon.prototype._initDOMElements.call(this, opts);
  this.domNode.addClass('category-icon circle');
};
