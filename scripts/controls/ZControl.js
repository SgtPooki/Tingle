// ZControl - The default base Leaflet control the Zelda Maps
//  project should use for useful functions applicable to
//  all derived controls.
// - options: [Object]
//   - className: [String] The class name to add to the root element.

// By practice, we will still add new controls to the
// `L.Control` namespace, for good looks :).

L.Control.ZControl = L.Control.extend({
  _className: "L.Control.ZControl",

  options: {
    className: "zcontrol"
  },

  _setDebugNames: function() {
    this.name = this.__proto__._className + "[" + L.Util.stamp(this) + "]";
    this._debugName = this.name;
  },

  initialize: function(opts) {
    this._setDebugNames();
    L.setOptions(this, opts);
  },

  onAdd: function() {
    this.domNode = L.DomUtil.create(
      'span',
      this.options.className
    );
  }
});

L.control.zControl = function(opts) {
  return new L.Control.ZControl(opts);
};
