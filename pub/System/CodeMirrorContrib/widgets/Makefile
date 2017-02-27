FOSWIKI_ROOT?=~/foswiki/trunk/core
TARGET=widgets.js

WIDGETS_SOURCE=utils.js image-widget.js

-include $(FOSWIKI_ROOT)/pub/System/JQueryPlugin/Makefile.include

widgets.uncompressed.js: $(WIDGETS_SOURCE)
	cat $^ > $@

