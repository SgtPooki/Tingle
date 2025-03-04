// CopyLink
// - opts: [Object]
//   - content: [String or Function] - The content to copy when clicked.

function CopyLink(opts) {
  this._initSettings(opts);
  this._initDOMElements();
};

CopyLink.prototype = Object.create(Link.prototype);
CopyLink.prototype.constructor = CopyLink;

CopyLink.prototype._initSettings = function(opts) {
  opts.title = opts.title || "Copy Text";

  Link.prototype._initSettings.call(this, opts);

  this.classNames = 'copy icon-copy';
};

CopyLink.prototype._initDOMElements = function() {
  Link.prototype._initDOMElements.call(this);

  this.textCopyArea = L.DomUtil.create('div', 'copy text-area', document.body);
};

CopyLink.prototype.action = function() {
  $(this.textCopyArea).text(this._getContent());

  var success = this.copy();

  if(success)
    zlogger.success("Text copied!");
  else
    zlogger.error("Text not copied.");
};

// Source: https://stackoverflow.com/a/31596687/1091943
CopyLink.prototype.copy = function() {
  var range = document.createRange();
  range.selectNodeContents(this.textCopyArea);

  selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  return document.execCommand("copy", false, null);
};
