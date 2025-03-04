var callLevel = 0;

function debugPrint() {
  if(isDebugMode) {
    console.debug(arguments);
  }
};

function applyFunctionTraceToObjects(objectsToTrace, options) {
  objectsToTrace.forEach(function(objectToTrace) {
    inject(objectToTrace, logFnCall, options);
  });
};

// TODO: Would we want to debug instance methods along with the class' prototype's methods as well?
// If so, refactor into a function doing 2 passes, 1 for each set.
// https://stackoverflow.com/a/38581438/1091943
function inject(object, extraFn, options = {}) {
  let objectPrototype = object.prototype;
  let objectName = (
    objectPrototype._className ||
    object._className ||
    object._debugName ||
    object.displayName ||
    object.name
  );

  for (let propName of Object.getOwnPropertyNames(objectPrototype)) {
    let prop = objectPrototype[propName];
    if(typeof prop === "function" && (
      !options.ignore ||
      !options.ignore[objectName] ||
      !options.ignore[objectName].includes(propName)
    )) {
      objectPrototype[propName] = (function(fnName) {
        return function() {
          extraFn.call(
            this,
            true,
            objectName,
            fnName,
            options,
            arguments
          );

          let returnValue = prop.apply(this, arguments);

          extraFn.call(
            this,
            false,
            objectName,
            fnName,
            options,
            arguments
          );

          return returnValue;
        };
      })(propName);
    }
  }
};

function logFnCall(before, className, fnName, options = {}, args) {
  if(options.abbvFn === undefined) options.abbvFn = true;
  if(options.argNewLines === undefined) options.argNewLines = false;
  if(options.colors === undefined) options.colors = true;
  if(options.stringMax === undefined) options.stringMax = 20;

  let colors = {
    obj: "yellow",
    class: "orange",
    fn: "skyblue",
    punct: "dark-grey",
    term: "white"
  };

  if(callLevel == 0 && before) {
    quickColorLog('%c--- %cStart of Monitored Execution %c---', colors.punct, colors.fn, colors.punct);
  }

  var colorList = [];

  let positionText = ( (before)
    ? "%cEntering %c>>>"
    : "%cLeaving  %c<<<"
  );
  colorList = colorList.concat([
    ((before) ? "green" : "brown"),
    colors.punct
  ]);

  let objectName = (
    this._debugName ||
    this.displayName ||
    this.name
  );

  if(before) callLevel++;

  let headerString = '' +
    '(' + callLevel + ') ' +
    positionText + ' ' +
    '%c' + objectName + ': ' +
    '%c' + className + '.' +
    '%c' + fnName + '%c('
  ;
  colorList = colorList.concat([
    colors.obj,
    colors.class,
    colors.fn,
    colors.punct
  ]);

  if(!before) callLevel--;

  let argsString = Array.prototype.map.call(args, function(arg) {
    let result;

    colorList.push(colors.term); // For the leading color

    if(typeof arg === "function" && options.abbvFn) {
      result = Object.prototype.toString.call(arg);
    } else {
      result = String(arg);
      if(result.length > options.stringMax) {
        result = result.substr(0, options.stringMax - 3) + "..."; // Took away punct color string.  Ellipsis could go either way to match the term or the punct.
        // colorList.push(colors.punct);
      }
    }

    colorList.push(colors.punct); // For the joined comma below.

    return '%c' + result;
  }).join('%c, ');

  if(argsString) {
    colorList.pop();

    if(options.argNewLines) {
      argsString = '\n\t' + argsString + '\n';
    }
  }

  let footerString = '%c)';
  colorList.push(colors.punct);

  let finalString = '' +
    headerString +
    argsString +
    footerString
  ;

  if(!options.colors) finalString.replace("%c", ' ');

  quickColorLog.apply(console, [finalString].concat(colorList));

  if(callLevel == 0 && !before) {
    quickColorLog('%c---  %cEnd  of Monitored Execution %c---', colors.punct, colors.fn, colors.punct);
  }
};

function quickColorLog() {
  console.log.apply(
    console,
    [arguments[0]].concat(
      Array.prototype.slice.call(arguments, 1).map(function(color) {
        return "color: " + color + ";";
      })
    )
  );
};
