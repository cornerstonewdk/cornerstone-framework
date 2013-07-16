# Cornerstone CLI
> 코너스톤 프레임워크의 Command Line Interface.

## 설치 방법

`cornerstone-cli`는 `npm`의 패키지로 관리되고 있으므로 Node.js가 설치되어 있어야 한다. [여기](http://www.nodejs.org/download/)에서 Node.js를 다운로드 받을 수 있다.

다음과 같이 `npm`을 이용해서 `cornerstone-cli` 패키지를 글로벌하게 설치한다.

```shell
npm install -g cornerstone-cli
```

설치가 완료되면 자동으로 `jamjs`와 `grunt-cli`도 같이 설치된다.

## 사용 방법

`cs`를 아무 command 없이 사용하면 도움말을 볼 수 있다.

```shell
cs
```

다음과 같이 command와 option을 지정한다.

```shell
cs [command] [option]
```

사용할 수 있는 command는 다음과 같다.

| Command | 기능                                                                                     |
| ------- | --------------------------------------------------------------------------------------- |
| init    | 현재 디렉토리에 프로젝트의 기본 골격을 생성한다. 빈 디렉토리에서 실행해야 한다.                            |
| build   | 프로젝트의 소스 코드로부터 배포본을 생성한다. Gruntfile.js를 수정해서 최적화 옵션과 빌드 방법을 설정할 수 있다. |
| server  | 개발 중 Preview를 할 수 있는 간이 웹서버의 기능을 수행한다.                                         |
| test    | 테스트 코드를 실행한다. 테스트 코드는 mocha-phantomjs를 사용해서 작성할 수 있다.                       |

`init` command를 사용할 경우 다음과 같은 option을 추가할 수 있다.

| Option               | 기능                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------- |
| --noamd              | Require.js를 사용하지 않는다. 이 옵션이 없으면 Require.js와 Backbone을 사용하는 것으로 기본 골격을 생성한다. |
| --theme:[dark/white] | Dark/White 테마 중 하나를 선택한다. 이 옵션이 없으면 Bootstrap의 기본 테마를 사용한다.                   |
| --fullpackage        | 코너스톤의 모든 패키지를 설치한다. 이 옵션이 없으면 기본적으로 필요한 최소한의 패키지만 설치한다.                 |
