var transScreen;                //화면전환용
var g_hardware_search = function(){};
    g_hardware_search.OpenerDiv="";
    g_hardware_search.colInfo = [
         {ID : 'F_NO'           , TITLE : 'No'      , TYPE  : 'INDEXNUM' }
        ,{ID : 'name_agency'    , TITLE : '대리점'                       }
        ,{ID : 'name_subagency' , TITLE : '보유처'                       }
        ,{ID : 'name_factory'   , TITLE : '제조사'                       }
        ,{ID : 'name_model'     , TITLE : '모델'                         }
        ,{ID : 'code'           , TITLE : '일련번호'                     }
        ,{
            //Row 단위처리 영역
             ROW_CLICK_FUNC :"g_hardware_search.uf_setHardwareInfo"
            ,ROW_DRAW_FUNC: function(objElemet){
                //objElemet - 한페이지 단위의 Element = Tbody 단위
                var objTr = $('tr',objElemet);
                $.each(objTr, function(idx, trElement){
                    g_hardware_search.makeGrid.setSelectedRow(trElement);
                    var rowJsonData = g_hardware_search.makeGrid.getJsonRowData();
                    if(rowJsonData.process_gubn=='1'){
                        g_hardware_search.makeGrid.setTrColor('#FF0000'); //TR 색상 변경한다.
                    }
                    if(rowJsonData.prekyopum_seq>0){                        
                        g_hardware_search.makeGrid.setColHtml('code',rowJsonData.code + cf_display_stock_state('(불)','red','1'));
                    }
                    if(rowJsonData.search_mode=="u_sms_reg"){
                        g_hardware_search.makeGrid.showCol('name_factory', false);
                    }else{
                        g_hardware_search.makeGrid.showCol('name_agency', false); 
                    }
                });
            }
        }
    ];
/**
 * 상단일련번호 검색
 * 호출시 모드가 없다면 subtype1(출고가능 데이터)
 */
function cf_HardwareSearch()
{
    //화면 전환 Instance 선언
    transScreen = new TransScreen();
    //화면 데이터 처리 ( draw Grid or Data Setting )
    g_hardware_search.df_initScreen();
    //이벤트 처리
    g_hardware_search.df_eventHandler();
}
//화면 데이터 처리 ( draw Grid or Data Setting )
g_hardware_search.df_initScreen=function(){
    g_hardware_search.OpenerDiv="#"+$("div [data-page=Y].current").attr("id");

    var str_from="<div class='table-type6' id='divHardwareSearch'>"
                +"<div class='control-group'>"
                    +"<label class='control-label' for='code'>일련번호</label>"
                    +"<div class='controls'>"
                        +"<input type='text' placeholder='4글자 이상 입력하세요.' id='code' name='code'>"
                        +"<div class='input-append'>"
                        +"   <input type='button' class='btn btn-midtype01' id='btnCodeHardwareSearchBack' value='검색'/>"
                        +"</div>"
                    +"</div>"
                +"</div>"
            +"</div>";
    //$(g_hardware_search.OpenerDiv).prepend(str_from);
    $('.tbl-top-wrap.p-right').after(str_from);

    //돔생성
    var str_div="<div id='CodeHardwareSearchBack' data-page='Y'></div>";
    $(g_hardware_search.OpenerDiv).parent().prepend(str_div);

    //리스트화면 init
    //g_hardware_search.initList();
}
//이벤트 처리
g_hardware_search.df_eventHandler=function(){
  //검색
    var errMsg="";
    var btnCodeHardwareSearchBackSelector="#divHardwareSearch #btnCodeHardwareSearchBack";
    $(document).off("click",btnCodeHardwareSearchBackSelector).on("click",btnCodeHardwareSearchBackSelector,function(event){
        var element=$("#code","#divHardwareSearch");

        if(element.val().length<4){
            switch(location.pathname){
                case "ustock/u_sm_reg.html":
                {
                    errMsg="4글자 이상 입력하세요.<BR>1234으로 입력하시면 [0001234],[00001234],[00000001234] 인 일련번호를 검색합니다.";
                    break;
                }
                default:{
                    errMsg="4글자 이상 입력하세요.<BR>1234으로 입력하시면 [0001234],[00001234],[1234***] 인 일련번호를 검색합니다.";
                    break;
                }
            }
            element.focus();
            var ErrObj=new Object();
            ErrObj.elementID=element;
            ErrObj.errMsg=errMsg;
            cf_setErrorMsg(ErrObj);
        }else{
            var ErrObj=new Object();
            ErrObj.elementID=element;
            cf_resetErrorMsg(ErrObj);

            var str_html="<div id='List'></div>"
                +"<div class='btn-group'><input type='button' class='btn btn-bigtype02' value='뒤로' id='btnCancle'></div>"; 
            $("#CodeHardwareSearchBack").html(str_html);

            transScreen.cf_transScreen(false,'#CodeHardwareSearchBack',g_hardware_search.OpenerDiv,g_hardware_search.drawList);
        }
    });

    //뒤로가기
    var btnCancleSelector="#CodeHardwareSearchBack #btnCancle";
    $(document).off("click",btnCancleSelector).on("click",btnCancleSelector,function(event){
        transScreen.cf_transScreen(true);
    });
}

//List 그리기
g_hardware_search.initList = function(){
     var objDef = {};
    objDef.URL          = '/PHP/common/hardware_search.php'; //json 전송 URL
    objDef.DIV_LIST     = '#CodeHardwareSearchBack #List';   //리스트 영역(DIV)
    objDef.TABLE_ID     = 'tbList';                          //리스트 테이블 영역ID (변수명 변경 불가)
    objDef.LIST_ID      = 'HARDWARE_SEARCH';                 //리스트가져올때 [MODE] 아이디.. 디폴트 [MODE] = 'getList'    
    objDef.CNT_ID       = 'HARDWARE_SEARCH_CNTNSEQ';
    objDef.LIMIT_ITEM   = '50';
    //objDef.PAGING_TYPE  = 'AN-SCROLL';   
    

    g_hardware_search.makeGrid = new MakeGrid(objDef,g_hardware_search.colInfo);
}
g_hardware_search.drawList = function(){
    ///////검색 조건///////
    var search_mode="";
    switch(location.pathname){
        case "dealsub/regre_predeal.html": //회수등록
            search_mode="repredeal";
            break;
        case "ustock/u_sm_reg.html": //회수등록
            search_mode="u_sms_reg";
            break;
        default:
            search_mode="subtype1";
            break;
    }

    var sndData=new Object();
    sndData['search_code'] = $("#code","#divHardwareSearch").val();
    sndData['search_mode'] = search_mode;
    
    g_hardware_search.initList();
    g_hardware_search.makeGrid.setSendData(sndData);
    g_hardware_search.makeGrid.setCaption("※적색표시 단말기는 유키현황에 있는 단말기입니다.","left");    
    g_hardware_search.makeGrid.movePage(1);
}

//일련번호 선택
g_hardware_search.uf_setHardwareInfo=function(event, objElemet){
    var data = g_hardware_search.makeGrid.getJsonRowData();
    
    var isCodeInput    = false;
    var isCodetext     = false;
    var isCodeDup      = false;
    var ErrObj={};

    switch(location.pathname){
        case "deal/regpredeal.html": //출고등록
        {
            //보유처 설정            
            ErrObj.elementID=$("#id_subagency1",g_hardware_search.OpenerDiv);
            cf_resetErrorMsg(ErrObj);
            $("#id_subagency1",g_hardware_search.OpenerDiv).children().each(function(){
                $(this).remove();
            });
            var subagency_option="<option value=''>매장을 선택하세요</option>"
                +"<option value='"+data.id_subagency+"' selected>"+data.name_subagency+"</option>";
            $("#id_subagency1",g_hardware_search.OpenerDiv).append(subagency_option);
            break;
        }
        case "ustock/u_sm_reg.html": //대리점재고이동
        {
            ErrObj.elementID=$("#id_agency_from",g_hardware_search.OpenerDiv);
            cf_resetErrorMsg(ErrObj);
            $("#id_agency_from",g_hardware_search.OpenerDiv).val(data.id_agency);
            
            var subagency_option="<option value=''>판매처를 선택하세요</option>"
                +"<option value='"+data.id_subagency+"' selected>"+data.name_subagency+"</option>";
            $("#id_subagency_from",g_hardware_search.OpenerDiv).append(subagency_option);
            break;
        }
        default:{
            //보유처 설정
            ErrObj.elementID=$("#id_subagency",g_hardware_search.OpenerDiv);
            cf_resetErrorMsg(ErrObj);
            $("#id_subagency",g_hardware_search.OpenerDiv).children().each(function(){
                $(this).remove();
            });
            var subagency_option="<option value=''>매장을 선택하세요</option>"
                +"<option value='"+data.id_subagency+"' selected>"+data.name_subagency+"</option>";
            $("#id_subagency",g_hardware_search.OpenerDiv).append(subagency_option);
            break;
        }
    }
    
    if(location.pathname!="ustock/u_sm_reg.html"){
        //제조사 설정    
        ErrObj.elementID=$("#id_factory",g_hardware_search.OpenerDiv);
        cf_resetErrorMsg(ErrObj);
        $("#id_factory",g_hardware_search.OpenerDiv).val(data.id_factory);
    
        //모델 설정    
        ErrObj.elementID=$("#id_model",g_hardware_search.OpenerDiv);
        cf_resetErrorMsg(ErrObj);
        $("#id_model",g_hardware_search.OpenerDiv).children().remove();
        var model_option="<option value=''>모델을 선택하세요.</option>"
            +"<option value='"+data.id_model+"' data-etc='"+data.isCharger+"' selected>"+data.name_model+"</option>";
        $("#id_model",g_hardware_search.OpenerDiv).append(model_option);
    }

    //일련번호 설정
    ErrObj.elementID=$("#code_idx0",g_hardware_search.OpenerDiv);
    cf_resetErrorMsg(ErrObj);
    if(getTagName($("#code_idx0",g_hardware_search.OpenerDiv))=="SELECT"){
        $("#code_idx0",g_hardware_search.OpenerDiv).children().remove();
        var code_option="<option value='"+data.seq_hardware+"'>"+data.code+"</option>";
        $("#code_idx0",g_hardware_search.OpenerDiv).append(code_option);
    }else{
        isCodetext=true;
        var code_idx_cnt=$(':input[id^=code_idx]',g_hardware_search.OpenerDiv).length;
        for(var i=0;i<code_idx_cnt;i++){
            if($("#code_idx"+i,g_hardware_search.OpenerDiv).val()==""){
                //일련번호 중복
                $(':input[id^=code_idx]',g_hardware_search.OpenerDiv).each(function(){
                    if($(this).val()==data.code) isCodeDup=true;

                });
                if(!isCodeDup){
                    $("#code_idx"+i,g_hardware_search.OpenerDiv).val(data.code);
                    isCodeInput=true;
                    break;
                }
            }
        }
    }
    //입고구분
    ErrObj.elementID=$(":input[name=m_gubun]",g_hardware_search.OpenerDiv);
    cf_resetErrorMsg(ErrObj);
    $(":input[name=m_gubun]",g_hardware_search.OpenerDiv).each(function(){
        if($(this).val()==data.m_gubun){
            $(this).attr("checked",true);
        }else{
            $(this).attr("checked",false);
        }
    });

    //Last Date
    var LastDateInput="<input type='hidden' id='last_date' value='"+data.last_date+"'/>";
    $("#last_date",g_hardware_search.OpenerDiv).remove();
    $(g_hardware_search.OpenerDiv).prepend(LastDateInput);

    if(isCodeDup==false){
        if(isCodeInput==false && isCodetext==true){
             var ErrObj={};
             ErrObj.MODE="dialog";
             ErrObj.errMsg="더 이상 입력 할 수 있는 칸이 없습니다.<BR>처리 수량을 늘려주세요.";
             cf_setErrorMsg(ErrObj);
        }
        transScreen.cf_transScreen(true);
    }else{
        if(isCodeInput==false && isCodetext==true){
             var ErrObj={};
             ErrObj.MODE="dialog";
             ErrObj.errMsg="중복된 일련번호를 선택하였습니다.";
             cf_setErrorMsg(ErrObj);
        }
    }
}