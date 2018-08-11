// - Config:
//   - history.plugins.search.query: [Boolean]
//   - history.plugins.search.results: [Boolean]
//   - history.plugins.search.fieldClear: [Boolean]

zMap.addEventHandler('uiLoaded', function() {
  (function() {
    if(new RegExp("^true$", "i").test(
      ZConfig.getConfig("history.plugins.search.query"))) {
        var generateFn = function(query, test) {
          historyService.triggerEventHandlers('historyAction', {
            type: 'searchQuery',
            icon: 'search',
            color: "lightblue",
            title: "Search Performed",
            content: "Query: " + query,
            test: test
          });
        };

        mapControl.headerBar.searchArea.markerSearchField
          .addEventHandler('searchExecuted', generateFn);

        if(new RegExp("^true$", "i").test(
          ZConfig.getConfig("history.testAllActions"))) {
          generateFn("test", true);
        }
    }
  })();

  (function() {
    if(new RegExp("^true$", "i").test(
      ZConfig.getConfig("history.plugins.search.results"))) {
        var generateFn = function(results, test) {
          historyService.triggerEventHandlers('historyAction', {
            type: 'searchResults',
            icon: 'search',
            color: "lightskyblue",
            title: "Search Finished",
            content: "Number of results found: " + results.length,
            test: test
          });
        };

      mapControl.headerBar.searchArea.searchMarkerHandler
        .addEventHandler('resultsReceived', generateFn);

      if(new RegExp("^true$", "i").test(
        ZConfig.getConfig("history.testAllActions"))) {
        generateFn(["test"], true);
      }
    }
  })();

  (function() {
    if(new RegExp("^true$", "i").test(
      ZConfig.getConfig("history.plugins.search.fieldClear"))) {
        var generateFn = function(query, test) {
          historyService.triggerEventHandlers('historyAction', {
            type: 'fieldCleared',
            icon: 'search',
            color: 'cornsilk',
            title: 'Search Field Cleared',
            content: "Cleared query: " + query,
            test: test
          });
        };

        mapControl.headerBar.searchArea.markerSearchField
          .addEventHandler('cleared', generateFn);

        if(new RegExp("^true$", "i").test(
          ZConfig.getConfig("history.testAllActions"))) {
          generateFn("test", true);
        }
    }
  })();

});
