# Coded in CoffeeScript: http://coffee-script.org

# Your CoffeeScript code goes here

# searchForm이 서브밋 될때 실행된다.
$('#searchForm').submit ->
    # searchForm의 input의 값으로 신규 정규식을 생성한다.
    matchStr = new RegExp $('#searchForm input').val()
    # article 테그 하위의 tags 속성을 지닌 div를 찾아 배열로 보관한다.
    articles = $('article div[tags]')
    # articles 각각의 element를 모두 숨긴다.
    articles.hide()
    # articles 배열 만큼 반복문을 돈다.
    $.each( articles, ( idx, at ) ->
        # 배열에서 idx 번째의 element의 tags 속성을 가져온다.
        str = $( articles[idx] ).attr 'tags'
        # str 변수의 값으로 정규식과 비교한다.
        flag = matchStr.test str
        # flag 가 true일 경우 해당 idx번째의 element를 보여준다.
        if flag then $(articles[idx]).show() )
    # form submit을 막기위해 return false를 해준다.
    return false

$('#tag-search').click ->
    matchStr = new RegExp $('#searchForm input').val()
    articles = $('article div[tags]')
    articles.hide()
    showCnt = 0

    $.each( articles, ( idx, at ) ->
        str = $( articles[idx] ).attr 'tags'
        flag = matchStr.test str
        if flag 
            $(articles[idx]).show()
            showCnt++
    )

    #if showCnt is 0 
    #    alert("검색된 문서가 없습니다.")
        
    return false
