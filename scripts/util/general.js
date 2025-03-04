function getSetOrDefaultValue(value, defaultValue) {
  if(value === undefined) {
    return defaultValue;
  } else {
    return value;
  }
};

function getSetOrDefaultValues(arrayOfValues, defaultValue, addlCondition) {
  return arrayOfValues.find(function(value) {
    return getSetOrDefaultValue(value)
      && ((addlCondition) ? addlCondition(value) : true)
  }) || defaultValue;
};

// https://stackoverflow.com/a/31689499/1091943
// Params:
// - [Array [Object]] arrayOfObjects
// - [String] or [Function] groupPropertyName
// - [Function] groupNameFormatter
// - [Function] objectFormatter
// - [Function] groupFormatter
function groupObjects(opts) {
  var groupsObject = opts.arrayOfObjects.reduce(function (groupsObj, object) {
    var groupName = (
      (typeof opts.groupPropertyName == "function")
      ? opts.groupPropertyName(object)
      : object[opts.groupPropertyName]);

    groupsObj[groupName] = groupsObj[groupName] || [];
    groupsObj[groupName].push((
      (opts.objectFormatter)
      ? opts.objectFormatter(object)
      : object
    ));
    return groupsObj;
  }, {});

  if(opts.groupFormatter) {
    for(var groupName in groupsObject) {
      groupsObject[groupName] = opts.groupFormatter(groupsObject[groupName]);
    }
  }

  return groupsObject;
};

// https://github.com/krisk/Fuse/issues/6#issuecomment-191937490
// Does not account for overlapping highlighted regions, if that exists at all O_o..
function generateHighlightedText(text, regions) {
  if(!regions) return text;

  var content = '', nextUnhighlightedRegionStartingIndex = 0;

  regions.forEach(function(region) {
    content += '' +
      text.substring(nextUnhighlightedRegionStartingIndex, region[0]) +
      '<span class="highlight">' +
        text.substring(region[0], region[1] + 1) +
      '</span>' +
    '';
    nextUnhighlightedRegionStartingIndex = region[1] + 1;
  });

  content += text.substring(nextUnhighlightedRegionStartingIndex);

  return content;
};
