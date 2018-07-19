
// boolean
// Also used by debugPrint, so 'exported' for now.
var debugMode = new RegExp("^true$", "i")
  .test(ZConfig.getConfig("debug.enabled"));

(function() {

  // [<objectPath>, ...]
  var objectsToTrace = eval(ZConfig.getConfig("debug.objectsToTrace")) || [];

  // {"<objectPath>": ["methodName", ...]}
  var methodsToIgnore = JSON.parse(ZConfig.getConfig("debug.methodsToIgnore") || "{}");

  // {...}
  var debugOptions = $.extend({
    abbvFn: true,
    argNewLines: false,
    stringMax: 20,
    ignore: methodsToIgnore
  }, JSON.parse(ZConfig.getConfig("debug.options") || "{}"));

  // Configure above

  if(debugMode) {
    applyFunctionTraceToObjects(
      objectsToTrace,
      debugOptions
    );
  }
})();
