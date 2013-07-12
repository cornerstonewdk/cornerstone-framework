//중복 Row 제거를 위해 리스트의 유니크 한 키값을 담는 변수
var listKeyValues = '';

/**
 * 화면에 리스트를 그린다
 * @param jsonS ajax로 받아온 json형태의 리스트 값
 * @param colInfo 리스트에 뿌려질 필드 정보
 * @param obj 검색조건,ajax통신시 필요한 양식(사용자지정함수에 있음)
 */
function cf_setGridList(jsonS,colInfo,obj){
    var str_html        = '';
    var color_val       = '';
    var input_type      = '';
    var sort_val        = '';
    var event_val       = '';
    var eleClass_val    = '';
    var eventStyle      = '';
    var listObj         = obj.LISTSECTION;
    var moreObj         = obj.DATALOCATION;
    var paging          = obj.PAGING;
    var viewType        = obj.VIEWTYPE;
    var totalCount      = obj.TITALCOUNT;
    var maxCnt          = obj.MAXCNT;
    var limitpage       = obj.LIMITPAGE;
    var listDiv         = obj.LISTDIV;
    var pagingType      = obj.PAGINGTYPE;
    var fnname          = obj.RELOADFN;
    
    
    var clsMoreObj = 'moreView';
    var moreParent = '';
    if(moreObj.indexOf(" ") == -1)
    {
        moreObj = "#" + moreObj;
    }
    else
    {
        moreParent = moreObj.substring(0,moreObj.indexOf(" "));
    }

    
    if(listDiv.indexOf("#") == -1){
        console.error("obj.LISTDIV - #divXxxFront #Div테이블영역명 변경 필요!!");
        listDiv = "#" + listDiv;
    }
    var nowPageNum = $(moreObj).data('obj');

    // get index number ST
    var nowPage =  $(moreObj).data('obj');
    var indexNum = totalCount - ((nowPage - 1)*maxCnt)+1;
    // get index number ED

    if($.trim(paging) == ''){
        paging = 'Y';
    }
    if(viewType == 'DETAIL'){ //상세보기
        //필드 생성ST
        var titleStr = '';
        var trStr = '';
        titleStr = '<table id="'+listObj+'"><tbody>';
        $(colInfo).each(function(index,ele){
            trStr += '<tr>';
            trStr += '<th><span>'+ele.TITLEID+'</span></th>';
            trStr += '<td><span class="'+ele.ID+'"></span></td>';
            trStr += '</tr>';
        });
        titleStr +='</tbody>'+trStr+'</table>';
        $(listDiv).append(titleStr);
        //필드 생성ED

        //더보기 리스트 뿌리기ST
        $.each(jsonS, function( index , entry ) {
            $(colInfo).each(function(index,ele){
                var keyNM = ele.ID;
                var strVal = eval('entry.'+keyNM);
                $('.'+keyNM).html(strVal);
            });
        });
        //더보기 리스트 뿌리기ED
    }else{ //일반 리스트

        //필드 생성(리스트 제목)ST
        if($('#'+listObj).length == 0){
            var titleStr = '';
            var titleClass = '';
            var titleStyle = '';
            var arrTitleClass = new Array();
            var arrTitleFunc = new Array();
            titleStr = '<table id="'+listObj+'" class="table-type2">';
            titleStr += '<thead id="'+listObj+'_head"><tr>';
            $(colInfo).each(function(index,ele){
                //제목에 이벤트를 주기위한 사용자 지정 클레스명 설정 ST.
                if(ele.TITLECLASS == '' || ele.TITLECLASS == undefined){
                    titleClass = '';
                    titleStyle = '';
                }else{
                    //클레스 네임 배열에 추가ST
                    arrTitleClass.push(ele.TITLECLASS);
                    //클레스 네임 배열에 추가ED

                    //사용자 정의 이벤트 함수 배열에 추가ST
                    arrTitleFunc.push(ele.TITLEFUNC);
                    //사용자 정의 이벤트 함수 배열에 추가ED

                    titleClass =ele.TITLECLASS;

                    titleStyle = 'style="cursor:pointer"'; //hand cursor
                }
                //제목에 이벤트를 주기위한 사용자 지정 클레스명 설정 ED.
                if(ele.TYPE == 'HIDDEN' || ele.TYPE == 'KEY' || ele.TYPE == 'BACKCR'){
                }else{
                    titleStr +='<th class="'+titleClass+'" '+titleStyle+'><span>'+ele.TITLEID+'</span></th>';
                }
            });
            titleStr += '</tr></thead>';
            titleStr += '</table>';
            $(listDiv).append(titleStr);

            //제목에 이벤트 함수 걸어주기.ST
            for(var i = 0; i < arrTitleClass.length; i++){
                $('.'+arrTitleClass[i],'table[id="'+listObj+'"]').on('click',arrTitleFunc[i]);
            }
            //제목에 이벤트 함수 걸어주기.ED
        }
        //필드 생성(리스트 제목)ED

        if(jsonS == '' || jsonS == undefined){
            //리스트가 없을경우
                if($('tbody','#'+listObj).length == 0){
                    var tdLength = $('th','#'+listObj+'_head').length;
                    str_html = '<tbody id="noData"><tr><td colspan="'+tdLength+'" style="text-align:center;">No Data!!!</td></tr></tbody>';
                    $("#"+listObj).append(str_html);
                }
            return;
        }

        var tbodyCnt = $('#'+listObj).find('tbody').length+1;

        var tbodyObj = listObj+'_tbody_'+tbodyCnt;
        var button = new Array();
        var func = new Array();

        var eventfunc = new Array();
        var eventtype = new Array();
        var eventclass = new Array();

        $.each(jsonS, function( index , entry ) {
            var idx_row = index;
            var listView = 'Y';
            var dumpHtml = '';
            dumpHtml+='<tr id="row_idx'+idx_row+'">';


            $(colInfo).each(function(index,ele){

                if(idx_row == 0)
                {
                    if(ele.BTNCLASS != undefined){
                        button.push(ele.BTNCLASS);
                    }

                    if(ele.FUNC != undefined){
                        func.push(ele.FUNC);
                    }

                    if(ele.EVENTFUNC != undefined){
                        eventfunc.push(ele.EVENTFUNC);
                    }

                    if(ele.EVENTTYPE != undefined){
                        eventtype.push(ele.EVENTTYPE);
                    }

                    if(ele.EVENTCLASS != undefined){
                        eventclass.push(ele.EVENTCLASS);
                    }
                }
                
                var keyNM = ele.ID;

                if(ele.COLOR == undefined || ele.COLOR == null){
                    color_val = 'F_BLACK';
                }else{
                    color_val = ele.COLOR;
                }

                if(ele.SORT == undefined || ele.SORT == null){
                    sort_val = 'F_CENTER';
                }else{
                    sort_val = ele.SORT;
                }

                if(ele.EVENTCLASS == undefined || ele.EVENTCLASS == null){
                    event_val = '';
                    eventStyle = '';
                }else{
                    event_val = ele.EVENTCLASS;
                    eventStyle = 'style="cursor:pointer"'; //hand cursor
                }

                if(ele.ELECLASS == undefined || ele.ELECLASS == null){
                    eleClass_val = '';
                }else{
                    eleClass_val = ele.ELECLASS;
                }

                //중복 Row 추출 ST
//                if(ele.TYPE == 'KEY' && listKeyValues.indexOf(' '+eval('entry.'+keyNM)+',') > -1){
//                    listView = 'N';
//                }
                //중복 Row 추출 ED

                //td color 적용 ST
                var tdCr = '';
                if(ele.COLORTYPE == undefined || ele.COLORTYPE == null || ele.COLORID == undefined || ele.COLORID == null){
                    tdCr = '';
                }else{
                    var tempFid = ele.COLORID;
                    var tempCr = '';
                    tempCr = eval('entry.'+tempFid);
                    tdCr = 'style="background:'+tempCr+';"';
                }
                //td color 적용 ED
                
                var tdStyle = '';
                if(ele.TYPE == undefined || ele.TYPE == null){
                    tdStyle = '<td class="'+sort_val+' '+event_val+'" '+tdCr+'>';
                    input_type = '<span class="'+color_val+'">'+eval('entry.'+keyNM)+'</span>';
                }else if(ele.TYPE == 'TEXT'){
                    tdStyle = '<td class="'+sort_val+' '+event_val+'" '+tdCr+'>';
                    input_type = '<input class="'+eleClass_val+'" type="text" value="'+eval('entry.'+keyNM)+'"/>';
                }else if(ele.TYPE == 'CHECK'){
                    tdStyle = '<td class="'+sort_val+' '+event_val+'" '+tdCr+'>';
                    input_type = '<input class="'+eleClass_val+'" type="checkbox" style="left:10px" id="chk_'+eval('entry.'+keyNM)+'" value="'+eval('entry.'+keyNM)+'"/>';
                    input_type += '<label style="width:25px" for="chk_'+eval('entry.'+keyNM)+'"/></label>';
                }else if(ele.TYPE == 'RADIO'){
                    tdStyle = '<td class="'+sort_val+' '+event_val+'" '+tdCr+'>';
                    input_type = '<input class="'+eleClass_val+'" type="radio" value="'+eval('entry.'+keyNM)+'"/>';
                }else if(ele.TYPE == 'HIDDEN'){
                    tdStyle = '<td style="display:none;">';
                    input_type = '<input id="'+keyNM+'" class="'+eleClass_val+'" type="hidden" value="'+eval('entry.'+keyNM)+'"/>';
                }else if(ele.TYPE == 'LINK'){
                    var btnText = '';
                    var btnClass = '';
                    var btnimg_val = '';
                    tdStyle = '<td class="'+sort_val+' '+event_val+'" '+tdCr+'>';
                    if(ele.BTNTEXT == undefined || ele.BTNTEXT == null){
                        btnText = 'NoName';
                    }else{
                        btnText = ele.BTNTEXT;
                    }

                    if(ele.BTNCLASS == undefined || ele.BTNCLASS == null || ele.BTNCLASS == ''){
                        btnClass = 'notClass';
                    }else{
                        btnClass = ele.BTNCLASS;
                    }

                    if(ele.BTNIMGCLASS == undefined || ele.BTNIMGCLASS == null){
                        btnimg_val = 'btnClass';
                    }else{
                        btnimg_val = ele.BTNIMGCLASS;
                    }
                    input_type = '<input type="button" data-mini="true" data-idx='+idx_row+' class="'+btnClass+' '+btnimg_val+'" value="'+btnText+'"/>';
                }else if(ele.TYPE == 'INDEXNUM'){
                    indexNum = indexNum - 1;
                    tdStyle = '<td class="'+sort_val+' '+event_val+'" '+tdCr+'>';
                    input_type = '<span class="'+color_val+'">'+indexNum+'</span>';
                }else if(ele.TYPE == 'KEY'){
                    listKeyValues = ' '+eval('entry.'+keyNM)+','+listKeyValues;
                }else{
                    tdStyle = '<td class="'+sort_val+' '+event_val+'" '+eventStyle+' '+tdCr+'>';
                    input_type = '<span class="'+color_val+'">'+eval('entry.'+keyNM)+'</span>';
                }
                dumpHtml+=tdStyle+input_type+'</td>';
            });
            dumpHtml+="</tr>";

            if(listView == 'N'){
                dumpHtml = '';
            }
            str_html+=dumpHtml;
        });
        str_html = '<tbody id="'+tbodyObj+'">'+str_html+'</tbody>';
        $("#"+listObj).append(str_html);

        //중복 Row 제거후 Row 갯수가 0일경우 페이지 +1 후에 리스트 함수 제호출.ST
//        var rowCnt = '';
//        rowCnt = $('tr', '#'+tbodyObj).length;
//        if(rowCnt <= 0){
//            var DataVal = eval(nowPageNum + 1);
//            $('#'+moreObj).data('obj',DataVal);
//            window[fnname](jsonS);
//            return;
//        }
        //중복 Row 제거후 Row 갯수가 0일경우 페이지 +1 후에 리스트 함수 제호출.ED

        //이벤트 버튼 속성 항목에 메서드 등록(리스트에 버튼 이벤트) ST
        try{
            for(var i = 0; i < button.length; i++){
                $('.'+button[i], 'tbody[id="'+tbodyObj + '"]').click(func[i]);
            }
        }catch(e){
            console.error('버튼에 대한 클래스 명이 지정되지 않았습니다 BTNCLASS 변수에 클래스 명을 지정해주세요.');
        }

        //이벤트 버튼 속성 항목에 메서드 등록(리스트에 버튼 이벤트) ED

        //리스트 항목에 메서드 등록(버튼X 일반 텍스트)ST
        try{
            for(var i = 0; i < eventfunc.length; i++){
                $('.'+eventclass[i],'tbody[id="'+tbodyObj + '"]').on(eventtype[i],eventfunc[i]);
            }
        }catch(e){
        }
        //리스트 항목에 메서드 등록(버튼X 일반 텍스트)ED

        if(paging == 'Y'){
            var nowPage         = nowPageNum;
            var nowBlock    = Math.ceil(nowPage/limitpage); //현재 페이지 블럭
            var startPage    = (nowBlock-1)*limitpage+1; //현재 페이지 블럭의 시작 페이지
            var endPage        = startPage + limitpage - 1; // 현재 페이지 블럭의 마지막 페이지
            var totalPage    = Math.ceil(totalCount/maxCnt); // 총 페이지수
            if(pagingType == 'NUMBER'){
                // get Paging Index ST
                if(endPage > totalPage){
                    endPage = totalPage;
                }

                var preView = '';
                var prePage = '';
                if(nowBlock <= 1){
                    preView = '';
                    prePage = 1;
                }else{
                    prePage = startPage - 1;
                    //preView = '<span class=\''+moreObj+'\' data-page="'+prePage+'">[prev]</span>';
                    preView = '<span class="clsMoreObj" data-page="'+prePage+'">[prev]</span>';
                }

                var nextView = '';
                var nextPage = '';
                var endBlock = Math.ceil(totalPage/limitpage); //마지막 블럭
                if(nowBlock >= endBlock){
                    nextView = '';
                    nextPage = endPage;
                }else{
                    nextPage = endPage + 1;
                    //nextView = '<span class=\''+moreObj+'\' data-page="'+nextPage+'">[next]</span>';
                    nextView = '<span class="clsMoreObj" data-page="'+nextPage+'">[next]</span>';
                    
                }

                var pagingNum = '';
                for(var i = startPage; i <= endPage; i++){
                    if(pagingNum == ''){
                        //pagingNum =    '<span class=\''+moreObj+'\' data-page="'+i+'">'+i+'</span>';
                        pagingNum =    '<span class="clsMoreObj" data-page="'+i+'">'+i+'</span>';
                    }else{
                        //pagingNum = pagingNum+'|<span class=\''+moreObj+'\' data-page="'+i+'">'+i+'</span>';
                        pagingNum = pagingNum+'|<span class="clsMoreObj" data-page="'+i+'">'+i+'</span>';
                    }

                }
                var totalPagingStr = "<div style='text-align:center'>"+preView+' '+pagingNum+' '+nextView;
                $(moreObj).html(totalPagingStr);

                //$('.'+moreObj).click(function(){
                $(moreParent + ' .clsMoreObj').click(function(event){
                    var pagenum = $(this).data('page');
                    cf_ResetList(listObj);
                    $(moreObj).data('obj',pagenum);
                    //window[fnname](jsonS);
                    __doFunction(fnname);
                    event.preventDefault();
                });
                // get Paging Index ED
            }else if(pagingType == 'BUTTON'){
                // paging button event ST
                //var moreBtnObj = moreObj+'_btn';
                //var moreBtnObj = moreObj+'_btn';
                var moreBtnObj = "btnMore";
                var moreViewBtn = '<input type="submit" name="'+moreBtnObj+'" id="'+moreBtnObj+'" value="More" style="width:100%"/>';                
                $(moreObj).html(moreViewBtn);

                if(pagingType == 'BUTTON'){ //더보기 페이징 일경우 더보기 버튼에 포커스 주기
                    $(moreBtnObj).focus();
                }

                var pageNum = '';
                $(moreBtnObj).click(function(){
                    var Data_Val =  nowPageNum;
                    if(Data_Val == ''|| Data_Val < 1){
                        pageNum = 1;
                    }else{
                        pageNum = Data_Val;
                    }
                    //다음 페이지 이동
                    Data_Val = eval(pageNum + 1);
                    $(moreObj).data('obj',Data_Val);
                    window[fnname](jsonS);

                });
                // paging button event ED
            }else{
                //scroll Paging ST

                //가장 마지막 페이지 일경우 마지막 tr의 RowNumber 가 1일아닐경우 리스트가 삭제된경우임..
                //따라서 1이 아닐경우 변경 알림 메세지 출력을 위한 작업 ST
                if(totalPage == nowPageNum){
                    var indexNumID = '';
                    $(colInfo).each(function(key,val){
                        if(val.TYPE == 'INDEXNUM'){
                            indexNumID = $.trim(val.ID);
                            return false;
                        }
                    });
                    if(indexNumID != ''){
                        var trNode = $('#tbList_tbody_'+nowPageNum+' tr:last');
                        var eqVal = cf_getColIdx(indexNumID,colInfo);
                        //console.log(eqVal);
                        var rowNum = $.trim($('td:eq('+eqVal+')',trNode).text());
                        //console.log(rowNum);
                        if(rowNum != 1){
                            alert('검색중 변경 또는 삭제된 항목이 존재합니다.');
                        }
                    }
                }
                //가장 마지막 페이지 일경우 마지막 tr의 RowNumber 가 1일아닐경우 리스트가 삭제된경우임..
                //따라서 1이 아닐경우 변경 알림 메세지 출력을 위한 작업 ED

                //scroll Paging ED
            }
        }
    }
}

/**
 * 리스트 초기화
 * @param objID 리스트가 그려지는 영역(tbody 단위로 그려지는 리스트를 초기화(삭제)하기위에 상단의 리스트 영역 아이디를 필요로함)
 */
function cf_ResetList(objID){
    if(objID.indexOf("#") == -1) objID = '#'+objID;
    
    var listDiv = $(objID);
    $('tbody',listDiv).remove();
}

/**
 * 객체 비활성화(주로 리스트 삭제 후 열 비활성화 시 사용)
 * @param obj : 이벤트 발생 객체(자기자신)
 * @param ele : 비활성화 하려는 객체명(tr,td....)
 */
function cf_delRow(obj,ele){
    obj.closest(ele).hide();
}

function rowSpan(tableElt, columnNo){

    var rows = tableElt.getElementsByTagName("TR");
    var cntRows = rows.length;
    var previous = -1;

    for (var i = 1; i < cntRows; i++) {
        var compare = (previous < 0) ? (i - 1) : previous ;
        var preCol = rows[ compare ].getElementsByTagName("TD")[columnNo];
        var curCol = rows[i].getElementsByTagName("TD")[columnNo];

        if ((preCol != undefined && curCol != undefined) && (preCol.innerHTML == curCol.innerHTML)){
            preCol.rowSpan = preCol.rowSpan + 1;
            curCol.style.display = 'none';
            previous = compare;
        }else{
            previous = -1;
        }
    }
}

function rowSpanEx(tableElt, columnNo){
    var cntArg = arguments.length -1;
    var rows = tableElt.getElementsByTagName("TR");
    var cntRows = rows.length;
//    var previous = -1;
    var arrPrevious = new Array(cntArg-1);
    var arrCompare = new Array(cntArg-1);
    var arrCompare = new Array(cntArg-1);
    var arrPreCol = new Array(cntArg-1);
    var arrCurCol = new Array(cntArg-1);
    var arrColumnNo = new Array(cntArg-1);

    for(var idx = 0; idx < cntArg;idx++)
    {
        arrPrevious[idx] = -1;
        arrColumnNo[idx] = arguments[idx+1];
    }

    for (var i = 1; i < cntRows; i++) {
        for(var cols = 0; cols < cntArg; cols++)
        {
            arrCompare[cols] = (arrPrevious[cols] < 0) ? (i - 1) : arrPrevious[cols];
            arrPreCol[cols] = rows[ arrCompare[cols] ].getElementsByTagName("TD")[arrColumnNo[cols]];
            arrCurCol[cols] = rows[i].getElementsByTagName("TD")[arrColumnNo[cols]];

            if ((arrPreCol[cols] != undefined && arrCurCol[cols] != undefined) && (arrPreCol[cols].innerHTML == arrCurCol[cols].innerHTML)){
                arrPreCol[cols].rowSpan = arrPreCol[cols].rowSpan + 1;
                arrCurCol[cols].style.display = 'none';
                arrPrevious[cols] = arrCompare[cols];
            }else{
                arrPrevious[cols] = -1;
            }
        }
    }
}

function cf_getListPageAttr(objDef){
    
    var URL   = objDef.URL;
    var ASYNC = objDef.ASYNC;
    var MODE  = objDef.MODE;
    
    if(ASYNC == undefined) ASYNC = false;
    if(MODE == undefined)  MODE  = "getCntSeq";
    
    var data     = new Object();
    var obj      = {};    
    obj.URL      = URL;
    obj.ASYNC    = ASYNC;
    data["MODE"] = MODE;
    
    var mergeData = cf_mergeHashData(data, $('#moreView').data('search'));
    
    obj.DATA = mergeData;
    
    var totalCnt  = 0;
    var maxSeq    = 0;
    var returnCnt = cf_getJsonData(obj);
    $.each(returnCnt,function(key,val){
        $.each(val, function(key,val){
            if(key == 'cnt'){
                totalCnt = val;
            }else if(key == 'seq'){
                maxSeq = val;
            }
        });
    });
    
    //총 카운트 저장.
    $('#moreView').data('count',totalCnt);
    //max seq 저장.
    $('#moreView').data('maxSeq',maxSeq);
    
    $('#spanTotalCnt').html( totalCnt );
}




/**
 * 테이블 헤더 인덱스 가져오기
 * @author An Hyo Seop
 * @param id : 찾을 컬럼 아이디
 * @param colInfo : 테이블 정보(사용자 정의)
 * @since 2013-03-13
 */
function cf_getColIdx(id, colInfo){
    var i='';
    $(colInfo).each(function(ele,val){
        if(val.ID == id){
            //console.log(val.ID+':'+id+'='+ele);
            i= ''+ele+'';
            return false;
        }
    });
    return i;
}

/**
 * 시퀀스 가져오기(hidden)
 * @author An Hyo Seop
 * @param id : 찾을 컬럼 아이디
 * @param colInfo : 테이블 정보(사용자 정의)
 * @param trNode : tr 영역
 * @since 2013-03-13
 */
function cf_getColData(id, colInfo, objElement){
    var idx = '';
    var retValue = '';
    
    //objElement = $(objElement).closest("tr");
    
    if(objElement.tagName == "TD"){
      objElement = $(objElement).closest("tr");
    }
    idx = cf_getColIdx(id, colInfo);
    if(idx == ''){
        retValue = '';
    }else{
        //seqVal = $('td:eq('+idx+')',objElement).find('input:hidden').val();
        var element = $('td:eq('+idx+')',objElement).find(':input');
        if(element.length > 0){
            retValue = element.val();
        }else{
            retValue = $('td:eq('+idx+')',objElement).find('span').text();
        }
    }
    return retValue;
}


/**
 * @author An Hyo Seop
 * 같은 값이 있는 열을 병합함  *
 * 사용법 : $('#테이블 ID').rowspan(0);
 * @since 2013-03-21
 */
$.fn.rowspan = function(colIdx) {
    return this.each(function(){
        var that;
        $('tr', this).each(function(row) {
            $('td:eq('+colIdx+')', this).filter(':visible').each(function(col) {
                if ($(this).html() == $(that).html() && $(this).prev().html() == $(that).prev().html()) {
                    rowspan = $(that).attr("rowspan") || 1;
                    rowspan = Number(rowspan)+1;
                    $(that).attr("rowspan",rowspan);
                    // do your action for the colspan cell here
                    $(this).hide();
                    //$(this).remove();
                    // do your action for the old cell here
                } else {
                    that = this;
                }
                // set the that if not already set
                that = (that == null) ? this : that;
            });
        });
    });
};

/**
 * @author An Hyo Seop
 * 같은 값이 있는 행을 병합함  *
 * 사용법 : $('#테이블 ID').colspan(0);
 * @since 2013-03-21
 */
$.fn.colspan = function(rowIdx) {
    return this.each(function(){
        var that;
        $('tr', this).filter(":eq("+rowIdx+")").each(function(row) {
            $(this).find('th').filter(':visible').each(function(col) {
                if ($(this).html() == $(that).html()) {
                    colspan = $(that).attr("colSpan") || 1;
                    colspan = Number(colspan)+1;
                    $(that).attr("colSpan",colspan);
                    $(this).hide(); // .remove();
                } else {
                    that = this;
                }
                // set the that if not already set
                that = (that == null) ? this : that;
            });
        });
    });
};
