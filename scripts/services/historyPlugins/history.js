zMap.addEventHandler('uiLoaded', function() {
  (function() {
    if(ZConfig.getBooleanConfig("history.plugins.history.clear")) {
        var generateFn = function(amount, test) {
          historyService.triggerEventHandlers('historyAction', {
            type: 'history',
            icon: 'fa-cross',
            color: "cornsilk",
            title: "History Cleared",
            content: "Of " + amount + " entries.",
            test: test
          });
        };

        historyBox._listView.addEventHandler('cleared', generateFn);

        if(ZConfig.getBooleanConfig("history.testAllActions")) {
          generateFn(0, true);
        }
    }
  })();
});
