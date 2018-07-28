// InfoBox
// - options: [Object]
//   - title: [String] The text to optionally place in the header.

L.Control.InfoBox = L.Control.ZControl.extend({
  _className: "L.Control.InfoBox",

  onAdd: function() {
    L.Control.ZControl.prototype.onAdd.call(this);
    $(this.domNode).addClass("infobox");

    if(this.options.title) {
      var header = L.DomUtil.create('div', 'row header', this.domNode);
      header.append(this.options.title);
    }

    L.DomUtil.create('div', 'infobox-separator', this.domNode);

    this.contentNode = L.DomUtil.create('div', 'content', this.domNode);

    return this.domNode;
  },

	// onRemove: function() {
	// 	locationInfo.destroy();
	// };
});

L.control.infoBox = function(opts) {
  return new L.Control.InfoBox(opts);
};
