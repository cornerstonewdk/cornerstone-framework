//#####################################################################################
// 그리드 컬럼 정의 방법
// -----------------------------------------------------------------------------------
// screen.colInfo = [
//	                 { // 컬럼 정의부
//	                   TITLE       : (생략가: 지정하지 않을 경우 IS_DISPLAY = false 효과)
//                   , ID          : (필수)
//                   , TYPE        :
//                   , CTRL_FUNC   : 	
//                   , IS_DISPLAY  : 화면보이기 여부(생략가 - Default: true)
//                   , TH_CLASS    :
//                   , TD_CLASS    :
//                   , CTRL_CLASS  : 	
//                   , DATA_COND   :
//                   , DATA_TYPE   :
//                   , DATA_FORMAT :
//                   , TH_EVNT_TYPE:
//                   , WIDTH       :
//	                 }
//                  ,{ //페이징 단위 로우처리부
//	                 ,ROW_CLICK_FUNC :
//                   ,ROW_DRAW_ID    :
//                   ,ROW_DRAW_FUNC:function(objElemet){	
//                                      var objTr = $('tr',objElemet);
//                                               
//                                      $.each(objTr, function(idx, trElement){
//                                          screen.makeGrid.setSelectedRow(trElement);
//                                                     
//                                      });
//                   }
//	                ];
//#####################################################################################



MakeGrid = function(_objDef, _colInfo, _gestureView) {

    /*
     * javascript 언어 특성상 배열은 레퍼런스 타입으로 배열을 내부에서 복사처리
     */
    var __copyArray = function(_target){

        var retValue = new Array();

        if(_target == undefined) return retValue;

        for(key in _target)
        {
            retValue[key] = _target[key];
        }

        return retValue;
    }

    var m_colsInfo       = _colInfo;             //리스트 컬럼 정의
    var m_objDef         = __copyArray(_objDef); //aJax 통신 정의
    var m_objSndData     = null;                //보낼 데이터
    var m_totalCnt       = 0;                    //총 항목수
    var m_lastPage       = 0;                    //총페이지수
    var m_curPage        = 0;                    //현재 페이지
    var m_maxSeq         = -1;                   //max(seq)
    var m_divList        = m_objDef.DIV_LIST;    //리스트 그릴 영역
    var m_tableID        = m_objDef.TABLE_ID;    //리스트 아이디
    var m_pagingType     = "NUMBER";             //페이징 방식
    var m_async          = true;                //동기화 방식
    var m_limitPage      = 5;                    //한페이지에 이동할 수 있는 페이지수
    var m_limitItem      = 80;                   //한페이지에 표시할 항목수
    var m_indexNum       = 0;                    //항목 인덱스 번호
    var m_selectedRow    = null;                //선택된 로우
    var m_allChecked     = true;                //전체선택 값
    var m_isExecEvent    = false;               //이벤트 등록여부
    var m_arrPagingEvent = null;
    var m_IdxSort        = '';
    var m_isIdxSort      = false;
    var m_caption        = null;
    var m_captionAlign   = null;
    //var m_tableClass     = 'table-type2';
    var m_tableClass     = 'table-type8';
    var m_direct         = '';               //gesture모드일 경우 페이지 넘김 방향
    var m_pagingClass    = 'float-page';
    var m_jsonData       = null;
        
    if(_objDef.PAGING_TYPE != undefined) m_pagingType = _objDef.PAGING_TYPE;    
    if(_objDef.ASYNC       != undefined) m_async      = _objDef.ASYNC;
    if(_objDef.LIMIT_PAGE  != undefined) m_limitPage  = _objDef.LIMIT_PAGE;
    if(_objDef.LIMIT_ITEM  != undefined) m_limitItem  = _objDef.LIMIT_ITEM;
    
    if(m_pagingType == 'REPORT'){
        m_tableClass = 'table-type8';
    }
    
    if(m_pagingType == 'NUMBER') m_arrPagingEvent = new Array();
    
    /**
     * 리스트 그릴 영역의 부모 ElementID 추출
     */
    var __getListParent = function(){ 

        var retValue = '';
        var pos = m_divList.indexOf(" ");
        if(pos != -1){
            retValue =  m_divList.substring(0, pos);
        }
        
        return retValue;
    }
    var m_divParent  = __getListParent();

    //var CONS_STYLE_HAND      = ' style="cursor:pointer;"';
    var CONS_STYLE_HAND      = '';
    var CONS_STYLE_DISP_NONE = ' style="display:none;"';

    /**
     * 지정한 페이지로 이동
     * @param _pageNum 이동할 페이지 번호
     */
    this.movePage = function(_pageNum){
    	
        __movePage(_pageNum);
    }
    
    this.reloadPage = function(){

    	if(m_pagingType != 'NUMBER') return;    	
    	if(m_pagingType != 'NONE' && m_pagingType != 'REPORT') __getAjaxCountData();
    	
        __getAjaxListData();
    }
    

    var __movePage = function(_pageNum){

        var retValue = cf_getSessionStorage("pageInfo");
        if(retValue)
        {
            cf_removeSessionStorage("pageInfo");
            
            __getPageInfo(retValue);
        }
        else
        {
            m_curPage = _pageNum;
    
            if(m_curPage == 1){
                if(m_pagingType != 'NONE' && m_pagingType != 'REPORT') __getAjaxCountData();
            }
        }
        __getAjaxListData();
    }

    /**
     * 이전 페이지로 이동
     */
    this.previousPage = function(){
        __previousPage();
    }

    var __previousPage = function(){

        if(m_totalCnt == 0) return;
        if(m_curPage == 1) return;

        m_curPage--;
        //console.log('__previousPage : %s', m_curPage);
        __getAjaxListData();
    }

    /**
     * 다음 페이지로 이동
     */
    this.nextPage = function(){
        __nextPage();
    }

    var __nextPage = function(){

        if(m_totalCnt == 0) return;
        if(m_lastPage == m_curPage) return;
        m_curPage++;

        __getAjaxListData();
    }

    /**
     * 서버에 보낼 사용자 데이터 설정
     * @param _objSndData 해쉬데이터
     */
    this.setSendData = function(_objSndData){
        m_objSndData = _objSndData;
    }

    /**
     * 서버에 보낼 사용자 데이터 가져오기
     * @param _objSndData 해쉬데이터
     */
    this.getSendData = function(_objSndData){
        return m_objSndData;
    }

    /**
     * 현재 상태 가져오기 - dhkim
     * @param _objSndData 해쉬데이터
     */
    this.setPageInfo = function()
    {
        var pageInfo = new Object();
            pageInfo['sndData'] = m_objSndData
        var currPage = new Object();
            currPage['page'] = m_curPage;
            
        var currStatus = cf_mergeHashData(pageInfo, currPage);
        
        console.log(currStatus);

        cf_setSessionStorage("pageInfo", currStatus);
        
        return currStatus;

    }
    
    /**
     * 현재 상태 설정하기 - dhkim
     * @param _objSndData 해쉬데이터
     */
    var __getPageInfo = function(currObj)
    {
        m_objSndData = currObj.sndData;
        if(m_pagingType != 'NONE' && m_pagingType != 'REPORT') __getAjaxCountData();
        __movePage(currObj.page);
    }
    


    /**************************************************************************
     * 데이터 통신/ 처리부
     ***************************************************************************/
    /**
     * 리스트 항목 가져오기
     */
    var __getAjaxListData = function(){
        
        var listId = 'getList';
        var callBackFunc = __cbDrawList;
        
        if(m_objDef.LIST_ID != undefined){
            listId = m_objDef.LIST_ID;
        }
        
        if(m_objDef.PAGING_TYPE == 'REPORT'){
            callBackFunc = __cbDrawReport;
            m_async      = false;
        }
        
        if(m_objSndData == undefined) m_objSndData = {};
        
        // 현재 Page가 Max Page보다 크면 Max Page로 이동.
        if(m_lastPage < m_curPage)
        {
            m_curPage = m_lastPage;
        }

        var objSendData = {}
            objSendData['MODE'     ] = listId;
            objSendData['MAXCNT'   ] = m_limitItem;
            objSendData['MAXSEQ'   ] = m_maxSeq;
            objSendData['PAGE'     ] = m_curPage;
            objSendData['PSTRT_IDX'] = ((m_curPage - 1) * m_limitItem);
        objSendData = cf_mergeHashData(m_objSndData, objSendData);

        var objDef = {};
            objDef.URL       = m_objDef.URL;
            objDef.CALLBACK  = callBackFunc;
            objDef.ASYNC     = m_async
            objDef.DATA      = objSendData;
            objDef.elementID = m_divList + " " + "#" + m_tableID;
            
        if(m_pagingType == 'SCROLL'){
            objDef.isSpinner   = false;
        }
        console.log('sndData : %j', objDef);
        cf_getJsonData(objDef);
    }

    /**
     * 리스트 항목의 총수와 Max(seq) 가져오기
     */
    var __getAjaxCountData = function(){

        var cntId = 'getCntSeq';
        if(m_objDef.CNT_ID != undefined){
            cntId = m_objDef.CNT_ID;
        }
        if(m_objSndData == undefined) m_objSndData = {};        

        var objSendData = {};
            objSendData['MODE']   = cntId;
            objSendData['MAXSEQ'] = '';
        objSendData = cf_mergeHashData(m_objSndData, objSendData);
        
        var objDef = {};
            objDef.URL      = m_objDef.URL;
            objDef.CALLBACK = __cbSetCount;
            objDef.ASYNC    = false;
            objDef.DATA     = objSendData;
            
        cf_getJsonData(objDef);
    }

    /**
     * [콜백] 리스트 항목의 총수와 Max(seq) 멤버변수에 설정
     * @param _jsonData aJax 데이터
     * @param objDef 정의된 aJax
     */
    var __cbSetCount = function(_jsonData, _objDef){
        var total = _jsonData.cnt;
        var seq   = _jsonData.seq;
        console.log("total:%s, seq:%s", total, seq);

        if(total != undefined){
            m_totalCnt = total;            
            m_lastPage  = Math.ceil(m_totalCnt/m_limitItem);
        }
        if(total != undefined){
            m_maxSeq = seq;
        }
        __setTotalCnt();
    }

    var __setTotalCnt = function(){
    	
    	var spnTotaElement = $(m_divParent).find('#spnTotalCnt');
    	
    	if(spnTotaElement.length > 0){
    		spnTotaElement.text(m_totalCnt);
    	}
    }

    /**
     * [콜백] 리스트 항목 그리기 / 이벤트 등록
     * @param _jsonData aJax 데이터
     * @param objDef 정의된 aJax
     */
    var __cbDrawList = function(_jsonData, objDef){

    //    console.log('__cbDrawList');
        console.log(_jsonData);        
        if(_jsonData == undefined || _jsonData == ''){
            __emptyTable();
            return;
        }
        
        var rowDrawId;
        var rowDrawFunc;
        var rowClickFunc;
        m_jsonData = _jsonData;
        
        var trHtml = '';

        if(m_pagingType == 'NONE'){
        	if(_jsonData.length == undefined) m_totalCnt = 1;
        	else m_totalCnt = _jsonData.length; 
                                                
            m_indexNum = m_totalCnt + 1;
            __setTotalCnt();            
        }else{
            m_indexNum = m_totalCnt - ((m_curPage - 1) * m_limitItem) + 1;
        }

        var isPopOver = false;
        $.each(_jsonData, function(idx, entry ){
            
            var tdHtml      = '';
            $.each(m_colsInfo, function(idxCol , colInfo ){

                var id    = colInfo.ID;
                var value = entry[id];
                if(value == undefined) value = '';                                
                
                if(colInfo.TYPE == 'INDEXNUM' && m_isIdxSort == false){
                    if(colInfo.IDX_SORT != undefined){
                        m_IdxSort = colInfo.IDX_SORT;
                        
                        if(m_IdxSort == 'ASC') m_indexNum = 0;
                        m_isIdxSort = true;
                    }
                }

                if(colInfo.ROW_CLICK_FUNC != undefined) rowClickFunc  = colInfo.ROW_CLICK_FUNC;                
                if(colInfo.ROW_DRAW_FUNC  != undefined) rowDrawFunc   = colInfo.ROW_DRAW_FUNC;                
                if(colInfo.ROW_DRAW_ID    != undefined) rowDrawId     = colInfo.ROW_DRAW_ID;
                if(colInfo.IS_MODAL       != undefined) m_isModal     = colInfo.IS_MODAL;
                if(colInfo.TABLE_CLASS    != undefined) m_tableClass  = colInfo.TABLE_CLASS;
                if(colInfo.PAGING_CLASS   != undefined) m_pagingClass = colInfo.PAGING_CLASS;                
                if(colInfo.IS_POPOVER     != undefined || isPopOver == false) isPopOver = colInfo.IS_POPOVER;
                                               
                if(__isDrawTd(colInfo) == true){
                    var control = __getControl(colInfo, value, idx);
                    tdHtml+= __getTd(colInfo, control, value);                    
                }
                
            });
            trHtml += __getTr(tdHtml, idx);
        });

        //그리기
        var thead = '';
        var table = '';
        if(m_pagingType == 'NUMBER' || m_pagingType == 'GESTURE' || m_pagingType == 'NONE'){

            thead = __getTHead();
            table = __getTable(thead);

            //$(m_divList).html(table);
            document.querySelector(m_divList).innerHTML = table; 

            var tbody = __getTBody(trHtml);
//            $(m_divList + " " + "#" + m_tableID).append(tbody);
            document.querySelector(m_divList + " " + "#" + m_tableID).innerHTML += tbody;
            
            if(m_pagingType == 'NUMBER') __setPageNumberType()

        }
        else{

            if(m_curPage == 1){
                thead = __getTHead();
                table = __getTable(thead);
//                $(m_divList).html(table);
                document.querySelector(m_divList).innerHTML = table;
                __setCaption();
            }
            var tbody = __getTBody(trHtml);
            //$(m_divList + " " + "#" + m_tableID).append(tbody);
            document.querySelector(m_divList + " " + "#" + m_tableID).innerHTML += tbody;
        }

        //이벤트 등록
        if(m_isExecEvent == false){
            
            __setTitleFuncEventHandler();
            __setAllCheckEventHandler();
            __setTrEventHandler(rowClickFunc, rowDrawId);  //TR Click 이벤트 등록
            
            if     (m_pagingType == 'NUMBER'   ) __setPageNumberEventHandler();
            else if(m_pagingType == 'SCROLL'   ) __setScrollEventHandler();
            else if(m_pagingType == 'AN-SCROLL') __setAnScrollEventHandler();
            else {}
          
            m_isExecEvent = true;
        }
        if(m_pagingType == 'NUMBER'){
            window.scrollTo(0,0);
        }
        if(m_pagingType == 'GESTURE')   __setGestureEventHandler();
        __drawEventHandler(rowDrawFunc);
        
        if(isPopOver == true) __setPopOverEventHandler();
        
    }
    
    var __setPopOverEventHandler = function(){
    	console.log('__setPopOverEventHandler');
    	$('[rel=popover]').each(function(i) {
    	    $(this).popover({
    	        trigger:"click"
    	    });
    	});
    }
    
    /**
     * [콜백] 보고서 그리기 
     */
    var __cbDrawReport= function(_jsonData, objDef){
        //console.time('report');
        if(_jsonData == undefined || _jsonData == ''){
            __emptyTable();
            return;
        }
        
        var rowDrawId;
        var rowDrawFunc;
        var rowClickFunc;
        var trHtml = '';
        
        m_jsonData = _jsonData;        
        m_totalCnt = _jsonData.length;
        m_indexNum = m_totalCnt + 1;
        
        __setTotalCnt();
        
        var oldValue       = null;
        
        var arrRowSapn     = null;
        $.each(_jsonData, function(idx, entry ){
            
            var isDrawSubTitle = false;    
            var tdHtml         = '';
            var totalGubun     = '';
            var isTotalWrite   = false;
            var isTotalRead    = false;
            var isSubTitle     = false;
            var isSubTitleRead = false;
            var reportColInfo  = null;
            var isRowSpan      = false;
            $.each(m_colsInfo, function(idxCol , colInfo ){

                var id    = colInfo.ID;
                var value = entry[id];
                if(value == undefined) value = '';                                
                
                if(colInfo.TYPE == 'INDEXNUM' && m_isIdxSort == false){
                    if(colInfo.IDX_SORT != undefined){
                        m_IdxSort = colInfo.IDX_SORT;
                        
                        if(m_IdxSort == 'ASC') m_indexNum = 0;
                        m_isIdxSort = true;
                    }
                }

                if(colInfo.ROW_CLICK_FUNC != undefined) rowClickFunc = colInfo.ROW_CLICK_FUNC;                
                if(colInfo.ROW_DRAW_FUNC  != undefined) rowDrawFunc  = colInfo.ROW_DRAW_FUNC;                
                if(colInfo.ROW_DRAW_ID    != undefined) rowDrawId    = colInfo.ROW_DRAW_ID;
                if(colInfo.IS_MODAL       != undefined) m_isModal    = colInfo.IS_MODAL;
                if(colInfo.TABLE_CLASS    != undefined) m_tableClass = colInfo.TABLE_CLASS;
                if(colInfo.IS_SUBTITLE    != undefined) isSubTitle   = colInfo.IS_SUBTITLE;
                
                if(colInfo.IS_ROWSPAN     != undefined){
                    isRowSpan = colInfo.IS_ROWSPAN;
                }else{
                    isRowSpan = false;
                }
                
                if(idx == 0)
                if(isRowSpan == true){
                    if(arrRowSapn == null) arrRowSapn = new Array();
                    arrRowSapn.push(idxCol);
                }

                if(isSubTitle == true && isSubTitleRead == false){
                    reportColInfo = colInfo;
                    if(value != oldValue) isDrawSubTitle = true
                    oldValue = value;
                    isSubTitleRead = true;                    
                }
                
                if((value == 'GRAND_TOTAL' || value == 'SUB_TOTAL') && isTotalRead == false){                    
                    totalGubun  = value;
                    isTotalRead = true;
                }
                
                if(__isDrawTd(colInfo) == true){
                    
                    if(isTotalWrite == false){
                        if(colInfo.IS_DISPLAY == undefined || colInfo.IS_DISPLAY == true) isTotalWrite = true;    
                    }else{
                        
                        if(isTotalRead == true){
                            if(colInfo.DATA_TYPE != 'number'){
                                value      = '';
                                totalGubun = '';
                            }else{
                                totalGubun = 'TOTAL';
                            }                                                
                        }
                    }
                    var control = __getControl(colInfo, value, idx, totalGubun);
                    tdHtml += __getTd(colInfo, control, value);
                    
                }
                
                if((isSubTitleRead)&&(reportColInfo == colInfo)){
                    if(value != oldValue) isDrawSubTitle = true
                    oldValue = value;
                    
                }
            });
            //보고서일 경우만
            if(isDrawSubTitle == true && oldValue != 'GRAND_TOTAL'){
                if(oldValue != ''){ 
                    var colSpan     = m_colsInfo.length;
                    var objCondData = __getCondData(reportColInfo, oldValue);
                    var value       = objCondData['data'];
                    var row = '';
                        row += '        <th colspan="' + colSpan + '" style="text-align:center">';
                        row += value; 
                        row += '        </th>';
                    trHtml +=__getTr(row);
                }
                isDrawSubTitle = false;
                
            }
            trHtml += __getTr(tdHtml, idx);
        });
 
        //그리기
        var thead = __getTHead();
        var table = __getTable(thead);
        //$(m_divList).html(table);  
        document.querySelector(m_divList).innerHTML = table;
        __setCaption();
 
        var tbody = __getTBody(trHtml);
        //$(m_divList + " " + "#" + m_tableID).append(tbody);
        document.querySelector(m_divList + " " + "#" + m_tableID).innerHTML += tbody;
        if(arrRowSapn != null && arrRowSapn.length > 0){ 
            
            __rowSpan(arrRowSapn);
        }

        
        //이벤트 등록
        if(m_isExecEvent == false){
            __setTitleFuncEventHandler();
            __setAllCheckEventHandler();
            __setTrEventHandler(rowClickFunc, rowDrawId);  //TR Click 이벤트 등록
            
            m_isExecEvent = true;
        }
        __drawEventHandler(rowDrawFunc);
       
        
        //console.timeEnd('report');

    }
    
    

    /**
     * TD로 그려질 부분인가??
     */
    var __isDrawTd = function(_colInfo){
        
        var retValue = true;        
        var colInfo  = _colInfo;
        
        if(colInfo.ROW_CLICK_FUNC != undefined) retValue = false;
        if(colInfo.ROW_DRAW_FUNC  != undefined) retValue = false;
        if(colInfo.ROW_DRAW_ID    != undefined) retValue = false;
        if(colInfo.IS_MODAL       != undefined) retValue = false;
        if(colInfo.TABLE_CLASS    != undefined) retValue = false;

        return retValue;
    }
    var __setGestureEventHandler = function(){
        
        var touchView = _gestureView.extend( {

            el: m_divList + " " + "#" + m_tableID,
            initialize: function() {
                //debugger;
            }
            , events: {
                'dragend':'dragend'
               ,'swipe':'swipe'
            }
            , gestureOptions: {
                 prevent_default : true
                ,drag_vertical   : false
//                ,swipe_time      : 200
//                ,swipe_min_distance:20
//                ,drag_min_distance :15                
            }
            , swipe   : function( event ) {
                console.log('Swipe!!!');
                console.log('m_direct : ', m_direct);
                            if(m_direct == 'right'){
                                __previousPage();
                            }else if(m_direct == 'left'){
                                __nextPage();     
                            }
                            else{}       
                            m_direct = '';
                        }
            , dragend : function( event ) {                
                            var direction = event.direction;
                            console.log('dragend!!!:%s', direction);            
                            if(direction == 'right'){                            
                                m_direct = 'right';
                            }                 
                            else if(direction == 'left'){                        
                                m_direct = 'left';            
                            }
                            else{}          
                        }            
        } );

        new touchView();        
    }
    
    
    var __setAnScrollEventHandler = function(){
        //console.log('__setAnScrollEventHandler');
        $(window).scroll(function (){
            if($(window).scrollTop() == $(document).height() - $(window).height()){ //최하단의 위치값과 동일여부
                __nextPage();
            }
        });
    }


    var __setTitleFuncEventHandler = function(){
    //    console.log('__setTitleFuncEventHandler');
        $.each(m_colsInfo, function(idx, colInfo ){

            var titleFunc = colInfo.TITLE_FUNC;
            if(titleFunc != undefined){
                var colId = colInfo.ID;
                var selector = m_divList + ' ' +  '#th_' + colId;
                
                $(document).off('click', selector).on('click', selector, function(event){

                    var funcType = typeof(titleFunc);
                    if(funcType == 'function'){
                        titleFunc(event, this);
                    }else{

                        if(titleFunc.indexOf(".") != -1){
                            eval(titleFunc + "(event, this)");
                        }else{
                            window[titleFunc](event, this);    
                        }                            
                    }
                } );
            }
        });
    }


    /**
     * NUMBER 페이지 타입의 페이징 그리기
     */
    var __setPageNumberType = function(){
        console.log('__setPageNumberType');

        if(m_pagingType == undefined || m_pagingType.indexOf('SCROLL') != -1 ) return;

        var buttonArea = $(m_divList + " " + "#divPagaArae");

        if(buttonArea.length == 0){

            var nowBlock  = Math.ceil(m_curPage/m_limitPage); //현재 페이지 블럭
            var startPage = (nowBlock-1) * m_limitPage + 1; //현재 페이지 블럭의 시작 페이지
            var endPage   = startPage + m_limitPage - 1; // 현재 페이지 블럭의 마지막 페이지

            var html = '';
                //html += "<div id='divPagaArae'>";
                html += "<div id='divPagaArae' class='" + m_pagingClass + "'>";
                html += "<ul>";

                if(endPage > m_lastPage){ 
                    endPage = m_lastPage;
                }

                if(m_curPage == 1){
                    html += "<li class='disabled'><a><span></span></a></li>";
                }else{
                    html += "<li><a href='#'><span class='clsGridPageNum' data-page='pre'></span></a></li>"
                }

                for(var i = startPage; i <= endPage; i++){
                        if(i == m_curPage){
                            html += "<li class='active'><a href='#'>" + i + "</a></li>"
                        }else{
                            html += "<li><a href='#' class='clsGridPageNum' data-page='" + i + "'>" + i + "</a></li>"
                        }

                }

                if(m_lastPage == m_curPage){
                    html += "<li class='disabled'><a><span></span></a></li>";
                }else{
                    html += "<li><a href='#'><span class='clsGridPageNum' data-page='next'></span></a></li>"
                }
                html += "</ul>";
                html += "</div>";
                
            //$(m_divList).append(html);
              document.querySelector(m_divList).innerHTML += html;
        }
    }

    var __posPageNumberAreaPos = function(){
        
        var pageArea    = $("#divPagaArae");
        var list        = $(m_divList)
        var posPageArea = pageArea.position();
        var posList     = list.position();
        var posEndList  = posList.top + list.height();
        
        if(posPageArea.top + 57 < posEndList){
            pageArea.removeClass("float-page2");
            pageArea.addClass("float-page");                
            
        }else{
            pageArea.removeClass("float-page");
            pageArea.addClass("float-page2");                
        }
        
    } 
    /**
     * NUMBER 타입의 페이징 이벤트 등록
     */
    var __setPageNumberEventHandler = function(){

        var buttonArea = m_divList + " " + "#divPagaArae .clsGridPageNum";
//        __posPageNumberAreaPos();
//        
//        $(window).scroll(function (){
//            __posPageNumberAreaPos();
//        });
        $(document).off('click', buttonArea).on('click', buttonArea, function(event){            
            //console.log('__setPageNumberEventHandler - m_divList:%s', m_divList);
            event.preventDefault();
            var pageElement = $(event.target);

            var page = $(event.target).data('page');

            if(page == 'pre'){
                __previousPage();

            }else if(page == 'next'){
                //if(m_lastPage == m_curPage) return;
                    __nextPage();
            }else{
                //if(m_curPage == page) return;
                __movePage(page);
            }
            __setPageNumberType();
        });
    }

    var __setScrollEventHandler = function(){

        $("div.scroll-wrapper").featuredScrollView({
            pullDownID:"pullDown",
            pullUpID:"pullUp",
            pullDownAction:function () {
                // 일반적으로 pullDown은 새로고침 액션으로 이용된다.
                setTimeout(function() {
                    //$(m_divList).html('');
                    __movePage(1);
                    $("div.scroll-wrapper").featuredScrollView("refresh");
                }, 500);
            },
            pullUpAction:function () {
                // ajax로 데이터바인딩이 완료될때 꼭 스크롤뷰 새로고침이 필요함.
                setTimeout(function() {
                    __nextPage();
                    $("div.scroll-wrapper").featuredScrollView("refresh");
                }, 500);
            }
        });
    }

    /**
     * 리스트 페이지당 그리기 이벤트 등록
     * @param _rowDrawFunc 등록 함수
     * @param _rowDrawId 함수ID
     */
    var __drawEventHandler = function(_rowDrawFunc, _rowDrawId){

        if(_rowDrawFunc == undefined) return;

        var objElement   = m_divList + " " + "#" + m_tableID + " "  + "#" + m_tableID + "_body_" + m_curPage;

        var cntEvent     = 0; //이벤트 갯수
        var arrEventId   = null;
        var arrEventFunc = null;

        if(_rowDrawId == undefined || _rowDrawId.indexOf(",") == -1){//단일 이벤트 처리

            var eventId = _rowDrawId;

            if(eventId == undefined){//이벤트ID 없이 이벤트만 있을 경우

                var funcType = typeof(_rowDrawFunc);
                if(funcType == 'function'){
                    _rowDrawFunc(objElement);
                }else{
                    //window[_rowDrawFunc](objElement);
                    if(_rowDrawFunc.indexOf(".") != -1){
                        eval(_rowDrawFunc + "(objElement)");
                    }else{
                        window[_rowDrawFunc](objElement);    
                    }                        
                }

            }else{
                arrEventType = new Array(eventId);
                arrEventId   = new Array();
                arrEventFunc[eventId] = _rowDrawFunc;
                cntEvent = 1;
            }

        }else{ //복수개 이벤트 처리

            arrEventId   = _rowDrawId.split(',');
            arrEventFunc = _rowDrawFunc;
            cntEvent     = arrEventId.length;
        }

        for(var i=0; i< cntEvent; i++){

            var eventId   = arrEventId[i];
            var eventFunc = arrEventFunc[eventType];

            var funcType = typeof(eventFunc);
            if(funcType == 'function'){
                eventFunc(objElement);
            }else{
                //window[eventFunc](objElement);
                if(eventFunc.indexOf(".") != -1){
                    eval(eventFunc + "(objElement)");
                }else{
                    window[eventFunc](objElement);    
                }                        
                
            }
        }

    }

    /**
     * TR 이벤트 등록
     * @param _rowClickFunc TR 이벤트 함수
     */
    var __setTrEventHandler = function(_rowClickFunc){

        if(_rowClickFunc == undefined) return;

        var selector = m_divList + " " + "#" + m_tableID + " " + "tr[data-idx]";
        
        $(document).off('click', selector).on('click', selector ,function(event){

            if(event.target.tagName == 'INPUT') return ;

            __setSelectedRow(this);

            var funcType = typeof(_rowClickFunc);
            if(funcType == 'function'){
                _rowClickFunc(event, this);
            }else{
                //window[_rowClickFunc](event, this);
                if(_rowClickFunc.indexOf(".") != -1){
                    eval(_rowClickFunc + "(event, this)");
                }else{
                    window[_rowClickFunc](event, objElement);    
                }                     
            }
        } );

    }


    /**************************************************************************
     * 리스트 그리기 영역
     ***************************************************************************/
    /**
     * 데이터가 없을 때 빈 그리드 표시
     */
    this.emptyTable = function(){
        __emptyTable();
    }

    var __emptyTable = function(){

        var colSpan = m_colsInfo.length;
        var tableClass  = null;
        var rowDrawFunc = null;
        $.each(m_colsInfo, function(idxCol , colInfo ){
            tableClass = colInfo.TABLE_CLASS;
            rowDrawFunc = colInfo.ROW_DRAW_FUNC;
            if(tableClass != undefined){
                m_tableClass = tableClass; 
                //return false;
            }
            if(rowDrawFunc != undefined){
            	rowDrawFunc = rowDrawFunc; 
            }            
        });
 
        var emptyRow = '';
            emptyRow += '<tbody>';
            emptyRow += '    <tr>';
            emptyRow += '        <td id="noData" colspan="' + colSpan + '" style="text-align:center">';
            emptyRow += '            데이터가 존재하지 않습니다.';
            emptyRow += '        </td>';
            emptyRow += '    </tr>';
            emptyRow += '</tbody>';

        var thead = __getTHead();
            thead += emptyRow;

        var table = __getTable(thead);        
        //$(m_divList).html(table);
        document.querySelector(m_divList).innerHTML =  table;
        
        if(rowDrawFunc != undefined) __drawEventHandler(rowDrawFunc);
        __setCaption();
    }

    /**
     * 리스트 tHead Tag를 감싸기.
     */
    var __getTHead = function (){

        var retValue = "";

        retValue += '<thead id="' + m_tableID + '_head">';
        retValue += '<tr>';

        $(m_colsInfo).each(function(idx,colInfo){
            if(__isDrawTd(colInfo) == true){
                retValue += "<th" + " ";
                retValue += __getClass(colInfo, "th");
                retValue += __getDisplay(colInfo);
                retValue += __getWidth(colInfo);
                retValue += ">";
                retValue += __getHead(colInfo);                
                retValue += "</th>";
            }
        });

        retValue += '</tr>';
        retValue += '</thead>';

        return retValue;
    }
    
    var __getWidth = function(_col){
    	
    	var retValue = '';
    	var width    = _col.WIDTH; 
    	
    	if( _col.WIDTH != undefined){
    		retValue = ' style="width:' + width + '"';
    	} 
    	
    	return retValue; 
    }
    

    /**
     * 리스트 tBody Tag를 감싸기
     * @param _html tBody Tag로 감쌀 HTML
     */
    var __getTBody = function(_html){

        var retValue = "";
        var tBodyId = m_tableID + "_body_" + m_curPage;

        retValue += '<tbody id="' + tBodyId + '">';
        retValue += _html;
        retValue += '</tbody>';

        return retValue;
    }

    /**
     * 리스트 헤더 HTML 행성
     * @param _col 하나의 Row 컬럼 정의부
     */
    var __getHead = function(_col){

        var retValue = '';

        var title    = _col.TITLE;
        var columnId = _col.ID;
        var titleFunc = _col.TITLE_FUNC;

        var type     = '';
            type = _col.TYPE;

        if(type != undefined) type = type.toLowerCase();

        //전체 체크박스를 정의했을 경우
        if(type == 'all_check'){
            if(title != undefined){//타이틀이 존재할 경우
                retValue += "<a id='all_check'>" + title + "</a>";
            }else{//타이틀이 없을 경우
            	retValue +="<label class='checkbox'>";
                retValue +="    <input type='checkbox' id='all_check'>";
                retValue +="    <span class='inp-check'></span>";
                retValue +="</label>";
                
            }

        }else{

            if(titleFunc != undefined){

                var headId = "th_" + columnId;
                retValue += "<a id='" + headId +"'>";
                if(title == undefined && title == ''){
                    retValue += columnId;
                }
                else{
                    retValue += title;
                }

                retValue += "</a>";
            }
            else{
                retValue += "<span>";
                if(title == undefined && title == ''){
                    retValue += columnId;
                }
                else{
                    retValue += title;
                }

                retValue += "</span>";
            }
        }

        return retValue;
    }



    /**
     * 리스트 table Tag를 감싸기
     * @param _html tBody Tag로 감쌀 HTML
     */
    var __getTable = function(_html){

        var retValue = '';
        
        retValue += '<table id="' + m_tableID + '" class="' + m_tableClass + '">';
        retValue += '    <caption id="tb_cap_' + m_tableID + '"></caption>';
        retValue += _html;
        retValue += '</table>';
        return retValue;
    }

    /**
     * 전체 체크박스 이벤트 등록
     */
    var __setAllCheckEventHandler = function(){

        var tableSelector    = m_divList + " " + "#" + m_tableID
        var allCheckSelector = tableSelector + " " + "#all_check";

        $(document).off("click", allCheckSelector).on("click", allCheckSelector, function(event){

            event.preventDefault();

            var booleanVal = m_allChecked;
            var elements = $(tableSelector + " .toggleCheck");

            $.each(elements, function(idx, element){
                if(element.disabled == false) element.checked = booleanVal;
            });
            m_allChecked = !m_allChecked;
        });
    }

    /**
     * 리스트 TR Tag를 감싸기
     * @param _col 하나의 Row 컬럼 정의부
     * @param _html TR Tag로 감쌀 HTML
     * @param aJax 데이터 인덱스
     */
    var __getTr =function(_html, _idx)
    {
        var retValue = '';
        var rowId    = '';
        if(_idx != undefined){
            //rowId = " id='row_idx" + _idx + "'";
        }

        retValue += "<tr" + rowId + " data-idx='" + _idx + "'>";
        retValue += _html;
        retValue += "</tr>";

        return retValue;
    }

    /**
     * 리스트 TD Tag를 감싸기
     * @param _col 하나의 Row 컬럼 정의부
     * @param _html TD Tag로 감쌀 HTML
     * @param value 표시할 데이터
     */
    var __getTd = function(_col,_html, _value)
    {
        var retValue = '';
        var rowId    = '';
        var condData = __getCondData(_col,_value,'td');


        var opt = __getAlign(_col);
            opt += __getDisplay(_col);
            opt += __getClass(_col,'td');
            opt += (condData['td-color'] == undefined)?"":condData['td-color'];

        retValue += "<td" + opt + ">"
        retValue += _html
        retValue += "</td>";

        return retValue;
    }
    /**
     * 데이터를 지정한 포맷형식으로 변환
     * @param _col 하나의 Row 컬럼 정의부
     * @param value 변경할 데이터
     */
    var __getDataFormat = function(_col, _value){

        var dataType   = _col.DATA_TYPE;
        var dataFormat = _col.DATA_FORMAT;


        if(dataType == undefined && dataFormat != undefined ){
            _value = __formatString(_value, dataFormat);
        }

        if(dataType != undefined){

            switch(dataType.toLowerCase())
            {
            case 'date':
                _value = __formatString(_value, 'XXXX-XX-XX');
                break;

            case 'number':
                if(_value == '') _value = 0;
                _value = __addComma(_value);
                break;
            }
        }

        return _value;
    }

    /**
     * 컬럼 정의부 조건에 의한 데이터 표시/스타일 지정
     * @param _col 하나의 Row 컬럼 정의부
     * @param value 변경할 데이터
     * @param _type 영역 type
     */
    var __getCondData = function(_col, _value, _type){

        var retValue = new Array();
        var style    = '';
        var enable   = '';

        var dataCond = _col.DATA_COND;

        if(dataCond == undefined) return retValue['data'] = _value;

        if(_type == undefined){
            //{ 'data'    :{'Y':'예' , 'N':'아니요'}
            for(var condType in dataCond){

                if(condType == 'td-color') continue;

                switch(condType){
                case 'data':
                    var conds = dataCond[condType];
                    for(var key in conds){
                        if(key == _value){
                            retValue['data'] = conds[key];
                            break;
                        }
                    }
                    if(retValue['data'] == undefined) retValue['data'] = _value;
                    break;

                case 'disabled':
                    var conds = dataCond[condType];
                    for(var key in conds){
                        if(key == _value){
                            retValue['disabled'] = (conds[key])?" disabled":"";
                            break;
                        }
                    }
                    break;

                case 'readonly':
                    var conds = dataCond[condType];
                    for(var key in conds){
                        if(key == _value){
                            retValue['disabled'] = (conds[key])?" readonly":"";
                            break;
                        }
                    }
                    break;


                default:
                    var conds = dataCond[condType];
                    for(var key in conds){
                        if(key == _value){
                            style += condType + ':' + conds[key] + ';';
                            break;
                        }
                    }
                    break;
                }
            }

            if(style != ''){
                retValue['ctrl-style'] = " style='" + style + "'";
            }
        }else{
            var conds = dataCond['td-color'];
            if(conds != undefined){

                for(var key in conds){
                    if(key == _value){
                        style += 'background-color'+ ':' + conds[key] + ';';
                        break;
                    }
                }
                if(style != ''){
                    retValue['td-color'] = " style='" + style + "'";
                }
            }
        }

        return retValue;
    }

    /**
     * TD 영역 컨트롤 그리기
     * @param _col 하나의 Row 컬럼 정의부
     * @param value 변경할 데이터
     * @param _type 영역 type
     */
    var __getControl = function(_col, _value, _idx, _totalGubun){

        var retValue = '';
        var id       = _col.ID;
        var ctrlText = _col.TITLE;
        var cbFunc   = _col.CTRL_FUNC;
        var tooltip  = _col.IS_TOOLTIP;
        var popover  = _col.IS_POPOVER;
        var dataType = _col.DATA_TYPE;
        var authAttr = _col.AUTH_ATTR;
        var ctrlId   = " id='" + __getCtrlId(_col) + "'";        
        var isShow   = true;
        
        if(authAttr != undefined){
            isShow = (g_NewPageAuth[authAttr])=='show'?true:false;    
        }
        
        
        var type = _col.TYPE;
        if(type != undefined) type = type.toLowerCase();

        if(_totalGubun != undefined && _totalGubun != '' && dataType != 'number'){
            //retValue += "<span>";
            retValue += (_totalGubun == 'GRAND_TOTAL')?'합계':'소계';
            //retValue += "</span>"; 
            return retValue; 
        }

        var orgData     = _value;
        var objCondData = __getCondData(_col, _value);
        var disabled    = (objCondData['disabled'] == undefined)?"":objCondData['disabled'];
        var opt = __getClass(_col);
            opt += (objCondData['ctrl-style'] == undefined)?"":objCondData['ctrl-style'];


        if(objCondData['data'] == undefined){
            _value = __getDataFormat(_col, _value);
        }
        else{
            _value = objCondData['data'];
        }

        switch(type)
        {
        case undefined:
        case '':
        case 'span':
        case 'indexnum':

            if(type == 'indexnum'){
                retValue += "<span "+ opt + ">";
                if(m_IdxSort == '' || m_IdxSort.toLowerCase() == 'desc'){
                    m_indexNum--;
                }else{
                    m_indexNum++;
                }
                retValue += m_indexNum;
                retValue += "</span>";
            }else{
            	var dataType = _col.DATA_TYPE;
                //retValue += "<span "+ opt + " data-orgdata='" + orgData + "' data-chgdata='" + orgData + "'>";
            	retValue += "<span "+ opt + " data-chgdata='" + orgData + "'>";
                
                if(tooltip != undefined){
                    if(_value == ''){
                        retValue += '<a rel="tooltip" data-placement="right" title="' + _value + '"></a>';
                    }else{
                        retValue += '<a rel="tooltip" data-placement="top" title="' + _value + '">Here</a>';    
                        //retValue += '<a class="memo-view" rel="tooltip" data-placement="right" title="' + _value + '">' + _value + '</a>';                    	
                    }                    
                }else if(popover != undefined){
                    if(_value == ''){
                        retValue += '<a rel="popover" data-toggle="popover" data-original-title="' + ctrlText + '" data-content="' + _value + '" data-placement="right"></a>';
                    }else{
                    	retValue += '<a rel="popover" data-toggle="popover" data-original-title="' + ctrlText + '" data-content="' + _value + '" data-placement="top">Here</a>';                    
                    }                    
                }
                else{
                	var dataType = _col.DATA_TYPE;
                	if(dataType == undefined || dataType != 'date'){
                		retValue += _value;	
                	}else{
                		retValue += _value.substring(2);
                	}
                    
                }
                retValue += "</span>";
            }

            break;

        case 'data_link':

            if((_totalGubun == undefined || _totalGubun == '') && isShow == true ){
                //retValue += "<a " + ctrlId + " " + CONS_STYLE_HAND + disabled + "> <span "+ opt + " data-orgdata='" + orgData + "' data-chgdata='" + orgData + "'>" + _value + "</span></a>";            
            	retValue += "<a " + ctrlId + " " + CONS_STYLE_HAND + disabled + "> <span "+ opt + " data-chgdata='" + orgData + "'>" + _value + "</span></a>";
            }else{
                //retValue += "<span "+ opt + " data-orgdata='" + orgData + "' data-chgdata='" + orgData + "'>" + _value + "</span>";                                
            	retValue += "<span "+ opt + " data-chgdata='" + orgData + "'>" + _value + "</span>";
            }
            
            break;

        case 'link':
            if(isShow == true){
            	retValue += "<span "+ opt + ">";
                retValue += "<a " + ctrlId + " " + CONS_STYLE_HAND + disabled + ">" + ctrlText + "</a>";
                retValue += "</span>";
            }else{
                retValue += "<span "+ opt + ">" + ctrlText + "</span>";
            }
            
            break;

        case 'all_check':
        case 'checkbox':
        case 'radio':
        	retValue += "<label class='checkbox'>";
            //retValue += "<input type='checkbox' " + ctrlId + opt + disabled +" value='" + _value + "' data-orgdata='" + orgData + "' data-chgdata='" + orgData + "'>"
        	retValue += "<input type='checkbox' " + ctrlId + opt + disabled +" value='" + _value + "' data-chgdata='" + orgData + "'>"
            retValue += "<span class='inp-check " + disabled + "'></span>";
            retValue += "</label>";
            break;


        default:
            //retValue += "<input type='" + type + "' " + ctrlId + opt + disabled + " value='" + _value + "' data-orgdata='" + orgData + "' data-chgdata='" + orgData + "'>"
        	retValue += "<input type='" + type + "' " + ctrlId + opt + disabled + " value='" + _value + "' data-chgdata='" + orgData + "'>"
            break;
        }

        //페이지마다 한번만 이벤트 등록
        if(_idx == 0 && cbFunc != undefined){

            __setCtrlEventHandler(_col);
        }

        return retValue;
    }

    var __getCtrlId = function(_col){

        var retValue = '';

        var id   = _col.ID;
        var type = _col.TYPE;

        if(type != undefined) type = type.toLowerCase();

        switch(type){
        case 'hidden':
            retValue = id;
            break;

        case 'link':
            retValue = 'td_llk_' + id;
            break;

        case 'button':
            retValue = 'td_btn_' + id;
            break;
        default:
            retValue = id;
            break;
        }
        return retValue;
    }

    var __getDefaultEventType = function(_controlType){
        var retValue = '';

        if(_controlType == undefined) _controlType = "";
        switch(_controlType)
        {
        case "":        
        case "link":
        case "data_link":            
        case "button":
            retValue = 'click';
            break;

        case "select":
            retValue = 'change';
            break;

        case "text":
            retValue = 'focusout';
            break;
        }

        return retValue;
    }


    var __setCtrlEventHandler = function(_col){
//        console.log('__setCtrlEventHandler');

        var cbFunc        = _col.CTRL_FUNC;
        var ctrlEventType = _col.CTRL_EVNT_TYPE;

        var id   = _col.ID;
        var type = _col.TYPE;


        if(type != undefined) type = type.toLowerCase();
        var colId = __getCtrlId(_col);
        var selector = m_divList + " " + "#" + m_tableID + " "  + "#" + m_tableID + "_body_" + m_curPage + " " + "#" + colId;
        //var selector = m_divList + " " + "#" + m_tableID + " "  + "#" + __getCtrlId(_col);
        var cntEvent     = 0; //이벤트 갯수
        var arrEventType = null;
        var arrEventFunc = null;

        if(m_pagingType == 'NUMBER'){
            var arrId = m_curPage + '_' + colId;
            if(m_arrPagingEvent[arrId] != undefined) return;
            m_arrPagingEvent[arrId] = true;
        }

        if(ctrlEventType == undefined || ctrlEventType.indexOf(",") == -1){//단일 이벤트 처리

            var eventType = __getDefaultEventType(type);

            if(ctrlEventType != undefined) eventType = ctrlEventType;

            arrEventType = new Array(eventType);
            arrEventFunc = new Array();
            arrEventFunc[eventType] = cbFunc;

            cntEvent = 1;
        }else{ //복수개 이벤트 처리

            arrEventType = ctrlEventType.split(',');
            arrEventFunc = cbFunc;
            cntEvent     = arrEventType.length;
        }


        for(var i=0; i< cntEvent; i++){

            var eventType = arrEventType[i];
            var eventFunc = arrEventFunc[eventType];
            
            $(document).off(eventType,selector).on(eventType, selector ,function(event){
            
                __setSelectedRow(this);

                //날짜 제한
                var text = $(this).text(); 
                if( text == '수정' || text == '삭제'){
                	if(cf_chkDateLimitList(this) == false) return;                
                }
                
                var funcType = typeof(eventFunc);
                if(funcType == 'function'){
                    eventFunc(event, this);
                }else{
                    if(eventFunc.indexOf(".") != -1){
                        eval(eventFunc + "(event, this)");
                    }else{
                        window[eventFunc](event, this);    
                    }                    
                }
            } );
        }
    }
    
    
    this.setSelectedRow = function(objElement){
        
        m_selectedRow = objElement;        
    }

    this.getSelectedRow = function(){
        
        return m_selectedRow;        
    }
    
    var __getSelectedRow = function(_selectedRow){
    	
    	var selectedRow = null;
    	
        if(_selectedRow == undefined){
            selectedRow = m_selectedRow;
        }else{
            selectedRow = _selectedRow;
        }    	
        
        return selectedRow;
    }

    var __setSelectedRow = function(objElement){

        m_selectedRow = $(objElement).closest('tr');
    }

    var __setModalScreen = function(){


        var html = '';
            html += '<div class="wrap">';
            html += '<div class="modal fade" id="divPopGridModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">';
            html += '    <div class="modal-header">';
            html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
            html += '        <h3 id="myModalLabel">상세보기</h3>';
            html += '    </div>';
            html += '    <div class="modal-body">';

            html += '<table>';

        $.each(m_colsInfo, function(idxCol , colInfo ){

            var title = colInfo.TITLE;
            var colId = colInfo.ID;

            var opt = '';
                opt += __getClass(colInfo, 'th');
                opt += __getDisplay(colInfo);

            if(colInfo.TYPE != undefined) opt += CONS_STYLE_DISP_NONE;

            html += '<tr ' + opt + '>';
            html += '  <th>';
            html +=        colInfo.TITLE;
            html += '  </th>';
            html += '  <td>';
            html +=        __getColData(colId, m_selectedRow, false);
            html += '  </td>';
            html += '</tr>';
        });
        html += '</table>';

        html += '    </div>';
        html += '    <div class="modal-footer">';
        html += '        <input type="button" class="btn clsClose" data-dismiss="modal" id="btnClose" aria-hidden="true" value="닫기"/>';
        html += '    </div>';
        html += '</div>';
        html += '</div>';
        //var selector = m_divList + ' ' + '#divGridModalArea';
        $('.modal-wrap').html(html);
    }

    this.modal = function(){

        //__drawModalArea();
        __setModalScreen();

        var selector = "#divModal" + " " + "#divPopGridModal";
        $(selector).modal("toggle");
    }

    var __getDisplay = function(_col)
    {
        var retValue  = '';

        var title     = _col.TITLE;
        var isDisplay = _col.IS_DISPLAY;
        var type      = _col.TYPE;
        if(type != undefined) type = type.toLowerCase();

        if(title == undefined){
            if(type != 'all_check') retValue = CONS_STYLE_DISP_NONE;
        }
        if(isDisplay == false){
            retValue = CONS_STYLE_DISP_NONE;
        }
        if(type == "hidden"){
            retValue = CONS_STYLE_DISP_NONE;
        }
        return retValue;
    }

    var __getClass = function(_col, tagType){

        var retValue = '';
        var strClass = '';
        var type     = _col.TYPE;

        if(type != undefined) type = type.toLowerCase();

        if(tagType == 'th'){
            strClass = (_col.TH_CLASS==undefined)?"":_col.TH_CLASS;
        }else if(tagType == 'td') {
            strClass = (_col.TD_CLASS==undefined)?"":_col.TD_CLASS;
        }
        else{
            strClass = (_col.CTRL_CLASS==undefined)?"":_col.CTRL_CLASS;

            if(type == "all_check"){
                strClass += ' toggleCheck';
            }
        }

        if(strClass != ''){
            retValue += ' class="' + strClass + '"';
        }

        return retValue;
    }

    var __getAlign = function(_col){

        var retValue = '';

        var dataType = _col.DATA_TYPE;
            dataType = (dataType == undefined)?"":dataType.toLowerCase();

        var type = _col.TYPE;
            type = (type == undefined)?"":type.toLowerCase();

        var align = _col.ALIGN;
            align = (align == undefined)?"":align.toLowerCase();

        if(align == ''){
            if(dataType == 'number'){
                retValue = ' style="text-align:right;"';
            }else if(dataType == 'date'){
                retValue = ' style="text-align:center;"';
            }
        }else{
            retValue = ' style="text-align:' + align + '";';
        }

        if(type == 'all_check'){
            retValue = ' style="text-align:center;"';
        }

        return retValue;
    }



    var __formatString = function(strSrc,strFormat)
    {
        var    retValue = "";
        var    j =    0;

        var    strSrc = strSrc.replace(/(\$|\^|\*|\(|\)|\+|\.|\?|\\|\{|\}|\||\[|\]|\-|\/|\:)/g, "");

        for    (var i=0; i< strSrc.length;    i++)
        {
            retValue +=    strSrc.charAt(i);
            j++;

            if ( (j    < strSrc.length    && j < strFormat.length)
                  && (strFormat.charAt(j) != "Y"
                  && strFormat.charAt(j) != "M"
                  && strFormat.charAt(j) != "D"
                  && strFormat.charAt(j) != "9"
                  && strFormat.charAt(j).toLowerCase() !=    "x"
                  && strFormat.charAt(j) !=    "#")  )
            {
                retValue +=    strFormat.charAt(j++);
            }
        }
        return retValue;
    }

    var __addComma = function(val){

        var reg = /(^[+-]?\d+)(\d{3})/;
        val +="";
        while (reg.test(val))
        {
            val = val.replace(reg,"$1"+","+"$2");
        }
        return val;
    }

    var __getColIdx = function(_id){

        var retValue = '';

        $(m_colsInfo).each(function(idx ,colInfo){

            if(colInfo.ID == _id){
                retValue= idx.toString();
                return false;
            }
        });

        return retValue;
    }


    var __getColData = function(_id, _selectedRow, _isOrgData){

        var retValue = '';

        var idx = __getColIdx(_id, m_colsInfo);

        if(idx == '') return retValue;
        
        var selectedRow = __getSelectedRow(_selectedRow);

        var objElement = $('td:eq('+idx+')',selectedRow).find(':input');
        
        if(objElement.length > 0){
            if(_isOrgData == undefined || _isOrgData == false){
                retValue = objElement.attr('data-chgdata');
            }else{
                retValue = objElement.attr('data-orgdata');
            }
        }else{
            if(_isOrgData == undefined || _isOrgData == false){
                retValue = $('td:eq('+idx+')',selectedRow).find('span').attr('data-chgdata');
            }else{
                retValue = $('td:eq('+idx+')',selectedRow).find('span').attr('data-orgdata');
            }
        }

        return retValue;
    }

    this.getColTd = function(_id, _selectedRow){

        var idx = __getColIdx(_id, m_colsInfo);

        if(idx == '') return retValue;
        
        var selectedRow = __getSelectedRow(_selectedRow);        

        return  $('td:eq('+idx+')',selectedRow);
    }
    
    this.getColOrgData = function(_id, _selectedRow){

        return __getColData(_id, _selectedRow, true);
    }

    this.getColData = function(_id, _selectedRow){

        return __getColData(_id, _selectedRow, false);
    }
    
    this.getColTotal = function(_id){
        
        var retValue = 0;
        var selector = m_divList + " " + "#" + m_tableID + " " + " tr";
        var trElements = $(selector);
        
        for(var i=1,cnt = trElements.length ; i< cnt; i++){
            
            var value = __getColData(_id, trElements[i], false);

            value = (value == undefined || value == '' )?0: Number(value)                    
            retValue += value;
        }
        return retValue;
    }

    
    
    this.getColDataByAllRow = function(_id){
        var retValue = new Array();
        var selector = m_divList + " " + "#" + m_tableID + " " + " tr";
        var trElements = $(selector);
        
        for(var i=1,cnt = trElements.length ; i< cnt; i++){
            var value = __getColData(_id, trElements[i], false);
            if(value != '') retValue.push(value);            
        }
//        $.each(trElements, function(idx, trElement){
//            var value = __getColData(_id, trElement, false);
//            if(value != '') retValue.push(value);
//        });
        
        return retValue;
    }
    
    this.getRowData = function(_selectedRow){
        
        return __getRowData(_selectedRow);
    }
    
    var __getRowData = function(_selectedRow){
    	
        var retValue = {};
        
        var selectedRow = __getSelectedRow(_selectedRow);        

//        return m_jsonData[$(selectedRow).attr('data-idx')];
        
//        for(var i=0; i < m_colsInfo.length; i++){
//        	var colInfo = m_colsInfo[i];
//        	
//        	retValue[colInfo.ID] =  __getColData(colInfo.ID, selectedRow, false);
//        }
        $(m_colsInfo).each(function(idx ,colInfo){
            
            //if(colInfo.TYPE.toLowerCase() != 'link')
            retValue[colInfo.ID] =  __getColData(colInfo.ID, selectedRow, false);
        });

        return retValue;
    }
    
    var  __getJsonRowData = function(_selectedRow){
    	
        var selectedRow = __getSelectedRow(_selectedRow);
        
        var idx = $(selectedRow).attr('data-idx');
        
        if(idx == undefined) return null;

        return m_jsonData[idx];    
    }
    
    this.getJsonRowData = function(_selectedRow){
    	return __getJsonRowData(_selectedRow);
    }    

    
    this.getCheckedRowData = function(){
        
        var retValue = new Array();
            
        var selector = m_divList + " " + "#" + m_tableID + " " + ".toggleCheck:checked"         
        var elements = $(selector);
        
        $.each(elements, function(idx,element){
            
            var trEelement = $(element).closest('tr');
            
            //retValue.push(__getRowData(trEelement));            
            retValue.push(__getJsonRowData(trEelement));            
        });
        
        return retValue; 
    }
    
    this.getCheckedRow = function(){
        
        var retValue = new Array();
            
        var selector = m_divList + " " + "#" + m_tableID + " " + ".toggleCheck:checked"         
        var elements = $(selector);
        
        $.each(elements, function(idx,element){
            
            var trEelement = $(element).closest('tr');
            retValue.push(trEelement);
        });
        
        return retValue; 
    }    
    
    
    this.setTrColor = function(_color, _trElement){

        var selectedRow = __getSelectedRow(_trElement);        
        
        var backColorSelector = 'td[style^=background-color]';
        var cnt = $(backColorSelector, selectedRow).length;

        if(cnt == 0){//TD에 배경색상이없을 경우
            $(selectedRow).css("background-color", _color);
        }else{       //TD에 배경색상이 존재할 경우 존재하는 TD를 제외한 나머지 적용
            $(selectedRow).not(backColorSelector).css("background-color", _color);
        }
    }


    this.getTotalCount = function(){

        return m_totalCnt;
    }


    this.getCheckedValue = function(){
        var retValue = new Array();

        var checkedElement = $(m_divList + " [type=checkbox]:checked");
        $.each(checkedElement, function(idx, element){
            var value = element.value();
            retValue.push(value);
        });

        return retValue;
    }


    
    this.delRow = function(_rowElement){

        if(_rowElement == undefined){
            m_selectedRow.hide();
        }else{
            $(_rowElement).hide();

        }
    }

    this.isHideRow = function(_rowElement){

        var retValue = false;

        if(_rowElement == undefined){
            retValue = m_selectedRow.is('[style*="display:"]')
        }else{
            retValue = $(_rowElement).is('[style*="display:"]')
        }
        return retValue;
    }

    this.setCaption = function(_html, _align){
        m_caption = _html;
        m_captionAlign = _align;
    }

    var __setCaption = function()
    {
        if(m_caption == undefined) return;

        var selector = m_divList + " " + "#tb_cap_" + m_tableID;
        $(selector).html(m_caption);
        if(m_captionAlign != undefined){
            $(selector).css('text-align', m_captionAlign);
        }

    }

    this.getTd = function(_id, _selectedRow){

        var idx = __getColIdx(_id, m_colsInfo);

        if(idx == '') return retValue;
        
        var selectedRow = __getSelectedRow(_selectedRow);   

        return $('td:eq('+idx+')',selectedRow);
    }

    this.setColHtml = function(_id, _value, _selectedRow){
        __setColHtml(_id, _value, _selectedRow);
    }
    
    var __setColHtml = function(_id, _value, _selectedRow){
    	
        var idx = __getColIdx(_id, m_colsInfo);

        if(idx == '') return;
        
        var selectedRow = __getSelectedRow(_selectedRow);
        
        var objElement = $('td:eq('+idx+')',selectedRow).find(':input');
        if(objElement.length > 0){
            objElement.html(_value);            
        }else{
        	 var td = $('td:eq('+idx+')',selectedRow).find('span');
        	 if(td.length == 0){
        		 $('td:eq('+idx+')',selectedRow).find('span').html('<span>' + _value + '</span>');
        	 }else{
        		 $('td:eq('+idx+')',selectedRow).find('span').html(_value);	 
        	 }
            
        }        
    }
    
    this.setColData = function(_id, _dispValue, _setValue, _selectedRow){

        var idx = __getColIdx(_id, m_colsInfo);

        if(idx == '') return;
        
        var selectedRow = __getSelectedRow(_selectedRow);
        
        if(_setValue == undefined){
            _setValue = _dispValue;
        }

        var objElement = $('td:eq('+idx+')',selectedRow).find(':input');
        if(objElement.length > 0){
            //objElement.html(_dispValue);
            objElement.val(_dispValue);
            objElement.attr('data-chgdata', _setValue);
            
        }else{             
            $('td:eq('+idx+')',selectedRow).find('span').html(_dispValue);
            $('td:eq('+idx+')',selectedRow).find('span').attr('data-chgdata', _setValue);
        }
        __getJsonRowData(selectedRow)[_id] = _setValue;
    } 

    var __rowSpan = function(){
    	
        if(arguments instanceof Object){
            arguments =  arguments[0];
        }
        var tableElt    = document.querySelector(m_divList + " " + "#" + m_tableID);
        var cntArg      = arguments.length;
        var rows        = tableElt.getElementsByTagName("TR");
        var cntRows     = rows.length;
        var arrPrevious = new Array(cntArg);
        var arrCompare  = new Array(cntArg);
        var arrCompare  = new Array(cntArg);
        var arrPreCol   = new Array(cntArg);
        var arrCurCol   = new Array(cntArg);
        var arrColumnNo = new Array(cntArg);

        for(var idx = 0; idx < cntArg;idx++)
        {
            arrPrevious[idx] = -1;
            arrColumnNo[idx] = arguments[idx];
        }

        for (var i = 1; i < cntRows; i++) {
            for(var cols = 0; cols < cntArg; cols++)
            {
                arrCompare[cols] = (arrPrevious[cols] < 0) ? (i - 1) : arrPrevious[cols];
                arrPreCol[cols] = rows[ arrCompare[cols] ].getElementsByTagName("TD")[arrColumnNo[cols]];
                arrCurCol[cols] = rows[i].getElementsByTagName("TD")[arrColumnNo[cols]];

                if ((arrPreCol[cols] != undefined && arrCurCol[cols] != undefined) 
                        && (arrPreCol[cols].innerHTML == arrCurCol[cols].innerHTML)
                        && (arrPreCol[cols].style.display != 'none'                        
                        && $(arrPreCol[cols]).text() != '소계')
                        ){
                    arrPreCol[cols].rowSpan = arrPreCol[cols].rowSpan + 1;
                    arrCurCol[cols].style.display = 'none';
                    arrPrevious[cols] = arrCompare[cols];
                }else{
                    arrPrevious[cols] = -1;
                }
            }
        }        
    }

    this.rowSpan = function(){
        __rowSpan(arguments);
    }
    
    var __colSpan= function()
    {
        if(arguments instanceof Object){
            arguments =  arguments[0];
        }
        
        var element = document.querySelector(m_divList + " " + "#" + m_tableID);
        var arrCols = new Array();
        var cntArg  = arguments.length;        
        var rows    = element.getElementsByTagName('TR');
        
        for(var idx = 0; idx < cntArg; idx++){
            var rowIdx = arguments[idx];
            var cols = rows[rowIdx].getElementsByTagName('TH');        
            if (cols.length == 0) {
                cols = rows[rowIdx].getElementsByTagName('TD');
            }
            arrCols.push(cols);
        }
        
        for(var idxRows = 0, cntRow = arrCols.length; idxRows < cntRow; idxRows++){
            
            var previous = -1;
            var compare  = -1;            
            var cols = arrCols[idxRows];
            
            for ( var idx = 1, cnt = cols.length; idx < cnt; idx++) {
                compare = (previous < 0) ? (idx - 1) : previous;
    
                var preCol = cols[compare];
                var curCol = cols[idx];
    
                if ((preCol != undefined && curCol != undefined)
                        && (preCol.innerHTML == curCol.innerHTML) && preCol.style.display != 'none') { // 이전 컬럼과 현재 컬럼에 TD가 존재하고 
                    // 동일한 값일 경우 colSpan 처리
                    preCol.colSpan += 1;
                    curCol.style.display = 'none';
                    previous = compare;
                } else { //값이 변경되었을 경우
                    previous = -1;
                }
            }
        }
    }
    
    this.colSpan = function(){
        __colSpan(arguments);
    }
    
    this.colSpan2Total= function()
    {
        __colSpan2Total(arguments);
    }
    
    this.addRow = function(){
        
        var html = '';
        
        html += "<tr>";
        $.each(m_colsInfo, function(idxCol , colInfo ){
        var opt = __getDisplay(colInfo);        
            opt += __getClass(colInfo, 'td');
            opt += __getAlign(colInfo);
            
            html += "<td" + opt + ">"
            html += "    <span>"
            html += "    </span>";            
            html += "</td>";
        });
        html += "</tr>";
        
        //$(m_divList + " " + "#" + m_tableID + '_body_1').append(html);
        document.querySelector(m_divList + " " + "#" + m_tableID/* + '_body_1'*/).innerHTML += html;
        
        var tblBody         = $(m_divList + " " + "#" + m_tableID/* + '_body_1'*/);
        var trTotalElement  = tblBody.find('tr:last');
        var tdTotalElements = $('td', trTotalElement);        
        var trHeadElement   = tblBody.find('tr:first');
        var tdHeadElements  = $('td', trHeadElement);
        
        for(var i=0, cnt = tdHeadElements.length; i < cnt; i++){
        	
            var tdHeadElement  = $(tdHeadElements[i]);
            var tdTotalElement = $(tdTotalElements[i]);
            
            if(tdHeadElement.prop("style").display != 'none'){
                tdTotalElement.show();
            }else{
                tdTotalElement.hide();
            }
        }
        return trTotalElement;        
    }
    
    this.showCol = function(_id, _isShow){

        var idx = __getColIdx(_id, m_colsInfo);
        if(idx == '') return;
        
        var trElements = $(m_divList + " " + "#" + m_tableID + ' ' + 'tr');        
        for(var i=0,cnt = trElements.length ; i< cnt; i++){
        	
            var trElement = trElements[i];
            if(_isShow == true){
                $('td', trElement).eq(idx).show();
                $('th', trElement).eq(idx).show();
            }else{
                $('td', trElement).eq(idx).hide();
                $('th', trElement).eq(idx).hide();                
             }            
        }       
    }
    
    var __showCol = function(_id, _isShow){
    	
    }
    this.disabled = function(_id, _isDisabled, _selectedRow){
    	var selectedRow = __getSelectedRow(_selectedRow);
    	
    	var tdElement = this.getTd(_id);
    	
    	var element   = tdElement.find('[type=checkbox],[type=radio]');
    		element.prop("disabled", _isDisabled);
    		
    	var type       = element.attr('type');
    	
    	if(type != 'checkbox' && type != 'radio') return;
    	
    	if(type == 'checkbox')   spnControl = element.siblings('span.inp-check').eq(0);
    	else if(type == 'radio') spnControl = element.siblings('span.inp-radio').eq(0);
    	
    	if(_isDisabled == true) spnControl.addClass('disabled');
    	else spnControl.removeClass('disabled'); 
    }
    __emptyTable();
}