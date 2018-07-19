ZConfig = {
  options: {},
  getConfig: function(propertyName) {
    return getSetOrDefaultValues([
        window[propertyName],
        getUrlParam(propertyName),
        localStorage[propertyName],
        getCookie(propertyName)
      ],
      this.options[propertyName]
    );
  },
  setConfig: function(propertyName, value) {
    this.options[propertyName] = value;
  }
};

// Main config set-up with defaults

// "exact", "focus" (Jason's de-`fault`)
ZConfig.setConfig("categorySelectionMethod", "focus");
