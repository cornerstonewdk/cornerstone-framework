DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

#
# BUILD DOCS
#

build:
	@echo "${HR}\n"
	@echo "Building Widget Form Less... For DEMO"
	@recess --compile widget-form/less/cornerstone.less > widget-form/cornerstone-form.css
	@recess --compress widget-form/less/cornerstone.less > widget-form/cornerstone-form.min.css
	@echo "Widget Less successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Building Widget Form Less... For DEMO"
	@recess --compile widget-plugin/less/plugin.less > widget-plugin/conerstone-plugin.css
	@recess --compress widget-plugin/less/plugin.less > widget-plugin/conerstone-plugin.min.css
	@echo "Widget Less successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Building Widget Plugin..."
	@cat libs/bootstrap/js/bootstrap.js widget-plugin/js/jquery.transit.js widget-plugin/js/plugin-cornerstone.js widget-plugin/js/plugin-touch.js widget-plugin/js/plugin-motioncapcha.js widget-plugin/js/plugin-rangeinput.js widget-plugin/js/plugin-sign.js widget-plugin/js/plugin-spinner.js widget-plugin/js/plugin-switch.js > widget-plugin/plugins.js
	@uglifyjs -nc widget-plugin/plugins.js > widget-plugin/plugins.min.js
	@echo "Widget Plugin successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Building Widget Featured..."
	@echo "Widget Featured successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Building Widget JS..."
# Featured 추후 추가 예정 widget-plugin/plugins.js widget-featured/featured.js > widget.js
	@cat widget-plugin/plugins.js > widget.js
	@uglifyjs -nc widget.js > widget.min.js
	@echo "Widget JS successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Building CornerStone Less..."
	@echo "CornerStone Less successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Building Widget Document..."
	@cat widget-header.md widget-form/form.md widget-component/component.md widget-plugin/plugin.md widget-featured/featured.md > README.md
	@echo "Widget Document successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Thanks for using Widget"