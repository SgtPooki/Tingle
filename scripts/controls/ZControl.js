// ZControl - The base Leaflet control class for the Zelda Maps
//  project.  Should be useful for convenient helper functions applicable to
//  all derived controls.
// - options: [Object]
//   - className: [String] The class name to add to the root element.

// By practice, we will still add new controls to the base
// `L.Control` namespace and not under this one, for good looks :).

// TODO: Maybe added this functionality to the base L.Control class that other
// built-in Leaflet classes inherit from like the Layers Controls.

// For now, could simply issue this for some convenience without needed to work
// break the inheritence hierarchy through extending:
// `L.Control.ZControl.prototype.initialize.call(this);`

L.Control.ZControl = L.Control.extend({
  _className: "L.Control.ZControl",

  options: {
    className: "zcontrol"
  },

  initialize: function(opts) {
    this._setDebugNames();
    this.options = this.options; // Fixes `hasOwnProperty` issue in `setOptions` to be `true` now....
    L.setOptions(this, opts); // Same as L.setOptions in the Leaflet doc.  I like using this namespace better.  Shows intent more clearly.
  },

  onAdd: function() {
    this.domNode = L.DomUtil.create(
      'span',
      this.options.className
    );

    return this.domNode;
  }
});
$.extend(L.Control.ZControl.prototype, DebugMixin.prototype);

L.control.zControl = function(opts) {
  return new L.Control.ZControl(opts);
};
