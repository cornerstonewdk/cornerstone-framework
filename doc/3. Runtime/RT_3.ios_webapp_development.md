<!--
layout: 'post'
section: 'Cornerstone Framework'
title: 'iOS Runtime 하이브리드앱 개발'
outline: 'iOS Runtime을 통하여 하이브리드앱을 개발하는 환경 및 절차를 설명한다.'
date: '2012-11-16'
tagstr: 'runtime'
order: '[6, 3]'
thumbnail: '6.3.00.iOS.png'
-->

-------------------

# iOS Runtime 하이브리드앱 개발 

-------------------

### iOS Runtime 하이브리드앱 개발 환경

 - 다음 링크에서 iOS 용 코너스톤 런타임을 다운로드 받을 수 있다.
 - [iOS 용 코너스톤 런타임 (iOS용 하이브리드앱 개발환경) 다운로드](http://cornerstone.sktelecom.com/download/cornerstone-runtime-iOS-0.9.0.zip) 
 - iOS용 하이브리드앱 개발환경은 Xcode 버전 4.6.2, Mac OSX 버전 10.7.4 Lion 기준으로 개발되었으며 iOS 버전은 6.1 이다.

### iOS Runtime 하이브리드앱 개발 환경 구조  

![](./images/srt_project.png)

1) SRT.framework - Cornerstone Runtime Library

2) www - 실제 하이브리드앱의 웹 리소스 (HTML/CSS/JS/IMG) 와 Cornerstone Runtime Java Script Library 가 저장되는 위치 

-	**www** : 하이브리드앱의 저장 위치 
-	**www/index.html** : 하이브리드앱의 첫 실행 파일
-	**www/SRT-0.9.1.js** : Cornerstone Runtime Java Script Library

3) SRT_Template/Resources - 하이브리드앱에 필요한 리소스를 저장하는 위치

-	**icons** : Icon을 위한 이미지 폴더
-	**splash** : Splash Screen을 위한 이미지 폴더


4) SRT_Template/Supporting Files - 하이브리드앱 및 런타임 설정 파일이 위치하는 폴더

-	**SRT_Template-Info.plist** : iOS 하이브리드앱을 위한 설정 파일
-	**SRT.plist** : Cornerstone Runtime을 위한 설정 파일

<br>

### iOS 하이브리드앱 개발 방법


**step 1.**  Cornerstone 개발 환경을 이용하여 iOS 하이브리드앱 Template를 다운로드 후 Xcode로 프로젝트(파일명 : SRT_Template.xcodeproj)를 실행한다. 

![](./images/openproject.jpg)

**step 2.**  하이브리드앱 개발자는 www 폴더 내부에 .html , .js , .css 와 같은 웹앱을 작성하여야 하며 시작 파일은 반드시 index.html 이어야 한다. **SRT-0.9.1.js는 template 기본 파일**이다. 

![](./images/index.jpg)

-	특정 웹페이지 내부에서 Runtime에서 제공하는 DeviceAPI를 사용하고 할 때에는 아래와 같이 Java Script Library를 선언한다.
 
	`<script type="text/javascript" charset="utf-8" src="./path/SRT-0.9.1.js"></script>`

**step 3.**  Resources/icons 폴더 내부에 하이브리드앱 개발자가 사용하고자 하는 아이콘 이미지를 프로젝트에 추가한다. 기본으로 설정된 icon 파일 이름은 **icon**이며 기본 설정일 경우 Device 에 따라 적용되는 icon 파일 이름은 아래와 같다. icon 파일 이름 설정 방법은 **step 5.** 에서 다룬다.

- **icon.png** : iPhone 3GS 이전 모델 용 아이콘 이미지
- **icon@2x.png** : iPhone 4/4s 용 아이콘 이미지
- **icon-72.png** : iPad / iPad2 용 아이콘 이미지
- **icon-72@2x.png** : new iPad 용 아이콘 이미지

![](./images/srt_resources.jpg)

**step 4.** Resources/splash 폴더 내부에 하이브리드앱 개발자가 사용하고자 하는 Splash Image 를 추가한다. 기본으로 설정된 Splash 파일 이름은 **Splash**이며 기본 설정일 경우 Device 에 따라 적용되는 Splash 파일 이름은 아래와 같다. Splash 파일 이름 설정 방법은 **step 6.** 에서 다룬다 

참고로 Splash Image 란 하이브리드앱 실행시 하이브리드앱이 로딩될때까지 보여지는 이미지 화면을 뜻한다.

- **Splash.png** : iPhone 3GS 이전 모델용 Splash Image
- **Splash @2x.png** : iPhone 4/4s 용 Splash Image
- **Splash-Landscape.png** : iPad / ipad2 용 가로 Splash Image
- **Splash-Portrait.png** : iPad / iPad2 용 세로 Splash Image
- **Splash-Landscape@2x.png** : new iPad 용 가로 Splash Image
- **Splash-Portrait@2x.png** : new iPad 용 세로 Splash Image

**step 5.** Supporting Files/SRT_Template-Info.plist 파일을 수정하여 하이브리드앱의 여러 속성 설정이 가능하다. 이는 Cornerstone Runtime 프로젝트 뿐만이 아니라 iOS 앱의 공통 적용사항이다. 아래는 주요 설정 값들이다.

![](./images/SRTTemplate_info.jpg)

- **Bundle display name** : 어플리케이션 이름
- **Icon files / Icon files(iOS5)** : 아이콘 이미지 파일 이름
- **Bundle identifier** : 어플리케이션 고유 ID. 실제 Device 연동을 위해서는 애플사에 개발자 인증(provisioning profile)을 받아야하며 그때 설정한 ID를 넣는다.
- **Supported interface orientations / Supported interface orientations(iPad)** : 해당 어플리케이션이 지원하는 화면 회전 허용값. 예를 들어 Portrait(bottom home button)만이 설정되어 있다면 iPad 에서 회전을 하여도 실제로 화면이 회전되지 않는다.



**step 6.** Supporting Files/SRT.plist 파일을 수정하여 Cornerstone Runtime의 여러 속성 설정이 가능하다. 

![](./images/SRT.jpg)

- **UIWebViewBounce** : 화면 드래그를 끝까지 했을 경우 웹뷰가 바운스 효과를 내는지 여부를 설정함.
- **EnableLocation** : 해당 하이브리드앱이 Geolocation 을 설정할수 있는지 여부를 설정
- **EnableViewportscale** : 뷰포트 확대/축소 허용 여부를 설정
- **AutoHideSplashScreem** : Yes일 경우 DeviceReady 가 되면 자동으로 Splash Image가 해제된다. No일 경우 API를 통해서 원하는 시점에 해제가 가능하다
- **SplashImage** : Splash Image를 위한 이미지 파일명 설정. 기본은 "Splash"로 설정되어 있다.
- **Plugins** : Cornerstone Runtime Java Script Library 와 Native Class간의 연동을 위한 Map이다.
Key의 경우 Java Script Library 를 위한 모듈명이며 Value의 경우 NativeClass 모듈명이다.
3rd 파티 개발자가 추가 Plugin 을 개발할 경우에 사용한다.
- **InstalledApplications** : AppLauncher 모듈의 getInstalledApplications API 사용시 검색 가능한 어플리케이션 리스트. 개발자가 어플리케이션 리스트를 설정하면 getInstalledApplications API를 통해 어플리케이션 리스트중 실제 Device 에 설치된 어플리케이션의 리스트를 가져올 수 있다. 어플리케이션 리스트는 불려지는 어플리케이션에 설정된 URL Schemes에 설정된 값으로 리스트를 설정한다. 기본 설정은 기본 탑재 어플인 music, sms, mailto, videos 4가지가 설정되어 있다. 



**step 7.** Xcode의 Run Icon을 눌러 실제 단말에서 하이브리드앱이 정상적으로 실행되는지 확인한다. 

![](./images/run.png)

