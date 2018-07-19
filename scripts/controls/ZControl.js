// ZControl - The default base Leaflet control the Zelda Maps
//  project should use for useful functions applicable to
//  all derived controls.

// By practice, we will still add new controls to the
// `L.Control` namespace, for good looks :).

L.Control.ZControl = L.Control.extend({
  _className: "L.Control.ZControl",

  _setDebugNames: function() {
    this.name = this.__proto__._className + "[" + L.Util.stamp(this) + "]";
    this._debugName = this.name;
  },

  initialize: function(opts) {
    this._setDebugNames();
    L.setOptions(this, opts);
  }
});

L.control.zControl = function(opts) {
  return new L.Control.ZControl(opts);
};
