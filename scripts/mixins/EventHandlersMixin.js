// EventHandlersMixin - Add simple event handling functionality to classes.
// - Class Data Members:
//   - _className: Provides the name for the class to the custom debug tracing engine..  Must still be added manually.
// - Instance Data Members:
//   - eventNames: If not provided as a parameter to `_initHandlers`, then this instance property can be read for the events to support for the new object.  May be the preferred method.
// - Methods:
//   - _initHandlers() - Call during instance initialization to prepare
//   - addEventHandler(eventName, handleFunction) - To be used by consumers (usually external classes), to be notified of events and run a handler function with the provided data.
//   - triggerEventHandlers(eventName, data) - To be used by the producer  (usually the 'owning class'), to notify others of an event and provide the data.

function EventHandlersMixin() {};

EventHandlersMixin.prototype = {
  _initHandlers: function(eventNames) {
    eventNames = eventNames || this.eventNames;

    this._handlers = eventNames.reduce(function(handlers, eventName) {
      handlers[eventName] = [];
      return handlers;
    }, {});
  },

  addEventHandler: function(eventName, handleFunction) {
    this._handlers[eventName].push(handleFunction);
  },

  triggerEventHandlers: function(eventName, data) {
    this._handlers[eventName].forEach(function(handler) {
      handler(data);
    }, this);
  }
}
