// InfoBox
// - options: [Object]
//   - title: [String] The text to optionally place in the header.

L.Control.InfoBox = L.Control.ZControl.extend({
  _className: "L.Control.InfoBox",

  onAdd: function() {
    var parent = L.DomUtil.create(
      'span',
      "infobox " + (this.options.className || "")
    );
    if(this.options.title) {
      var header = L.DomUtil.create('div', 'row header', parent);
      header.append(this.options.title);
    }

    L.DomUtil.create('div', 'infobox-separator', parent);

    this.getContent(parent);

    return parent;
  },

  getContent: function(parent) {}

	// onRemove: function() {
	// 	locationInfo.destroy();
	// };
});

L.control.infoBox = function(opts) {
  return new L.Control.InfoBox(opts);
};
