// ListBox - Includes the ListView into an InfoBox for quick entry-baed presentations.

L.Control.InfoBox.ListBox = L.Control.InfoBox.extend({
  _className: "L.Control.InfoBox.ListBox",

  options: {
    title: "List",
    className: "list",
  },

  initialize: function(opts) {
    L.Control.InfoBox.prototype.initialize.call(this);
    this._listView = new ListView(this.options);
  },

  onAdd: function() {
    L.Control.InfoBox.prototype.onAdd.call(this);

    $(this.contentNode).append(this._listView.domNode);

    return this.domNode;
  }

  // onRemove: function() {
  // 	locationInfo.destroy();
  // };
});

L.control.infoBox.listBox = function(opts) {
  return new L.Control.InfoBox.ListBox(opts);
};
