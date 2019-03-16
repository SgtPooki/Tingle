zMap.addEventHandler('uiLoaded', function() {
  (function() {
    var config = ZConfig.getConfig("history.plugins.categories.select");
    switch(true) {
      case new RegExp('^individual|single|one$', 'i').test(config):
        var generateFn = function(category, checked, test) {
          historyService.triggerEventHandlers('historyAction', {
            type: 'category',
            icon: 'bars',
            color: "azure",
            title: "Category " + category.name,
            content: ((checked) ? "Unc" : "C") + "hecked",
            test: test
          });
        };

        mapControl._categoryMenu.addEventHandler('categoryChanged', generateFn);

        if(ZConfig.getBooleanConfig("history.testAllActions")) {
          generateFn({name: 'test, ... ... ...'}, true);
        }
      break;
      case new RegExp('^multiple|several|many$', 'i').test(config):
        var generateFn = function(categories, checked, test) {
          historyService.triggerEventHandlers('historyAction', {
            type: 'categories',
            icon: 'bars',
            color: "azure",
            title: "Categories " + ((checked) ? "Unc" : "C") + "hecked",
            content: Object.values(categories).map((category) => category.name).join(', '),
            test: test
          });
        };

        mapControl._categoryMenu.addEventHandler('categoriesChanged', generateFn);

        if(ZConfig.getBooleanConfig("history.testAllActions")) {
          generateFn([{name: 'test, ... ... ...'}], true);
        }
      break;
    }
  })();
});
