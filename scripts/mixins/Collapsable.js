var Collapsable = L.Class.extend({
  initializeCollapsable: function() {
    this._setupCollapsableHotkeyHandler();
    this._updateCollapsedState(); // Might not be a good spot to call it.  Maybe just do it manually in consuming classes, like I have the handler system set-up currently.
  },
  _setupCollapsableHotkeyHandler: function() {
    $(document).on('keydown', function(e) {
      if(e.key == "Escape") {
        this.toggle();
      }
    }.bind(this));
  },
  toggle: function() {
    this.options.collapsed = !this.options.collapsed;
    this._updateCollapsedState();
  },
  _updateCollapsedState: function() {
    if(this.options.collapsed) {
      this.collapse();
    } else {
      this.expand();
    }
  },
  expand: function() {
    $(this.domNode).show();
    $(this.alternativeDomNode).hide();
  },
  collapse: function() {
    $(this.domNode).hide();
    $(this.alternativeDomNode).show();
  }
});

Collapsable.addInitHook(Collapsable.prototype.initializeCollapsable);
