// - Config:
//   - history.plugins.map.zoomstart: [Boolean]
//   - history.plugins.map.zoomend: [Boolean]
//   - history.plugins.map.movestart: [Boolean]
//   - history.plugins.map.moveend: [Boolean]

zMap.addEventHandler('uiLoaded', function() {
  var actionInfos = [
    {
      type: "zoom",
      icon: 'search',
      color: "darkmagenta",
      contentFn: function() { return 'Level: ' + map.getZoom(); }
    }, {
      type: "move",
      "color": "burlywood",
      contentFn: function() { return 'Center: ' + map.getCenter(); }
    }
  ];
  var actionStates = ['start', 'end'];

  actionInfos.forEach(function(actionInfo) {
    actionStates.forEach(function(actionState) {
      if(new RegExp("^true$", "i").test(
        ZConfig.getConfig("history.plugins.map." + actionInfo.type + actionState))) {
          var generateFn = function(event, test) {
            historyService.triggerEventHandlers('historyAction', {
              type: actionInfo.type,
              icon: actionInfo.icon,
              color: actionInfo.color,
              title: actionInfo.type[0].toUpperCase() + actionInfo.type.substring(1) + ' ' + actionState[0].toUpperCase() + actionState.substring(1),
              content: actionInfo.contentFn(),
              test: test
            });
          };

          L.DomEvent.on(map, actionInfo.type + actionState, generateFn);

          if(new RegExp("^true$", "i").test(
            ZConfig.getConfig("history.testAllActions"))) {
            generateFn(null, true);
          }
      }
    });
  });
});
