# 설치하기

## 라이브러리 설치
```
sudo npm install -g karma
npm install
```

## 커버리지 실행
karma.conf.js에서 37번 라인 설정에 coverage 추가
```
reporters: ["progress"],
->
reporters: ["progress", "coverage"],
```

## 실행하기
```
grunt
```

## 확인
`coverage` 디렉토리내에서 각 브라우저별 커버리지를 확인 할 수 있는 html 파일을 연다.