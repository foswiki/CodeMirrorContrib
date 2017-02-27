"use strict";

(function($) {

function ImageWidget(cm, from, to) {
  var self = this;

  console.log("creating an ImageWidget at from=",from,"to=",to);

  self.cm = cm;
  self.from = from;
  self.to = to;

  self.init();
};

ImageWidget.prototype.init = function() {
  var self = this, 
      text;

  function makeInteractive() {
    self.elem.resizable({
      aspectRatio: true,
      handles: "se",
      autoHide: true,
      stop: function(ev, ui) {
        self.attrs.width = ui.size.width;
        self.attrs.height = ui.size.height;
        self.setText(self.stringify());
        self.mark.changed();
      }
    });
  }

  if (/^<img\s*(.*)\s*\/?>$/.test(self.getText())) {
    text = RegExp.$1;
  }

  self.attrs = utils.getAttrs(text);

  if (typeof(self.elem) === 'undefined') {
    self.elem = $("<img>").appendTo("body");
    self.elem.attr(self.attrs).addClass("cm-natedit-image");
    self.elem.data("ImageWidget", self);
  } else {
    self.elem.resizable("destroy").removeClass("ui-resizable");
  }

  self.mark = self.cm.markText(self.from, self.to, {
    replacedWith: self.elem[0],
    clearWhenEmpty: false,
    handleMouseEvents: true
  });

  self.elem.parent().imagesLoaded().done(function() {
    makeInteractive();
  });

/*
  self.mark.on("beforeCursorEnter", function() {
    console.log("beforeCursorEnter");
  });

  self.mark.on("hide", function() {
    var find = self.mark.find();
    console.log("hide, find=",find);
  });

  self.mark.on("unhide", function() {
    var find = self.mark.find();
    console.log("unhide, find=",find);
  });
*/
};

ImageWidget.prototype.stringify = function() {
  var self = this, result = "<img";

  $.each(self.attrs, function(key, val) {
    result += " "+key+"='"+val+"'";
  });

  result += " />";

  return result;
};

ImageWidget.prototype.getText = function() {
  var self = this;
  return self.cm.getRange(self.from, self.to);
};

ImageWidget.prototype.setText = function(text) {
  var self = this,
      len = text.length;

  self.cm.replaceRange(text, self.from, self.to);
  self.to.ch = self.from.ch + len;
  self.init();
};

window.ImageWidget = ImageWidget;

})(jQuery);
