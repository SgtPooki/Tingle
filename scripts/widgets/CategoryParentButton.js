// CategoryParentButton
// - opts: [Object]
//   - category: [Object] - A single category from the database API.
//     - id: [String]
//     - name: [String]
//     - color: [String]
//     - img: [String] - Class name suffix for child category icon selection.
//     - childCategoryButtons: [Array [Object]] - List of child objects to control

function CategoryParentButton(opts) {
  this._setDebugNames();
  CategoryButton.call(this, opts);
};

CategoryParentButton.prototype = Object.create(CategoryButton.prototype);
CategoryParentButton.prototype.constructor = CategoryParentButton;
$.extend(CategoryParentButton.prototype, DebugMixin.prototype);

CategoryParentButton.prototype._initSettings = function(opts) {
  CategoryButton.prototype._initSettings.call(this, opts);

  this.childCategoryButtons = opts.childCategoryButtons || [];
};

CategoryParentButton.prototype.addChild = function(childCategoryButton) {
  this.childCategoryButtons.push(childCategoryButton);
};
CategoryParentButton.prototype.addCategoryButton = CategoryParentButton.prototype.addChild;
CategoryParentButton.prototype.addChildCategoryButton = CategoryParentButton.prototype.addChild;

CategoryParentButton.prototype.toggle = function(toggledOn) {
  CategoryButton.prototype.toggle.call(this, toggledOn);

  this.childCategoryButtons.forEach(function(childCategoryButton) {
    childCategoryButton.toggle(this.toggledOn, this.category);
  }, this);
};

CategoryParentButton.prototype._className = "CategoryParentButton";
