/*
 * jQuery CodeMirror plugin 1.0
 *
 * Copyright (c) 2017 Michael Daum http://michaeldaumconsulting.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
(function($) {
  "use strict";

/*****************************************************************************
 * class definition
 */
$.CodeMirror = function(elem, opts) {
  var self = this,
      $elem = $(elem);

  $elem.data("codeMirror", self);
  self.elem = elem;
  self.opts = opts;
  self.id = foswiki.getUniqueID();
  self.editor = CodeMirror.fromTextArea(elem, opts); 
  self.wrapper = self.editor.getWrapperElement();

  // add autoresize
  if (opts.autoresize) {
    opts.resizable = false;
    $(self.wrapper).addClass("CodeMirror-autoresize");
    self.editor.setOption("viewportMargin", Infinity);
  }

  // add resizable
  if (opts.resizable) {
    $(self.wrapper).resizable({
      resize: function() {
        self.editor.setSize($(this).width(), $(this).height());
      }
    });
  }

  // autoload mode
  if (opts.mode) {
    CodeMirror.autoLoadMode(self.editor, opts.mode);
  }

};

/***************************************************************************
 * plugin defaults
 */
$.CodeMirror.prototype.defaults = {
  //value
  mode: 'foswiki',
  theme: 'foswiki',
  indentUnit: 3, 
  smartIndent: false,
  tabSize: 3,
  indentWithTabs: false, 
  //rtlMoveVisually
  electricChars: false,
  keyMap: "default",
  //extraKeys
  lineWrapping: true,
  lineNumbers: false, 
  firstLineNumber: 1,
  //lineNumberFormatter
  //gutters
  fixedGutter: true,
  readOnly: false,
  showCursorWhenSelecting: false,
  undoDepth: 40,
  //tabindex
  autofocus: false,
  autoresize: false
  
  // addon options
  //extraKeys: {"Enter": "newlineAndIndentContinueFoswikiList"}
  //matchBrackets: false, 
  //enterMode: "keep", 
  //tabMode: "shift" 
};

/*****************************************************************************
 * register to jquery 
 */
$.fn.codeMirror = function(opts) {

  var defaults = $.extend({}, $.CodeMirror.prototype.defaults, opts);

  return this.each(function() {
    var localOpts = $(this).data();
    new $.CodeMirror(this, $.extend({}, defaults, localOpts));
  });
};


/*****************************************************************************
 * initializer called on dom ready
 */
$(function() {
  var web = foswiki.getPreference("WEB"),
      topic = foswiki.getPreference("TOPIC"),
      systemWeb = foswiki.getPreference('SYSTEMWEB'),
      pubUrlPath = foswiki.getPreference("PUBURLPATH");

  // init loadmode addon
  CodeMirror.modeURL = pubUrlPath+'/'+systemWeb+'/CodeMirrorPlugin/mode/%N/%N.js';

  // listen to dom elems
  $("textarea.jqCodeMirror:not(.jqCodeMirrorInited)").livequery(function() {
    var $this = $(this);
    $this.addClass("jqCodeMirrorInited").codeMirror({
      web: web,
      topic: topic
    });
  });
});

})(jQuery);
