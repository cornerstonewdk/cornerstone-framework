# 코너스톤 테마, BTS 호환성 테스트 페이지

## 사전 설치해야할 CLI Tool
1. jekyll (http://jekyllrb.com/docs/installation/)

`
gem install jekyll
`

2. grunt (http://gruntjs.com/getting-started)

`
npm install -g grunt-cli
`

## 빌드 방법
1. `build/`에서 코너스톤 프레임워크를 `grunt build`를 통해 배포버전으로 빌드
2. `src/style/bootstrap3/` 서브모듈을 업데이트 `git submodule update --init --recursive`
3. bootstrap 디렉토리 내에서 `jekyll build` 실행 후 `_gh_page` 생성을 확인
4. `test/test-bootstrap-compatibility/`에서 npm install 실행
5. grunt
	- 테스트 페이지 clean
	- bootstrap의 gh_page의 docs 문서를 `test/test-bootstrap-compatibility/`로 copy
	- html 내부의 경로 등을 코너스톤 프레임워크의 `grunt-dist/` 경로로 text replace


## 빌드시 테마, 스킨 변경
1.  종류
	- 테마 다크 : theme-dark
	- 테마 화이트 : theme-dark 
	- 테마 와이어프레임 : theme-dark
	- 스킨 세루리안 : skin-cerulean
	- 스킨 플랫리 : skin-flatly
	- 스킨 유나이티드 : skin-united
	
e.g. 
- 다크 테마로 빌드

`
grunt theme:theme-dark
`

- 유나이티드 스킨으로 빌드

`
grunt theme:skin-united
`