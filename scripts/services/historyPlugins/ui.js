// - UI - For non-map-related UI events.
// - Config:
//   - history.plugins.ui.login: [Boolean]
//   - history.plugins.ui.logout: [Boolean]
//   - history.plugins.ui.register: [Boolean]
//   - history.plugins.ui.lostPassword: [Boolean]
//   - history.plugins.ui.changePassword: [Boolean]
//   - history.plugins.ui.areaChanges: [Boolean]

zMap.addEventHandler('uiLoaded', function() {
  var supportedUISubmissionEvents = {
    "login": {
      color: "chartreuse",
      title: "Login Submission"
    },
    "logout": {
      color: "goldenrod",
      title: "Logout Submission"
    },
    "register": {
      color: "darksalmon",
      title: "User Registration"
    },
    "lostPassword": {
      color: "slateblue",
      title: "Lost Password Request"
    },
    "changePassword": {
      color: "orange",
      title: "Change Password Request"
    }
  };

  for(supportedUISubmissionEventName in supportedUISubmissionEvents) {
    var supportedUISubmissionEvent = supportedUISubmissionEvents[supportedUISubmissionEventName];
    if(new RegExp("^true$", "i").test(
      ZConfig.getConfig("history.plugins.ui." + supportedUISubmissionEventName))) {
        var generateFn = function(data, test) {
          historyService.triggerEventHandlers('historyAction', {
            type: supportedUISubmissionEventName,
            icon: 'fa-user',
            color: supportedUISubmissionEvent.color,
            title: supportedUISubmissionEvent.title,
            content: ((data.result) ? "Successful" : "Failed"),
            test: test
          });
        };

        zMap.addEventHandler(supportedUISubmissionEventName, generateFn);

        if(new RegExp("^true$", "i").test(
          ZConfig.getConfig("history.testAllActions"))) {
          generateFn({ result: true }, true);
          generateFn({ result: false }, true);
        }
    }
  };

  (function() {
    if(new RegExp("^true$", "i").test(
      ZConfig.getConfig("history.plugins.ui.formChanges"))) {
        var generateFn = function(content, type, test) {
          historyService.triggerEventHandlers('historyAction', {
            type: 'form',
            icon: 'navicon',
            color: 'dodgerblue',
            title: 'Form Changed',
            content: type,
            test: test
          });
        };

        mapControl.addHandler('afterSetContent', generateFn);

        if(new RegExp("^true$", "i").test(
          ZConfig.getConfig("history.testAllActions"))) {
          generateFn(null, "test", true);
        }
    }
  })();
});
