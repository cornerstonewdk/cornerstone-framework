DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

#
# BUILD DOCS
#

build:
	@echo "\n${HR}"
	@echo "Building Bootstrap..."
	@cat js/libs/bootstrap-transition.js js/libs/bootstrap-affix.js js/libs/bootstrap-alert.js js/libs/bootstrap-button.js js/libs/bootstrap-carousel.js js/libs/bootstrap-collapse.js js/libs/bootstrap-dropdown.js js/libs/bootstrap-modal.js js/libs/bootstrap-tooltip.js js/libs/bootstrap-popover.js js/libs/bootstrap-scrollspy.js js/libs/bootstrap-tab.js js/libs/bootstrap-typeahead.js > js/bootstrap.js
	@uglifyjs -nc js/bootstrap.js > js/bootstrap.min.js
	@echo "Bootstrap successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Building Widget..."
	@cat js/bootstrap.js js/libs/jquery.transit.js js/widget-bootstrap.js js/widget-motioncapcha.js js/widget-rangeinput.js js/widget-sign.js js/widget-spinner.js js/widget-switch.js js/widget-touch.js > widget.js
	@uglifyjs -nc widget.js > widget.min.js
	@echo "Widget successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Thanks for using Widget"