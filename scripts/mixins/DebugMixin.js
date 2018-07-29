// DebugMixin - Add passive setup for added resolution in custom debug tracing.
// - Methods:
//   - _setDebugNames() - Call imediately upon instance creation to add the instance name to the output for more statements as early as possible.

function DebugMixin() {};

DebugMixin.prototype = {
  _setDebugNames: function() {
    // this.name = this.__proto__._className + "[" + L.Util.stamp(this) + "]"; // Original line
    this.name = (this.__proto__._className || this.constructor.name) + "[" + L.Util.stamp(this) + "]"; // Is this right/better b/w the class and instance?
    this._debugName = this.name;
  }
};
