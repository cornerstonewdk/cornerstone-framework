<!--
layout: 'post'
section: 'Cornerstone Framework'
title: 'Cornerstone Plugin 개발'
outline: 'Cornerstone Plugin 개발에 대한 필요성을 설명 한다.'
date: '2012-11-16'
tagstr: 'runtime'
order: '[6, 7]'
thumbnail: '6.6.00.plugin_developement.png'
-->

-----------------------------------------

# Cornerstone Plugin 개발 

------------------------------------------

## Cornerstone Plugin 개발 개요 

-	일반적인 웹앱은 Device Platform (Android, iOS..)에서 제공하는 Native SDK API를 사용할 수 없다. 따라서 웹앱에서 Device 기능을 사용하고자 한다면 브라우져 및 Runtime에서 제공하는 Java Script Extension API를 사용하여야 한다. 이를 가능하게 하는것이 Cornerstone Runtime 이며 , 이 Cornerstone Runtime 내부에서 HTML5 Spec을 준수하는 API (contact , calendar, file .. etc) 와 추가적인 Additional API (audio, childBrowser..etc) 를 제공한다. 


-	통신사 별 과금 처리와 같은 추가적인 API 를 하이브리드앱에서도 사용하고자 한다면 선 개발된 Cornerstone Runtime에 Plugin 형태로 추가 개발 할 수 있다.  마찬가지로 Cornerstone Runtime에서 제공하지 않는 단말 접근 기능을 개발하고자 한다면 이 역시 Plugin 형태로 확장 개발 할 수 있다.

