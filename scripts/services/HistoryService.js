// HistoryService - Connects the various points from the page to monitor for events and notify the HistoryBox.
// instead: Provides a central hub for the stream of history events
// - Events:
//   - historyAction: ([Object]) Currently handles data objects that are mainly processed by the HistoryBox control.
//     - type: [String]
//     - icon: [String]
//     - color: [String]
//     - title: [String]
//     - content: [String]
// TODO: We may want to push UI-centric History display attributes into the view with the CSS files and such, and not have them be with the history action data.  I guess we still have the same type of data accompanying categories right now too..

function HistoryService(opts) {
  this._initialize();
  this._initHandlers();
};

HistoryService.prototype = {
  _initialize: function() {
    this.eventNames = ['historyAction'];
  }
};
$.extend(HistoryService.prototype, EventHandlersMixin.prototype);
