/**
 * element 의 tag 명을 가지고옴
 * @author Toby Kim
 * @param elementID : element
 * @since 2013-04-16
 */
function getTagName(elementID){
    var element_tagnm=$(elementID).prop("tagName").toString().toUpperCase();
    var element_type="";
    if(element_tagnm=="INPUT"){
        element_type=$(elementID).attr("type").toString().toUpperCase();
    }else{
        element_type=element_tagnm;
    }
    return element_type;
}

/**
 * 등록/수정 페이지 기본값(DatePicker/에러메세지초기화/정규식적용)
 * @param formID
 * @author Toby Kim
 * @since 2013-03-21
 */
function cf_regPageInit(FormID,Mode){
    console.error("formAPI 에  적용된 내용입니다. --> 제거!");
    
    if(Mode==undefined){
        //등록페이지만 적용
        cf_fh_agency_date(FormID);
    }
    //Date Picker
    cf_setDtpicker(FormID);
    //Regular
    cf_setRegularExpression(FormID);
    //Form 내용변경시 에러메시지 삭제
    cf_initFormObjectError(FormID);

}

function cf_MobilePageInit(FormID,Mode){
    if(Mode=='reg'){
        //등록페이지만 적용
        cf_fh_agency_date(FormID);
    }
    //Date Picker
    cf_setDtpicker(FormID);
    //Regular
    cf_setRegularExpression(FormID);
    //Form 내용변경시 에러메시지 삭제
    cf_initFormObjectError(FormID);
}

/**
 * 일련번호 입력박스
 * @author Toby Kim
 * @param getObj.elementID : 입력수량 elemntID
 * @param getObj.divID 입력창이 생성될 DIV
 * @param getObj.elementNM 입력창 이름
 * @param getObj.isselect Bool (true : 일련번호 기본값이 select / false: 일련번호 기본값이 input)
 * @since 2013-02-25
 */
function cf_getInputBox(getObj){
    if(getObj.elementID) var elementID=getObj.elementID;
    if(getObj.divID) var divID=getObj.divID;
    if(getObj.elementNM) var valID=getObj.elementNM;
    if(getObj.isSelect) var isSelect=getObj.isSelect;

    var elementID=$(elementID);
    var divID=$(divID);

    var this_val=elementID.val();
    var is_max_val=-1;
    var valIDStrlen=valID.toString().length;

    if(this_val=="") this_val=1;

    var minval=elementID.data("minval");
    var maxval=elementID.data("maxval");

    if(minval==undefined || minval==null) minval=0;
    if(maxval==undefined || maxval==null) maxval=999999;

    var addReadOnly="";
    var is_readonly=$("#"+valID+"0").attr("readonly");
    if(is_readonly==true || is_readonly=="readonly"){
        addReadOnly="readonly";
    }

    if(isSelect==true){
        if(this_val>1){
            divID.find("select[name^="+valID+"]").remove();

            if(maxval>=this_val && minval<=this_val){
                divID.find("input[name^="+valID+"]").each(function(){
                    var is_val=cf_convert($(this).attr("id").toString().substring(valIDStrlen),"int");
                    if(is_val>=this_val && is_val!=0){
                        $(this).remove();
                    }
                });
                divID.find("input[name^="+valID+"]").each(function(){
                    is_max_val=cf_convert($(this).attr("id").toString().substring(valIDStrlen),"int");
                });


                for(var i=is_max_val+1;i<this_val;i++){
                    var strDataReq="";
                    if(i==0) strDataReq="data-req='Y'";
                    divID.append("<input type=\"text\" id=\""+valID+i+"\" name=\""+valID+i+"\" class=\"box\" value=\"\" "+addReadOnly+" "+strDataReq+"/> ");
                }
            }
        }else{
            var strSelect="";
            strSelect+="<select name='code_idx0' id='code_idx0' data-name='일련번호' data-req='Y'>";
            strSelect+="<option value=''>일련번호를 선택하세요.</option>";
            strSelect+="</select>";

            divID.html(strSelect);
        }
    }else{
        if(maxval>=this_val && minval<=this_val){
            divID.find("input[name^="+valID+"]").each(function(){
                var is_val=cf_convert($(this).attr("id").toString().substring(valIDStrlen),"int");
                if(is_val>=this_val && is_val!=0){
                    $(this).remove();
                }
            });
            divID.find("input[name^="+valID+"]").each(function(){
                is_max_val=cf_convert($(this).attr("id").toString().substring(valIDStrlen),"int");
            });


            for(var i=is_max_val+1;i<this_val;i++){
                divID.append("<input type=\"text\" id=\""+valID+i+"\" name=\""+valID+i+"\" class=\"box\" value=\"\" "+addReadOnly+"/> ");
            }
        }
    }
    
    //종복체크 
    if(this_val>1){        
        var selector=getObj.divID+" [id^="+valID+"]";
        $(document).on("blur",selector,function(){
           var this_val=$(this).val();
           var is_dup=false;
           $(selector).not($(this)).each(function(){
               if($(this).val().trim()==this_val.trim() && this_val.length>0){
                   is_dup=true;
               }
           });
           
           if(is_dup){
               var ErrorObj={};               
               ErrorObj.errMsg="["+this_val+"]는 중복된 일련번호 입니다.";
               ErrorObj.elementID=$(this);
               cf_setErrorMsg(ErrorObj);
               $(this).val("");
           }
        });
    }
}

//모델정보 초기화
function cf_initModelInfo(getObj){
    if(getObj.init=='id_factory'){ //제조사초기화시 변경
        getObj.elements=[
             '#id_factory'
            ,'#id_model'
            ,'#color'
            ,'#price_in'
            ,'#code_idx0'
        ];
        cf_init(getObj);
    }else if(getObj.init=='id_model'){
        getObj.elements=[
             '#id_model'
            ,'#color'
            ,'#price_in'
            ,'#code_idx0'
        ];
        cf_init(getObj);
    }
}

//SELECT Box초기화
function cf_init(getObj){
    $.each(getObj.elements,function(key,element){
        if($(element).length>0){
            var element_type=getTagName(element);

            if(element_type=="SELECT"){
                $(element).val("");
            }
        }
    });
}



/**
 * 판매처에 따른 실판매처 입력 박스 생성
 * @author dhkim
 * @param obj_subAgencyId : 판매처 SelectBox ID
 * @param divTargetId     : 입력창이 생성될 DIV
 * @since 2013-05-15
 */
function cf_makeDealerSub(obj_subAgencyId, divTargetId)
{
    if($('#'+obj_subAgencyId+' option:selected').data('etc')!='1')
    {
        $('#'+divTargetId).html('');
        return;
    }

    $('#'+divTargetId).html('<label class="control-label" for="dealer_sub">실판매처 :</label>\
                             <div class="controls">\
                                 <input type="text" id="dealer_sub" name="dealer_sub" maxlength="20">\
                             </div>');
    return;
}

/**
 * 제조사/모델 데이터/이벤트 설정
 */
function cf_initFactoryNModel(formElementId, async, arrCallBackHash){
    console.error("cf_initFactoryNModel 삭제 바람.. 배열로 정의하시오!!");
    var formElementId;
    var ASYNC = true;
    if(async != undefined) ASYNC = async;
    var defObj = {};
    defObj.formElementId = formElementId;
    defObj.ASYNC         = ASYNC;
    if(arrCallBackHash != undefined){
        defObj.callBack2chgModel  = arrCallBackHash.callBack2chgModel;
        defObj.callBack2chgMgubun = arrCallBackHash.callBack2chgMgubun;
    }
    if(ASYNC == undefined) ASYNC = true;
    //제조사 BEGIN
    sndObj              = new Object();
    sndObj.FunctionType = "getFactory";
    sndObj.elementID    = formElementId + " #id_factory";
    sndObj.ASYNC        = ASYNC;
    cf_getOptionData(sndObj);
    //제조사 END

    __setFactoryNModelEventHandler(defObj)
}


/**
 * 제조사/모델 데이터/이벤트 설정
 */
function cf_cbFactoryNModel(elementId, async, arrCallBackHash){

    var formElementId = elementId.substring(0,elementId.indexOf(" "));

    if(async != undefined) ASYNC = async;

    var defObj = {};
        defObj.formElementId = formElementId;
        defObj.ASYNC         = ASYNC;
        
    if(arrCallBackHash != undefined){
        defObj.callBack2chgModel  = arrCallBackHash.callBack2chgModel;
        defObj.callBack2chgMgubun = arrCallBackHash.callBack2chgMgubun;
    }
    __setFactoryNModelEventHandler(defObj)
}

/**
 * (내부함수)제조사/모델 이벤트 설정
 */
function __setFactoryNModelEventHandler(defObj){

    var formElementId = defObj.formElementId;
    var callBack2chgModel   = defObj.callBack2chgModel;
    var callBack2chgMgubun  = defObj.callBack2chgMgubun;

    // 검색창-입고구분이 변경되었을 경우
    $(document).on('change', formElementId + " input[name='m_gubun']",function(event){

        //__chgFactory(formElementId);

        //모델정보 초기화
        $(formElementId + " #id_model").children().remove();
        $(formElementId + " #id_model").append("<option value='' selected>모델을 선택하세요.</option>");

        if(callBack2chgMgubun != undefined) __doFunction(callBack2chgMgubun);
    });

    //제조사변경
    $(document).on('change', formElementId + " #id_factory",function(event){

        __chgFactory(formElementId);

        event.preventDefault();
    });

    //모델변경
    $(document).on('change', formElementId + " #id_model",function(event){

        var nCntFactory = $(formElementId + " #id_factory").length;

        //모델명 검색 END
        if(nCntFactory > 0){
            //제조사 BETGIN
            var sndObj  = new Object();
            var sndData = new Object();
            sndData['id_model']  = $(formElementId + "  #id_model").val();
            sndObj.FunctionType  = "getFactory";
            sndObj.elementID     = formElementId + " #id_factory";
            sndObj.sndData=sndData;

            cf_getValueData(sndObj);
            //제조사 END
        }
        if(callBack2chgModel != undefined) __doFunction(callBack2chgModel);


        event.preventDefault();
    });

    //모델검색
    $(document).on('click', formElementId + " #btnModel",function(event){

        var sndData = new Object();
        var sndObj  = new Object();
        var isError = false;

        var factoryElement = $(formElementId + " #id_factory");
        var ModelNmElement = $(formElementId + " #model_nm");
        var nCntFactory    = factoryElement.length;

        var ModelNm = ModelNmElement.val();
        var nLenSrc = (ModelNm.length+(escape(ModelNm)+"%u").match(/%u/g).length - 1);

        if(nLenSrc < 2){
            var ErrObj      = new Object();
            ErrObj.elementID = ModelNmElement;
            ErrObj.errMsg    = "모델명을 2자이상 입력하세요.";
            cf_setErrorMsg(ErrObj);

            isError=true;
        }else{
            var ErrObj      = new Object();
            ErrObj.elementID = ModelNmElement;
            cf_resetErrorMsg(ErrObj);
        }

        if(isError==false){
            //모델명 검색 BEGIN
            sndData['model_nm'] = ModelNm;

            if(nCntFactory > 0) sndData['id_factory'] = $(formElementId + " #id_factory").val();

            var m_gubunElement = $(formElementId + " input[name='m_gubun']:checked");
            if(m_gubunElement.length > 0){
                sndData['m_gubun'] = m_gubunElement.val();
            }


            sndObj.FunctionType = "getModelSearch";
            sndObj.elementID    = formElementId + " #id_model";
            sndObj.sndData      = sndData;

            cf_getOptionData(sndObj);
        }

        event.preventDefault();

    });
}

/**
 * (내부함수)제조사 이벤트 함수
 */
function __chgFactory(formElementId){

    var sndData = new Object();
    var sndObj  = new Object();

    if($(formElementId + " #id_factory").val()!=""){

        //모델 BEGIN
        sndData               = new Object();
        sndObj                = new Object();
        sndData['id_factory'] = $(formElementId + " #id_factory").val();
        var m_gubunElement = $(formElementId + " input[name='m_gubun']:checked");
        if(m_gubunElement.length > 0){
            sndData['m_gubun'] = m_gubunElement.val();
        }

        sndObj.FunctionType   = "getModel";
        sndObj.elementID      = formElementId + " #id_model";
        sndObj.sndData        = sndData;
        sndObj.ASYNC          = false;
        cf_getOptionData(sndObj);
        //모델 END

        //모델정보초기화 BEGIN
        var initObj    = new Object;
        initObj['init'] ='id_model';
        cf_initModelInfo(initObj);
        //모델정보초기화 END

    }else{
        //모델정보초기화 BEGIN
        var initObj     = new Object;
        initObj['init'] = 'id_factory';
        cf_initModelInfo(initObj);
        //모델정보초기화 END
    }

    event.preventDefault();
}


/**
 * 수량만큼 동적 매장 컴포넌트 생성
 */
function cf_makeSearchComplexComponent(getObj){

    var sourceElementID = getObj.sourceElementID;
    var printElementID  = getObj.printElementID;
    var targetElementID = getObj.targetElementID;
    var labelText       = getObj.labelText;
    var optionBoxMsg    = getObj.optionBoxMsg;

    var objSrcId   = $(sourceElementID);
    var objPrtId   = $(printElementID);
    var numVal     = objSrcId.val();

    var printHtml = "";

    if(numVal=="") numVal=1;

    var minval = objSrcId.data("minval");
    var maxval = objSrcId.data("maxval");

    //console.log("numVal:" + numVal);


    if(minval==undefined || minval==null) minval=0;
    if(maxval==undefined || maxval==null) maxval=999999;

    if(maxval>=numVal && minval<=numVal){

        for(var i=0;i<numVal;i++){

            var elementId = targetElementID + '_idx' + i;

            printHtml += "<div class='control-group'>";
            printHtml += "  <label class='control-label' for='" + elementId +"'>" + labelText + (i+1) + "</label>";
            printHtml += "  <div class='controls'>";
            printHtml += "      <select name='" + targetElementID +"' id='" + elementId +"' >";
            printHtml += "          <option value=''>" + optionBoxMsg + "</option>";
            printHtml += "      </select>";
            printHtml += "      <div class='input-append'>";
            printHtml += "          <input type='text'  id='txt" + elementId + "' name='txt"+elementId+"' class='span6'/>";
            printHtml += "          <input type='button' class='btn btn-midtype01' id='btn" + elementId + "' name='btn" + elementId + "' value='검색'>";
            printHtml += "      </div>";
            printHtml += "  </div>";
            printHtml += "</div>";

        }

        objPrtId.html("");
        //console.log("printHtml:" + printHtml);
        objPrtId.html(printHtml);
    }
}

/**
 * (내부함수) 동적 생성 매장 이벤트 함수
 */
function cf_setBtnTkeySubagencyEventHandler(objDef){

    var formElementId = objDef.formElementId;
    var FunctionType = objDef.FunctionType;
    $(document).on('click', formElementId + " input[name^=btntkey_subagency_idx]",function(event){


        var id      = this.id;
        var idx     = id.substring(id.indexOf('_idx') + 4);
        var sndData = new Object();
        var sndObj  = new Object();

        //모델명 검색 BEGIN
        sndData['subagency_nm'] = $(formElementId + " #txttkey_subagency_idx" + idx).val();
        sndObj.FunctionType = FunctionType; //"getSubagency_WITHGROUP";
        sndObj.elementID    = formElementId + " #tkey_subagency_idx" + idx;
        sndObj.sndData      = sndData;

        cf_getOptionData(sndObj);
        //모델명 검색 END

    });
}


/**
 * 동적 생성 컴포넌트 생성(매장/모델명/일련번호)
 */
function cf_makeComponent(frmElementId, type, subagencyNm){
    var InpuBoxObj = new Object();

    var singleElement = $(frmElementId + ' #singleDynamic');
    var multiElement  = $(frmElementId + ' #multiDynamic');

    if(type == 'num_subagency')
    {
        //console.log('num_subagency');
        console.log(subagencyNm);
        InpuBoxObj.sourceElementID = frmElementId + ' #' +type;
        InpuBoxObj.printElementID  = frmElementId + " #multiDynamic";
        InpuBoxObj.targetElementID = "tkey_subagency";
        InpuBoxObj.labelText       = subagencyNm;
        InpuBoxObj.optionBoxMsg    = "매장을 선택하세요.";

        cf_makeSearchComplexComponent(InpuBoxObj);
        __getDynamicSubOption(frmElementId);

        if(singleElement.length > 0) singleElement.hide();
        if(multiElement.length > 0) multiElement.css("display","table-row-group");
    }
    else
    {
        InpuBoxObj.elementID = frmElementId + ' #' +type;
        InpuBoxObj.divID     = frmElementId + ' #' +"code_li";
        InpuBoxObj.elementNM = "code_idx";
        InpuBoxObj.isSelect  = false;

        cf_getInputBox(InpuBoxObj);

        if(singleElement.length > 0) singleElement.show();
        if(multiElement.length > 0)  multiElement.hide();
    }
}

function __getDynamicSubOption(frmElementId)
{
    var cnt = $(frmElementId + ' #num_subagency').val();

    for(var i=0; i < cnt;i++){

        var sndObj         = new Object();
        sndObj.FunctionType ="getSubagency_WITHGROUP";
        sndObj.elementID    =frmElementId + " #tkey_subagency_idx" + i;
        sndObj.ASYNC        = true;

        cf_getOptionData(sndObj);

    }
}

function cf_initSearchAgency(functionType, printElement, async)
{   console.error("cf_initSearchAgency 삭제 바람.. 배열로 정의하시오!!");
    var objDef = {};

        objDef.ASYNC        = async;
        objDef.FunctionType = functionType;
        objDef.elementID    = printElement;

    var elementID    = objDef.elementID;
    var nPos = elementID.lastIndexOf('#');
    var fromElement    = elementID.substring(0, nPos - 1);

    var objCtrlGrpElement = $(elementID).closest('div.control-group');
    var textElementID     = fromElement + ' #' + $(objCtrlGrpElement).find('input[type=text]').attr('id');
    var buttonElementID   = fromElement + ' #' + $(objCtrlGrpElement).find('input[type=button]').attr('id');

    objDef.textElementID = textElementID;

    __getSearchAgencyData(objDef);

    $(document).on('click', buttonElementID,function(event){

        __getSearchAgencyData(objDef);

        event.preventDefault();
    });
}

function cf_cbSearchAgency(functionType, printElement, async, arrSendData)
{
    var objDef = {};

        objDef.ASYNC        = async;
        objDef.FunctionType = functionType;
        objDef.elementID    = printElement;

    var elementID    = objDef.elementID;
    var nPos = elementID.lastIndexOf('#');
    var fromElement    = elementID.substring(0, nPos - 1);

    var objCtrlGrpElement = $(elementID).closest('div.control-group');
    var textElementID     = fromElement + ' #' + $(objCtrlGrpElement).find('input[type=text]').attr('id');
    var buttonElementID   = fromElement + ' #' + $(objCtrlGrpElement).find('input[type=button]').attr('id');

    objDef.textElementID = textElementID;

    $(document).on('click', buttonElementID,function(event){

        __getSearchAgencyData(objDef, arrSendData);

        event.preventDefault();
    });
}

function cf_cbMultiAgency(functionType, printElement, async)
{
    var objDef = {};

        objDef.ASYNC        = async;
        objDef.FunctionType = functionType;
        objDef.elementID    = printElement;

    var elementID    = objDef.elementID;
    var nPos = elementID.lastIndexOf('#');
    var fromElement    = elementID.substring(0, nPos - 1);
    var objCtrlGrpElement = $(elementID).closest('div.control-group');
    
    //div영역안에 select box 복수 이상일 경우 아래의 text 나 button 처럼 엘리먼트를 찾게되면 
    //나열상 가장앞의 엘리먼트만 찾게되므로 each 로 배열에 담아줘야함.
    //정확한 이유는 파악 요함.
    var selectElementID = new Array();
    fromElement + ' #' + $(objCtrlGrpElement).find('select').each(function(){
        selectElementID.push(fromElement + ' #' + $(this).attr('id'));
    });
    ////////////////////////////////////////////////////////////////////////////////////////
    
    var textElementID     = fromElement + ' #' + $(objCtrlGrpElement).find('input[type=text]').attr('id');
    var buttonElementID   = fromElement + ' #' + $(objCtrlGrpElement).find('input[type=button]').attr('id');

    objDef.textElementID = textElementID;
    //__getSearchAgencyData(objDef);
    //대리점 선택시 판매점 출력
    $(document).on('change', selectElementID[0],function(event){
        var sndData = new Object();
        sndData['id_agency'] = $(this).val();
        
        cf_initOptionData("getSubagency_ALL", selectElementID[1], async, sndData);
        event.preventDefault();
    });

    //검색 버튼 클릭시 이벤트
    $(document).on('click', buttonElementID,function(event){
        //__getSearchAgencyData(objDef);
        if(!$(selectElementID[0]).val()){
            ErrObj=new Object();
            ErrObj.errMsg="대리점을 선택하세요.";
            ErrObj.elementID = $(selectElementID[0]);
            cf_setErrorMsg(ErrObj);
            return;
        }
        var sndData = new Object();
        sndData['id_agency']    = $(selectElementID[0]).val();
        sndData['subagency_nm'] = $(textElementID).val();
        
        cf_initOptionData("getSubagency_ALL", selectElementID[1], async, sndData);
        
        event.preventDefault();
    });    
    
}

function cf_cbMultiAgencyAndChange(functionType, printElement, async)
{
    var objDef = {};
        objDef.ASYNC        = async;
        objDef.FunctionType = functionType;
        objDef.elementID    = printElement;

    var elementID         = objDef.elementID;
    var nPos              = elementID.lastIndexOf('#');
    var fromElement       = elementID.substring(0, nPos - 1);
    var objCtrlGrpElement = $(elementID).closest('div.control-group');
    
    var selectElementID   = fromElement + ' #' + $(objCtrlGrpElement).find('select').attr('id');

    //대리점 선택시 판매점 출력
    $(document).on('change', selectElementID,function(event){
        var sndData = new Object();
        sndData['id_agency'] = $(this).val();
        
        //입고매장 변경
        
        cf_initOptionData("getSubagency_type1", "#id_subagency", async, sndData);
        
        //출고처 변경
        
        cf_initOptionData("getSubagency_ALL", "#id_subagency_predeal", async, sndData);
        
        event.preventDefault();
    });    
    
}

function cf_cbSearchModel(functionType, printElement, async)
{
    var objDef = {};

        objDef.ASYNC        = async;
        objDef.FunctionType = functionType;
        objDef.elementID    = printElement;

    var elementID    = objDef.elementID;
    var nPos = elementID.lastIndexOf('#');
    var fromElement    = elementID.substring(0, nPos - 1);
    var objCtrlGrpElement = $(elementID).closest('div.control-group');
    
    var selectElementID     = fromElement + ' #' + $(objCtrlGrpElement).find('select').attr('id');
    var textElementID     = fromElement + ' #' + $(objCtrlGrpElement).find('input[type=text]').attr('id');
    var buttonElementID   = fromElement + ' #' + $(objCtrlGrpElement).find('input[type=button]').attr('id');

    objDef.textElementID = textElementID;

    //검색 버튼 클릭시 이벤트
    $(document).on('click', buttonElementID,function(event){
        if(!$(textElementID).val()){
            ErrObj=new Object();
            ErrObj.errMsg="모델명을 입력하세요.";
            ErrObj.elementID = $(textElementID);
            cf_setErrorMsg(ErrObj);
            return;
        }
        var sndData = new Object();
        sndData['model_nm'] = $(textElementID).val();
        
        cf_initOptionData("getModelSearch", selectElementID, async, sndData);
        
        event.preventDefault();
    });    
    
}

function __getSearchAgencyData(objDef, arrSendData)
{
    var ASYNC         = objDef.ASYNC;
    var FunctionType  = objDef.FunctionType;
    var elementID     = objDef.elementID;
    var textElementID = objDef.textElementID;
    var sndData       = arrSendData;
    var sndObj        = new Object();

    if(sndData == undefined || sndData=="") sndData = {};
    if(ASYNC == undefined) ASYNC = true;

    var nCntCtrl = $(textElementID).length;
    if(nCntCtrl > 0){
        sndData['subagency_nm'] = $(textElementID).val();
    }
    //모델명 검색 BEGIN
    sndObj.ASYNC        = ASYNC;
    sndObj.FunctionType = FunctionType;
    sndObj.elementID    = elementID;
    sndObj.sndData      = sndData;

    cf_getOptionData(sndObj);
}

function cf_initOptionData(functionType, printElement, async, arrSndData, callBackFn){
    var ASYNC   = async;
    if(async == undefined) ASYNC = true;

    var sndObj  = new Object();
        sndObj.ASYNC        = ASYNC;
        sndObj.FunctionType = functionType;
        sndObj.elementID    = printElement;

    var sndData = new Object();
    if(arrSndData != undefined && arrSndData != ''){
        sndObj.sndData = arrSndData;
    }
    if(functionType == 'getFactory'){
        console.log("cf_cbFactoryNModel");
        if(callBackFn == cf_cbFactoryNModel){
            cf_cbFactoryNModel(printElement, ASYNC);
        }else{
            cf_cbFactoryNModel(printElement, ASYNC, callBackFn);    
        }
        
    }else{
        if(callBackFn == cf_cbSearchAgency){
            sndObj.CALLBACK = cf_cbSearchAgency(functionType, printElement, ASYNC, arrSndData);
        }
        else if(callBackFn == cf_cbMultiAgency){
            sndObj.CALLBACK = cf_cbMultiAgency(functionType, printElement, ASYNC);
        }else if(callBackFn == cf_cbMultiAgencyAndChange){
            sndObj.CALLBACK = cf_cbMultiAgencyAndChange(functionType, printElement, ASYNC);
        }else if(callBackFn == cf_cbSearchModel){
            sndObj.CALLBACK = cf_cbSearchModel(functionType, printElement, ASYNC);
        }else{
            sndObj.CALLBACK = callBackFn;
        }
    }
    cf_getOptionData(sndObj);
}

/**
 * FH_AGENCY
 */
function cf_fh_agency(){
    var sndData=new Object();
    sndData['MODE']  = "FH_AGENCY";

    var sndObj=new Object();
    sndObj.URL="/PHP/common/commonUiData.php";
    sndObj.ASYNC=false;
    sndObj.DATA=sndData;
    return cf_getJsonData(sndObj);
}
/** 
 * Cookie 정보
 */
function cf_userInfo(){
    var cook   = cf_getSessionStorage("cook");
    var sndObj = new Object();
        sndObj.URL   = "/PHP/common/getCook.php";
        sndObj.ASYNC = false;
        sndObj.DATA  = cook;
    return cf_getJsonData(sndObj);
}

/**
 * control-group 내의 checkbox 반전
 */
function cf_CheckedkReverse(elementID){    
    var eleMents=$(elementID).closest(".control-group").find(":input[type=checkbox]");
    var chkVal="";
    $.each(eleMents, function(idx, element){        
        chkVal=(element.checked)?false:true;
        element.checked =chkVal;
    });
}

function cf_display_stock_state(txt,color, gubn){
    var retValue = null;
    if(gubn == '1'){
        retValue = "<font color='" + color + "'>"+ txt + "</font>";
    }else{
        retValue = txt;
    }
    return retValue;
}

function cf_displayModel(sModel, sLevel){
    
    if(sLevel != undefined && sLevel.length > 0)
    {
        sLevel = "(" + sLevel + ")";
    }else{
        sLevel = '';
    }

    return sModel+sLevel;
}




