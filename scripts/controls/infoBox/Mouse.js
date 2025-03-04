// Mouse
// - opts: [Object]
//   - precision: [Number]
//
// Mostly just an abstract class,
// which is why the additional class name
// is added again manually.

L.Control.InfoBox.Mouse = L.Control.InfoBox.extend({
  options: {
    title: "Coordinates"
  },

  initialize: function(opts) {
    L.Control.InfoBox.prototype.initialize.call(this, opts);

    this._initSettings();
  },

  _initSettings: function() {
    this.options.precision = getSetOrDefaultValue(this.options.precision, 0);
  },

  onAdd: function(map) {
    this._map = map;

    var container = L.Control.InfoBox.prototype.onAdd.call(this);
    $(container).addClass("location");

    this._updateCoordsInfo();
    this._addMapHandler(map);

    return container;
  },

	// onRemove: function() {
	// 	mouseInfo.destroy();
	// };

  createRow: function(titleText, parent) {
    var row = L.DomUtil.create('div', 'row', parent);

    var titleCell = L.DomUtil.create('span', 'title', row);
    titleCell.append(titleText);

    var valueCell = L.DomUtil.create('span', 'value', row);

    return row;
  },

  _addMapHandler: function(map) {
    L.DomEvent.on(map, 'mousemove', function(event) {
      this._updateCoordsInfo(event.latlng);
    }.bind(this));
    L.DomEvent.on(map, 'click', function(event) {
      this._updateCoordsInfoClick(event.latlng);
    }.bind(this));
  },

  _updateCoordsInfo: function(event) {
    console.error(this._debugName + ": Superclass method `" + this.prototype._className + "._updateCoordsInfo` not overridden.");
  },
  
  _updateCoordsInfoClick: function(event) {
     //console.error(this._debugName + ": Superclass method `" + this.prototype._className + "._updateCoordsInfo` not overridden.");
  }
});

L.Control.InfoBox.Mouse.prototype._className = "L.Control.InfoBox.Mouse";

L.control.infoBox.mouse = function (opts) {
  return new L.Control.InfoBox.Mouse(opts);
};
