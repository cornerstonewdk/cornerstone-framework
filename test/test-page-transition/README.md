화면 전환
-------

###	화면전환 구조
화면전화는 Launcher(실행기)와 Effect(효과)로 구성되어 있다.

Launcher의 기능

-	화면전환 효과를 내기 전 사용자가 정의한 값과 기본값을 병합
-	화면전환을 위한 CSS 준비 및 뒤로 가기인 경우 이전 페이지 효과로 설정
-	화면전환 가능 브라우저인지, 가능한 효과의 종류 인지 판단 등을 처리하고 실제 화면전환 효과를 실행시키는 기능
-	화면전환 시 사용된 CSS를 초기화 후 사용자가 정의한 완료 함수를 실행한다.

Effect의 기능

-	각 효과에 맞는 CSS를 설정하고 화면전환 효과를 표현한다.

### 화면전환 호환 브라우저

-	Internet Explorer 9+(일부), 파이어폭스(Firefox), 크롬(Chrome), 사파리(Safari)

### 종류
1)	종류 목록

- Flip(플립) 효과 : 화면 중심 y축을 기준으로 카드를 뒤집는 것처럼 나가는 페이지가 뒤돌아서면서 들어오는 페이지가 나타나는 효과 (3D)
- Spin(화전) 효과 : 나가는 페이지가 회전화면서 사라지고, 들어오는 페이지가 회전하면서 나타나는 효과 (3D)
- Slide(슬라이드) 효과 : 나가는 페이지가 좌측 밖으로 나가는 동시에 우측 밖에서 들어오는 페이지가 현재화면으로 들어오는 효과
- Slideup(슬라이드 시작 방향 위) 효과 : 나가는 페이지가 아래로 내려가는 동시에 위에서 들어오는 페이지가 현재화면으로 들어오는 효과
- Slidedown(슬라이드 시작 방향 아래) 효과 : Slideup의 반대효과
- Fade(페이드) 효과 : 나가는 페이지가 사라지면서, 들어오는 페이지가 나타나는 효과
- Pop(팝) 효과 : 나가는 페이지가 화면 중심으로 사라지고, 들어오는 페이지가 중심에서나타나는 효과
- Turn(턴) 효과 : 왼쪽 y축을 기준으로 화면을 책 넘기기처럼 표현하는 효과 (3D)

2)	종류별 작동 영상 [http://youtu.be/ncYSE-JRfJc](http://youtu.be/ncYSE-JRfJc)
 
### 화면전환 사용방법

1)	기본 HTML/CSS

HTML
화면전환시 나가고, 들어가는 페이지를 표현해야하므로 최소한 2개 이상의 영역이 필요하다. 아래 HTML은 front와 back 페이지로 
구분해서 화면전환를 구현했으며, 개발시 front와 back은 같은 레벨에서 N개 존재가 가능하다.

	<div id="front" class="current">
		<!-- 플립효과로 다음 페이지 이동  -->
        <button class="full-width btn " data-transition="flip">Flip</button>
	</div>
	<div id="back">
	    (중략...)
	</div>

동일 레벨에서 N개 존재 가능

	<div id="front" class="current">
		<!-- 플립효과로 다음 페이지 이동  -->
        <button class="full-width btn " data-transition="flip">Flip</button>
	</div>
	<div id="back">
	    (중략...)
	</div>
	<div id="front2">
	    (중략...)
	</div>
	<div id="back2">
	    (중략...)
	</div>
	(중략...)


CSS

기본적으로 화면전환시 현재페이지를 제외한 페이지는 노출이 되지 않게 해야하므로 .current 등의 클래스로 현재 페이지인 경우만
노출되도록 한다.

	#front, #back {
	    display: none;
	}
	#front.current, #back.current {
	    display: block;
	}

 ※ **위의 코드에서 사용된 ID와 Class값의 네이밍은 사용자가 원하는대로 변경해서 사용이 가능하다.**


2)	의존성 주입 

-	일반 방식 [RUN](http://jsfiddle.net/azamara/tcEAG/7/)

		<!-- jQuery -->
		<script type="text/javascript" src="jquery/jquery-1.7.2.min.js"></script>
		<!-- jQuery Transit -->
		<script type="text/javascript" src="jquery.transit.js"></script>
		<!-- 화면전환 Javascript -->
		<script type="text/javascript" src="transition.js"></script>

-	MVC Framework을 이용한 의존성 주입 [RUN](http://jsfiddle.net/azamara/tcEAG/7/)

		define(['backbone',
    			'jquery',
				'transition'],
    			function (Backbone, Transition) {
				(중략...)
		});

3)	화면전환 파라미터 정의
윈도우 테이블 UI 확인이 어려움으로 추후 테이블로 변경 예정 


transitionType - 화면전환 효과 기본 None(효과 없음) - None - X

fallbackType - IE에서 임시로 사용할 효과 - Fade - X

inTarget 들어오는 페이지 파라미터

- id - 들어오는 페이지 아이디값 - undefined - O
- from - 시작점 좌표 또는 각도 값 - 효과별 기본값 - X 
- to - 시작점 좌표 또는 각도 값 - 효과별 기본값 - X 
- duration - 들어오는 페이지의 애니메이션 시간 - 효과별 기본값 - X 
- timing : 지정한 시간동안이 트랜지션 속도 (타이밍 함수값) - ease - X

outTarget 나가는 페이지 파라미터

- id - 나가는 페이지 아이디값 - undefined - O
- from - 시작점 좌표 또는 각도 값 - 효과별 기본값 - X 
- to - 시작점 좌표 또는 각도 값 - 효과별 기본값 - X 
- duration - 나가는 페이지의 애니메이션 시간 - 효과별 기본값 - X 
- timing : 지정한 시간동안이 트랜지션 속도 (타이밍 함수값) - ease - X
- done - 나가는 페이지 트랜지션 완료시 실행 시킬 함수 - function(){} - X

isReverse - 뒤로 가기 페이지인지 여부 식별 - false - O

done - 화면전환 완료시 실행 시킬 함수 - function(){} - X

4)	사용 문법

기본적인 문법은 사용자가 아래와 같은 설정들을 제어할 수 있다.

- transitionType : 화면전환 종류 (기본값: None)
- inTarget : 나가는 페이지
	- id : 아이디값  **(필수)**
- outTarget : 들어오는 페이지 
	- id : 아이디값  **(필수)**
- isReverse : 뒤로가기 여부 (기본값: false)
- done : 완료 시 실행할 함수


<기본 문법>
	
    Transition.launcher({
        transitionType:"flip", // 화면전환 종류 참고
        inTarget:{
            id:inTargetID // 들어오는 페이지의 ID 값
        },
        outTarget:{
            id:outTargetID // 나가는 페이지의 ID 값
        },
        isReverse: false, // 뒤로가기 여부
        done:function () {
            $("#front").addClass("current");
            $("#back").removeClass("current");
        }
    });


고급 문법은 사용자가 기본문법의 설정보다 더 상세한 설정들을 제어할 수 있다.

- transitionType : 화면전환 종류 (기본값: None)
- fallbackType : 미지원 브라우저에서 사용할 효과 (기본값: Fade)
- inTarget : 나가는 페이지
	- id : 아이디값  **(필수)**
	- from : 시작점 좌표 또는 각도 값
	- to : 도착점 좌표 또는 각도 값
	- duration : 들어오는 페이지의 트랜지션 지속 시간
	- timing : 지정한 시간동안이 트랜지션 속도 (타이밍 함수값) 
- outTarget : 들어오는 페이지 
	- id : 아이디값  **(필수)**
- isReverse : 뒤로가기 여부 (기본값: false)
- done : 완료 시 실행할 함수

<고급 문법>

    Transition.launcher({
        transitionType:"none", // 화면전환 효과 기본 None(효과 없음)
        fallbackType:"fade", // 미지원 브라우저에서 사용할 효과(Fade, None 가능)
        inTarget:{
            id:undefined, // 들어오는 페이지의 ID 값
            from:undefined, // 들어오는 페이지의 시작점
            to:undefined, // 들어오는 페이지의 도착점
            duration:undefined, // 들어오는 페이지의 애니메이션 시간
            timing:"ease", // linear ease ease-in ease-out ease-in-out
            done:function () {

            }
        },
        outTarget:{
            id:undefined, // 나가는 페이지의 ID 값
            from:undefined, // 나가는 페이지의 시작점
            to:undefined, // 나가는 페이지의 도착점
            duration:undefined, // 나가는 페이지의 애니메이션 시간
            timing:"ease",
            done:function () {

            }
        },
        isReverse:false, // 뒤로가기 여부
        done:function () {

        }
    });


<예제1> [RUN](http://jsfiddle.net/azamara/WMKCy/)

HTML 코드	
	
    <!DOCTYPE html>
    <html>
    <head>
        <title>CornerStone :: Page Transiton 화면전환</title>

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

        <link rel="stylesheet" href="libs/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" href="libs/bootstrap/css/bootstrap-responsive.css">
        <link rel="stylesheet" href="css/fonts/stylesheet.css">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
    <div class="container-fluid">
        <div class="row-fluid">
            <div id="front" class="current span12">
                (중략...)
                <div class="row-fluid">
                    <div class="span6">
                        <button class="full-width btn " data-transition="flip">Flip</button>
                    </div>
                    <div class="span6">
                        <button class="full-width btn " data-transition="spin">Spin</button>
                    </div>
                </div>
                (중략...)
            </div>
            <div id="back" class="span12">
                (중략...)
            </div>
        </div>
    </div>
    <script type="text/javascript" src="libs/jquery/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="libs/jquery/plugins/jquery.transit.js"></script>
    <script type="text/javascript" src="../transition.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    </body>
    </html>

자바스크립트 코드

    $("#front .btn").live("click", function (e) {
        var transitionType = $(this).attr("data-transition"),
            inTargetID = "#back",
            outTargetID = "#front";
        Transition.launcher({
            transitionType:transitionType, // 화면전환 효과 기본 None(효과 없음)
            inTarget:{
                id:inTargetID // 들어오는 페이지의 ID 값
            },
            outTarget:{
                id:outTargetID // 나가는 페이지의 ID 값
            },
            isReverse:false, // 뒤로가기 여부
            done:function () {
                $("#front").removeClass("current");
                $("#back").addClass("current");
            }
        });
    });


5)	사용자 정의 화면전환 효과 확장 방법

사용자 정의 화면전환 효과 추가 코드

	// 효과 객체에 사용자정의 효과를 추가 하기위해 화면전환 프로토타입 효과 객체를 가져온다.
	var effect = Transition.effect.prototype;

	// 가져온 객체에 사용자가 정의한 효과 이름(custom1) 작성
    effect.custom1= function (opt) {
		// 사용자 정의 효과 코드 작성
    };


실행코드 코드

    var transitionType = "custom1", // 위에 사용자가 정의한 custom1를 트랜지션 효과로 지정
        inTargetID = "#back",
        outTargetID = "#front";

    Transition.launcher({
        transitionType:transitionType, 
        inTarget:{
            id:inTargetID // 들어오는 페이지의 ID 값
        },
        outTarget:{
            id:outTargetID // 나가는 페이지의 ID 값
        },
        isReverse:false, // 뒤로가기 여부
        done:function () {
            
        }
    });
