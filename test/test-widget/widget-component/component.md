컴포넌트
--------
위젯 컴포넌트는 위젯의 폼, 플러그인, 피처드 등 화면을 꾸밀때 재사용될 수 있는 요소들이며 기능이 없으며 플러그인과 함께 사용하여 기능을 적용 가능함. 기본적으로 컴포넌트의 스타일을 적용하려면 엘리멘트에서 스타일 클래스를 선언해서 사용해야 한다.


## 드롭다운 

### 마크업

드롭다운 플러그인과 함께 사용되는 스타일로 Button dropdowns,Navbar등 각종 dropdown을 활용하는 위젯이 이것을 불러들여와 사용된다. 기본적으로 드롭다운 마크업은 화면상에 노출되지 않는다. 드롭다운 메뉴자체가 상위 메뉴를 통해 노출되는 형태이므로 상위 메뉴에서 트리거가 발생하면 노출이 된다.(플러그인 필요) 또한 드롭다운을 포함하는 상위 엘리먼트는 `position:relative` css 프로퍼티 선언을 해야한다.

```
    <div class="dropdown">
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
            <li><a tabindex="-1" href="#">메뉴1</a></li>
            <li><a tabindex="-1" href="#">메뉴2</a></li>
            <li><a tabindex="-1" href="#">메뉴3</a></li>
            <li class="divider"></li>
            <li><a tabindex="-1" href="#">구분된 링크</a></li>
        </ul>
    </div>
```

<iframe style="width: 100%; height: 300px; border: none;overflow:hidden;" src="http://codepen.io/azamara/embed/yrbzo"></iframe>

### 옵션

드롭다운 컴포넌트는 우측 정렬 및 서브 드롭다운 등을 추가할 수 있는 옵션을 가지고 있다.

__메뉴 정렬__

`.dropdown-menu` 클래스에 `.pull-right` 클래스를 추가하면 드롭다운 메뉴는 우측으로 정렬된다.

```
    <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
        ...
    </ul>
```

__드롭다운에 서브메뉴 추가하기__

서브메뉴를 추가할 `li` 태그에 `.dropdown-submenu`를 추가하고 그 안에 서브 메뉴로 사용할 드롭다운를 추가한다.

```
    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
        ...
        <li class="dropdown-submenu">
            <a tabindex="-1" href="#">More options</a>
            <ul class="dropdown-menu">
            ...
            </ul>
        </li>
    </ul>
```

### 사용 예시  [데모페이지](http://codepen.io/azamara/pen/yrbzo)

마크업에서 설명한 것처럼 드롭다운은 기본적으로 노출이 되지 않는다. 그래서 자바스크립트 플러그인을 통해 드롭다운을 노출시킬 수 있으며 메뉴 토글기능도 가능하다.

```
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
        <li><a tabindex="-1" href="#">메뉴1</a></li>
        <li><a tabindex="-1" href="#">메뉴2</a></li>
        <li><a tabindex="-1" href="#">메뉴3</a></li>
        <li class="divider"></li>
        <li><a tabindex="-1" href="#">구분된 링크</a></li>
    </ul>
```

## 버튼 그룹

### 사용 예시  [데모페이지](http://codepen.io/azamara/pen/tDlCp)

`adding description!`

__단일 버튼 그룹__

여러 `.btn` 클래스를 `.btn-group` 클래스로 랩핑한다.

```
    <div class="btn-group">
    <button class="btn">1</button>
    <button class="btn">2</button>
    <button class="btn">3</button>
    </div>
```

__여러 버튼 그룹__

복잡한 요소를 위해 여러 `.btn-group` 클래스를 결합하여 `.btn-toolbar` 클래스로 랩핑한다.

```
    <div class="btn-toolbar">
        <div class="btn-group">
            <button class="btn">1</button>
            <button class="btn">2</button>
            <button class="btn">3</button>
            <button class="btn">4</button>
        </div>
        <div class="btn-group">
            <button class="btn">5</button>
            <button class="btn">6</button>
            <button class="btn">7</button>
        </div>
        <div class="btn-group">
            <button class="btn">8</button>
            <button class="btn">10</button>
        </div>
    </div>
```

__수직버튼 그룹__

기본적으로 수평형태로 보여지는 버튼들을 수직(스택)형태로 보여지도록 하기 위해 `.btn-group` 클래스에  `.btn-group-vertical` 클래스를 추가해야 한다.

```
    <div class="btn-group btn-group-vertical">
        <button type="button" class="btn"><i class="icon-align-left"></i></button>
        <button type="button" class="btn"><i class="icon-align-right"></i></button>
        <button type="button" class="btn"><i class="icon-align-center"></i></button>
        <button type="button" class="btn"><i class="icon-align-justify"></i></button>
    </div>
```


## 버튼 드롭다운

### 사용예시

__기본 버튼 드롭다운__

버튼 드롭다운은 드롭다운을 보여 주기 위한 toggle형태의 버튼과 드롭다운이 필요하다. 이 2가지 요소를 `.btn-group` 클래스로 감싼다.

```
    <div class="btn-group">
        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
            Action
            <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
            <!-- dropdown menu links -->
        </ul>
    </div>
```

__버튼 드롭다운의 toggle 버튼의 크기__

버튼 드롭다운에 toggle 버튼은 `.btn-large`, `.btn-small`, `.btn-mini`  3가지 크기의 클래스로 표현 할 수 있다.

__분리된 버튼 드롭다운__

분리된 버튼 드롭다운은 버튼 텍스트와 역삼각형(caret)에 구분선을 보여준다. 기본 버튼 드롭다운에서는 `a` 태그 내부에 텍스트와 역삼각형(caret)를 같이 포함하지만 분리된 버튼 드롭다운에서는 텍스트와 역삼각형(caret) 부분을 분리하며 `button` 태그를 사용한다.

```
    <div class="btn-group">
        <button class="btn">Action</button>
        <button class="btn dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
            <!-- dropdown menu links -->
        </ul>
    </div>
```

__드롭업 메뉴__

드롭업은 드롭다운에서 트리거 역할을 하는 toggle 버튼 

```
    <div class="btn-group dropup">
        <button class="btn">Dropup</button>
        <button class="btn dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
            <!-- dropdown menu links -->
        </ul>
    </div>
```



## 네비게이션 

BtS은 경우에따라 div, ul엘레멘트를 사용하나 본 프레임워크에서 내용을 감쌀 필요가 있다면 nav 엘레멘트를 감싸서 사용하는것을 기본으로 하도록 함

구현 : BtS에 있는것을 스타일 확장
기능 : 플러그인 연계가능
Bts > plugins > tabs로 기능확장 가능. Tabbable nav는 피쳐드중 list view, scroll view등 내용을 보여주는 형식의 위젯과 유연하게 함께 사용이 가능해야 함.
느낌과 모양새 : 방향성에 맞추어 모바일에 알맞게 적용. Tabbable nav는 폰에서는 참고사항의 jQM의 navbar와 같이 각 li 엘레멘트의 너비가 동일하게 표현되도록 작성.

참고사항

jQM > toolbars > navbar참고


## 네비게이션 바

div 엘레멘트로 된 네비게이션 요소

구현 : BtS에 있는것을 스타일 확장
기능 : 플러그인 연계가능
반응형 웹형식으로 사용하려면 BtS > Plugins > collapse,BtS responsive css file과 함께 사용
드롭다운 기능을 사용하기 위해서는 BtS > Plugins > dropdowns플러그인을 사용하여 기능 확장 가능
느낌과 모양새 : 방향성에 맞추어 모바일에 알맞게 적용. 특별히 폰에서는 앱으로써 사용하기는 불편한 UI임으로 폰을 위해 별도의 변형된 UI를 디자인 할 필요 없음

## 순서(Breadcrumbs)

Breadcrumbs는 `ul` 엘리멘트로 된 네비게이션 요소이다. 타블랫에서는 Navbar나, Header,footer의 네비게이션 역할을 대신하는 경우가 많은 UI요소이다.

### 사용예시 

```
    <ul class="breadcrumb">
        <li><a href="#">Home</a> <span class="divider">/</span></li>
        <li><a href="#">Library</a> <span class="divider">/</span></li>
        <li class="active">Data</li>
    </ul>
```

## 페이지네이션(Pagination)

`ul` 엘리먼트로된 네비게이션 요소. 기본적으로 폰에서는 이것 대신 리스트뷰를 사용하는것이 적합하나 네이버나 클리앙같은 게시판 류에서는 실제로는 상당히 자주 사용되고 있는 듯 하며 엔터프라이즈 환경에서도 상당히 자주 사용된다.

### 기본 페이지네이션

기본 페이지네이션에서는 큰 클릭 영역과 간단히 확장/축소가 가능하다. 기본적으로 `ul`, `li` 태그로 이뤄져 있고 `.pagination` 클래스로 감싸야 한다.

```
    <div class="pagination">
        <ul>
            <li><a href="#">이전</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">다음</a></li>
        </ul>
    </div>
```

### 옵션

__비활성 / 활성 상태__

비활성 페이지 번호인 경우 해당 `li` 태그에 `.disabled` 클래스를 추가하고 활성 페이지 번호인 경우 해당 `li` 태그에 `.active` 클래스를 추가하면 된다.

```
    <div class="pagination">
        <ul>
            <li class="disabled"><a href="#">이전</a></li>
            <li class="active"><a href="#">1</a></li>
            ...
        </ul>
    </div>
```

또한 비활성, 활성인 경우 `a` 태그의 클릭 함수를 제거하기 위해 `span` 태그로 변경할 수 있다.

```
    <div class="pagination">
        <ul>
            <li class="disabled"><span>이전</span></li>
            <li class="active"><span>1</span></li>
            ...
        </ul>
    </div>
```

__정렬__

페이지네이션의 정렬은 3가지 종류가 있다. 좌측 정렬(기본), 중앙 정렬, 우측 정렬로 이뤄어 졌으며 좌측 정렬은 기본으로 적용되므로 별도의 클래스가 요구되지 않는다. 하지만
중앙 정렬과 우측 정렬은 각각 정렬을 위해 클래스가 필요하다. 중앙 정렬의 경우  `.pagination` 클래스에 `.pagination-centered` 를 추가해야 하며 우측 정렬의 경우 `.pagination` 클래스에 `.pagination-right` 클래스를 추가해야 한다.

```
	<!-- 좌측 정렬 -->
    <div class="pagination pagination-centered">
    ...
    </div>
    
	<!-- 중앙 정렬 -->
    <div class="pagination pagination-centered">
    ...
    </div>

	<!-- 우측 정렬 -->    
    <div class="pagination pagination-right">
    ...
    </div>
```

### 페이저

페이저는 매거진이나 블로그와 같은 사이트에서 많이 사용되는 형태로 페이지네이션과는 달리 이전 / 다음 버튼으로 이뤄져 있다.

__기본 페이저__

기본적으로 페이저는 중앙 정렬 상태이다.

```
    <ul class="pager">
        <li><a href="#">이전</a></li>
        <li><a href="#">다음</a></li>
    </ul>
```

__링크 정렬하기__

기본 페이저에서는 이전 / 다음 버튼이 같이 중앙에 정렬된 방면에 링크 정렬은 이전 / 다음의 `li` 태그에 클래스를 추가하므로  이전 버튼은 좌측으로, 다음 버튼은 우측으로 정렬 시킨다.

```
    <ul class="pager">
        <li class="previous">
            <a href="#">&larr; 이전</a>
        </li>
        <li class="next">
            <a href="#">다음 &rarr;</a>
        </li>
    </ul>
```

__비활성 상태__

페이저 링크 또한 페이저네이션처럼 비활성 클래스인 `.disabled` 클래스를 비활성하려는 버튼의 `li` 태그에  추가해서 사용 할 수 있다.

```
    <ul class="pager">
        <li class="previous disabled">
            <a href="#">&larr; Older</a>
        </li>
        ...
    </ul>
```


## 이름표와 뱃지

### 이름표

```
	코드삽입
```

### 뱃지

```
	코드삽입
```

## 타이포그라피

### 히어로 유닛

히어로 유닛은 사이트에서 중요한 컨텐츠를 보여주기 위해 사용되는 가볍고 유연한 요소이다. 일반적으로 컨텐츠의 제목과 태그 그리고 해당 컨텐츠를 상세하게 볼 수 있는 링크 정도로 구성되며 `.hero-unit` 클래스로 감싸야 한다.

```
    <div class="hero-unit">
        <h1>Heading</h1>
        <p>Tagline</p>
        <p>
            <a class="btn btn-primary btn-large">
            Learn more
            </a>
        </p>
    </div>
```

### 페이지 머리글

페이지 머리글은 `h1`태그를 사용해서 제목글을 작성하며 제목글 내부에   `small` 등의 태그로 다른 스타일을 적용 할 수 있고 `.page-header` 클래스로 감싸야 한다.

```
    <div class="page-header">
        <h1>Example page header <small>Subtext for header</small></h1>
    </div>
```


## 썸네일

썸네일은 기본적으로 최소한의 마크업만으로 링크된 이미지를 보여주도록 디자인 됐다.

### 고급 사용자 정의 썸네일

고급 사용자 정의 썸네일은 이미지 뿐만 아니라 썸네일에 보다 복잡한 컨텐츠를 넣을 수 있다. 예를들면 링크된 이미지, 컨텐츠 타이틀, 컨텐츠 설명, 버튼 등과 같은 다양한 요소들로 꾸밀 수 있다.

__간단하고 유연한 마크업 / 그리드 컬럼 크기 사용__

썸네일은 `ul` 태그와 여러 `li` 태그로 이뤄져 있다. 그리드 시스템의  `.span2`, `.span3` 과 같은 크기를 썸네일에서도 사용 할 수 있다.

### 마크업

썸네일을 꾸미기 위해 요구되는 마크업은 복잡하지 않고 가볍다. 

```
    <ul class="thumbnails">
        <li class="span4">
            <a href="#" class="thumbnail">
            	<img src="http://placehold.it/300x200" alt="">
            </a>
        </li>
        ...
    </ul>
```

또한 위 마크업과 다르게 `a` 태그 대신 `div` 태그를 사용하므로 이미지뿐만 아니라 다양한 요소를 넣을 수 있다.
```
    <ul class="thumbnails">
        <li class="span4">
            <div class="thumbnail">
                <img src="http://placehold.it/300x200" alt="">
                <h3>썸네일 타이틀</h3>
                <p>썸네일 간단한 설명</p>
            </div>
        </li>
    ...
    </ul>
```

## 경고창

성공, 주의, 에러 메세지를 위한 스타일

### 기본 경고창

기본 경고창은 `.alert` 클래스로 경고를 보여줄 내용을 감싸준다. `.alert` 클래스 내부의  `닫기 버튼`은 옵션이므로 닫기 기능이 필요한 경우에 넣는다.

```
    <div class="alert">
    	<!-- 기본 닫기 버튼  -->
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>Warning!</strong> Best check yo self, you're not looking too good.
    </div>
```

__닫기 버튼__

닫기 버튼은 플러그인을 통해 작동이 가능하다. 작동방식은 html5 data-attribute를 사용하는 방법과 javascript를 이용하는 방법이 있다. javascript를 이용하는 방법은 플러그인에서 설명하므로 여기에서는 사용되는 예시와 설명은 data-attribute 방식이다. 닫기 버튼은 `a` 태그와 `button` 태그로 만들 수 있으며 `a` 태그인 경우 `href="#"` 속성이 필수적으로 들어가야 한다. `button` 태그의 경우 `form` 태그 안에서 사용되는 경우라면 `type="button"`  속성이 들어가야 한다.

```
    <a href="#" class="close" data-dismiss="alert">×</a>
    <button type="button" class="close" data-dismiss="alert">×</button>
```

### 옵션

__경고 메세지가 긴 경우__

경고 메세지가 긴 경우 `.alert` 클래스에 `.alert-block` 클래스를 추가해서 위, 아래 여백이 증가되므로 좀더 가독성이 높은 UI를 구성할 수 있다.

```
    <div class="alert alert-block">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <h4>Warning!</h4>
        Best check yo self, you're not...
    </div>
```

__에러 메세지__

여러가지 에러에 대한 메세지를 표현 할때 `.alert-error` 클래스를 추가한다.

```
    <div class="alert alert-error">
    ...
    </div>
```

__성공 메세지__

성공에 대한 메세지를 표현 할때 `.alert-success` 클래스를 추가한다.

```
    <div class="alert alert-success">
    ...
    </div>
```

__안내 메세지__

안내에 대한 메세지를 표현 할때 `.alert-info` 클래스를 추가한다.

```
    <div class="alert alert-info">
    ...
    </div>
```


## 프레그레스 바

프로그레스 바는 파일 업로드, 로딩과 같은 진행 상황을 표현할 때 사용되는 컴포넌트이다.

### 마크업

__기본 프로그레스 바__

기본 프로그레스바는 수직 간단한 그라디언트 효과를 사용한다.

```
    <div class="progress">
        <div class="bar" style="width: 60%;"></div>
    </div>
```

__줄무늬 프로그레스 바__

줄무늬 효과를 만들기 위해 그라디언트 효과를 사용하며 `.progress` 클래스에 `.progress-striped` 클래스를 추가 한다.

```
    <div class="progress progress-striped">
        <div class="bar" style="width: 60%;"></div>
    </div>
```

__애니메이션된 프로그레스 바__

줄무늬에 애니메이션 효과를 주기 위해 `.active` 클래스를 추가 한다.

```
    <div class="progress progress-striped active">
        <div class="bar" style="width: 60%;"></div>
    </div>
```

__스택 프로그레스 바__

프로그레스 바에 다양한 색의 바를 보여주기 위해 `.progress` 클래스에 내부에 `.bar` 클래스에 `.bar-success`,  `.bar-warning`, `.bar-danger`  등의 클래스를 추가해서 다양한 색의 바를 표현 할 수 있다.

```
    <div class="progress">
        <div class="bar bar-success" style="width: 35%;"></div>
        <div class="bar bar-warning" style="width: 20%;"></div>
        <div class="bar bar-danger" style="width: 10%;"></div>
    </div>
```

### 옵션

__추가적인 색상__

프로그레스 바의 색상은 버튼에서 사용되는 색상인  `info`, `success`, `warning`, `danger` 를 사용 한다.

```
    <div class="progress">
        <div class="bar" style="width: 20%"></div>
    </div>
    <div class="progress progress-info">
        <div class="bar" style="width: 20%"></div>
    </div>
    <div class="progress progress-success">
        <div class="bar" style="width: 40%"></div>
    </div>
    <div class="progress progress-warning">
        <div class="bar" style="width: 60%"></div>
    </div>
    <div class="progress progress-danger">
        <div class="bar" style="width: 80%"></div>
    </div>
```


__줄무늬 프로그레스 바__

추가적인 색상에 줄무늬 클래스를 추가해서 다양한 색상의 줄무늬 프로그레스바를 만들 수 있다.

```
    <div class="progress progress-striped">
        <div class="bar" style="width: 20%"></div>
    </div>
    <div class="progress progress-info progress-striped">
        <div class="bar" style="width: 20%"></div>
    </div>
    <div class="progress progress-success progress-striped">
        <div class="bar" style="width: 40%"></div>
    </div>
    <div class="progress progress-warning progress-striped">
        <div class="bar" style="width: 60%"></div>
    </div>
    <div class="progress progress-danger progress-striped">
        <div class="bar" style="width: 80%"></div>
    </div>
```


## 기타 요소 (Miscellaneous)

__Wells__

Wells은 엘리먼트에 심플한 inset 효과를 주기 위해 사용한다.

```
    <div class="well">
	    Hello World
    </div>
```

__Close__

모달창이나 경고창을 사라지게 하기 위해 공통적으로 close 아이콘을 사용한다.

```
    <a class="close">&times;</a>
```

__도움되는 클래스들(Helper classes)__

__.pull-left__

`.pull-left` 클래스가 선언된 엘리먼트는 `float: left;` 속성이 선언된다.


__.pull_right__

`.pull-right` 클래스가 선언된 엘리먼트는 `float: right;` 속성이 선언된다.

_.clearfix__

`float` 속성이 적용된 엘리먼트를 `Clear`  시킨다.

__.muted__

`.muted` 클래스가 선언된 엘리먼트의 텍스트 색을 `color: #999` 로 변경한다.

