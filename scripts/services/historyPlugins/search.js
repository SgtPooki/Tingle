// - Config:
//   - history.plugins.searchQuery: [Boolean]
//   - history.plugins.searchResults: [Boolean]

if(new RegExp("^true$", "i").test(
  ZConfig.getConfig("history.plugins.searchQuery"))) {
  zMap.addEventHandler('uiLoaded', function() {
    mapControl.headerBar.searchArea.markerSearchField
      .addEventHandler('searchExecuted', function(query) {
        historyService.triggerEventHandlers('historyAction', {
          type: 'searchQuery',
          icon: 'search',
          color: "lightblue",
          title: "Search Performed",
          content: "Query: " + query
        });
      })
    ;
  });
}

if(new RegExp("^true$", "i").test(
  ZConfig.getConfig("history.plugins.searchResults"))) {
  zMap.addEventHandler('uiLoaded', function() {
    mapControl.headerBar.searchArea.searchMarkerHandler
      .addEventHandler('resultsReceived', function(results) {
        historyService.triggerEventHandlers('historyAction', {
          type: 'searchResults',
          icon: 'search',
          color: "lightskyblue",
          title: "Search Finished",
          content: "Number of results found: " + results.length
        });
      })
    ;
  });
}
