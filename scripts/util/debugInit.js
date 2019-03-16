// - Config:
//   - debug.enabled: [String]
//   - debug.objectsToTrace: [Array]
//     - <objectToTrace>: [String]
//   - debug.methodsToIgnore: [Object]
//     - <objectToTrace>: [Array]
//       - <methodToIgnore...>: [String]
//   - debug.options: [Object]
//     - abbvFn: [Boolean]
//     - argNewLines: [Boolean]
//     - stringMax: [Number]

// boolean
// Also used by debugPrint, so 'exported' for now.
var debugMode = ZConfig.getBooleanConfig("debug.enabled");

(function() {

  // [<objectPath>, ...]
  var objectsToTrace = eval(ZConfig.getConfig("debug.objectsToTrace")) || [];

  // {"<objectPath>": ["methodName", ...]}
  var targetPropertyNames = ZConfig.getConfig("debug.targetPropertyNames");
  if (targetPropertyNames) targetPropertyNames = JSON.parse(targetPropertyNames);

  // {"<objectPath>": ["methodName", ...]}
  var methodsToIgnore = JSON.parse(ZConfig.getConfig("debug.methodsToIgnore") || "{}");

  // {...}
  var debugOptions = $.extend({
    abbvFn: true,
    argNewLines: false,
    stringMax: 20,
    targetPropertyNames: targetPropertyNames,
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
