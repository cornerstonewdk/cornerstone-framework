테트리스 사용법
===============

---

`이 문서는 테트리스를 실행하기 위한 준비 및 시작 페이지를 정의 하고 있는 문서이다.`


구성요소
-----------------------
Node.js
- express
- jade
- socket.io
require.js
jquery.js
backbone.js
underscore.js
prototype.js
text.js


서버 준비하기
---------
http://www.nodejs.org/ 으로 가서 피씨 사양에 맞는 Node.js 를 받아서 설치 한다.
설치 완료 후 테트리스를 받은 곳으로 console 참으로 이동한다. app.js와 package.json 파일이 보이는지 확인!
다음 명령어를 console창에 입력 후 enter 입력한다. 'cd . && npm install'  (' 이것은 빼고 입력하자)
그러면 express와 jade, socket.io 를 노드가 열심히 받는다.
다 받으면 다음과 같은 명령어를 입력하여 node 서버를 돌려보다, 'node app.js' (js는 생략가능)

디렉토리 구조
-----------
파일을 분류하는 기준에는 여러 가지가 있을 수 있으며, 애플리케이션에 가장 맞는 방법을 선택하는 것이 좋다.
일반적인 경우에는 다음과 같은 구조를 권장한다.

```
-+-- node_modules
 +-- public -+-- audio
 |           +-- images
 |           +-- javascripts --+-- libs
 |           |                 +-- Navi
 |           |                 +-- templates
 |           |                 +-- tetris
 |           |                 +-- views
 |           +-- stylesheets
 +-- routes
 +-- views
```

각 디렉토리는 다음과 같은 용도로 사용한다.

- / : node.js 코드가 들어있는 app.js 가 있다.
- node_modules : 테트리스에서 필요로 하는 노드 모듈.
- public : 테트리스 클라이언트에 해당하는 자바스크립트 이미지 스타일시트 파일등이 들어있다.
- routes : express 에서 라우트 하는 파일
- views : jade view

테트리스 게임하기
-------------------
http://localhost:8080/ 으로 접속하면 된다. 단 canvas를 이용하여 구현하였으므로 html5지원하는 브라우저는 필수!.

테트리스 남들이 하는거 구경하기
-----------------------------
http://localhost:8080/watchRoom/ 으로 접속하면 된다. 단 여기도 canvas를 이용하여 구현하였으므로 html5를 지원하는 브라우저는 필수!

