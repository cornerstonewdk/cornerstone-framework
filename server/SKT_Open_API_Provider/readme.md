SKT Oauth2.0 open API 사용법
===============

---

`OAuth2.0 기반의 Provider node.`


구성요소
-----------------------
Node.js
- express
- jade
- connect
- request
- serializer


서버 준비하기
---------
http://www.nodejs.org/ 으로 가서 피씨 사양에 맞는 Node.js 를 받아서 설치 한다.
설치 완료 후 Open API를 받은 곳으로 console 창으로 이동한다. app.js와 package.json 파일이 보이는지 확인!
다음 명령어를 console창에 입력 후 enter 입력한다. 'cd . && npm install'  (' 이것은 빼고 입력하자)
그러면 express와 jade, socket.io 를 노드가 열심히 받는다.
다 받으면 다음과 같은 명령어를 입력하여 node 서버를 돌려보다, 'node app.js' (js는 생략가능)

modules > skt-data-center > index.js
-------------------
가상 데이터들 consumer, user info 등을 하드코딩해놓은 파일

modules > soap > index.js (*주의사항 : 이 모듈은 SKT WSDL에 맞추었기 때문에 최신버전으로 덮어씌우면 안됨 그리고 여기서 npm install 을 이용하여 직접 빌드가 필요하다.)
-----------------------------
modules > soap > lib > http.js 안에 CBH 에서 받은 ID/PW를 넣어준다. (안에보면 있어요 찾기 쉬워요)
routes > index sms 관련에 wsdl 주소를 넣어준다.

node-expat 에러발생시
-----------------------------
modules > soap 내부에서 아래 명령어 실행
`
    npm install --save node-expat
`