DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

#
# BUILD DOCS
#

build:
	@echo "${HR}\n"

# widget-plugin/js/jquery.transit.js -> 라이브러리로 별도 호출필요
# 부트스트랩 플러그인과 코너스톤 플러그인 머지
	@echo "Building Widget Plugin..."
	@cat libs/bootstrap/js/bootstrap.js src/plugins/plugin-cornerstone.js src/plugins/plugin-touch.js src/plugins/plugin-motioncapcha.js src/plugins/plugin-rangeinput.js src/plugins/plugin-sign.js src/plugins/plugin-spinner.js > dist/widget-plugins.js
	@uglifyjs -nc dist/widget-plugins.js > dist/widget-plugins.min.js
	@echo "Widget Plugin successfully built at ${DATE}."
	@echo "${HR}\n"

# 위젯 피처드 에디터 추가 필요
	@echo "Building Widget Featured..."
	@cat src/featured/chart/d3.v2.js src/featured/chart/featured-chart.js > dist/featured-chart.js
	@cat src/featured/datatable/jquery.dataTables.min.js src/featured/datatable/featured-datatable.js > dist/featured-datatable.js
	@cat src/featured/list-view/infinity.js src/featured/list-view/featured-listview.js > dist/featured-listview.js
	@cat src/featured/media/mediaelement-and-player.js src/featured/media/featured-media.js > dist/featured-media.js
	@cat src/featured/scroll-view/iscroll.js src/featured/scroll-view/featured-scrollview.js > dist/featured-scrollview.js
	@uglifyjs -nc dist/featured-chart.js > dist/featured-chart.min.js
	@uglifyjs -nc dist/featured-datatable.js > dist/featured-datatable.min.js
	@uglifyjs -nc dist/featured-listview.js > dist/featured-listview.min.js
	@uglifyjs -nc dist/featured-media.js > dist/featured-media.min.js
	@uglifyjs -nc dist/featured-scrollview.js > dist/featured-scrollview.min.js
	@echo "Widget Featured successfully built at ${DATE}."
	@echo "${HR}\n"

# 플러그인 및 피처드 통합 위젯
	@echo "Building Widget JS..."
	@cat dist/widget-plugins.js dist/featured-chart.js dist/featured-datatable.js dist/featured-listview.js dist/featured-media.js dist/featured-scrollview.js > dist/widget.js
	@uglifyjs -nc dist/widget.js > dist/widget.min.js
	@echo "Widget JS successfully built at ${DATE}."
	@echo "${HR}\n"

	@echo "Building CornerStone Less..."
	@echo "CornerStone Less successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Building Widget Document..."
	@cat doc/widget-header.md doc/form.md doc/component.md doc/plugin.md doc/featured-header.md doc/featured-scrollview.md doc/featured-listview.md doc/featured-media.md doc/featured-editor.md doc/featured-datatable.md doc/featured-chart.md > README.md
	@echo "Widget Document successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Thanks for using Widget"