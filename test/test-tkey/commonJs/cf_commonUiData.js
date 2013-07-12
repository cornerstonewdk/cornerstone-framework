/**
 * @author Toby Kim
 * 2013-02-15
 * Select Option 형태를 가져오는 함수
 * @param jsonS : Json 데이터
 * @param Obj   : Object
 */
function cf_getJsonToOption(jsonS,Obj)
{
    var str_html="";
    switch(Obj.FunctionType){
        case "getFactory":             //제조사선택
            var str_txt="제조사를";
            break;
        case "getModel":               //모델선택
        case "getModelSearch":         //모델명 검색
            var str_txt="모델을";
            break;
        case "getModelColor":
            var str_txt="색상을";
            break;
        case "getSubagency_type1":     //본점/직영점
        case "getSubagency_type2":     //판매점
        case "getSubagency_ALL":       //전체
        case "getSubagency_WITHGROUP": //판매점 영업그룹 포함
            var str_txt="매장을";
            break;
        case "getIncome":              //입고처선택
            var str_txt="입고처를";
            break;
        case "getIncome2":             //입고처2선택
            var str_txt="입고처2를";
            break;
        case "getDealclass":
            var str_txt="판매유형을";   //판매유형
            break;
        case "getPredealCode":
        case "getPredealCode2Code":
        case "getIncomeKyoCode":
            var str_txt="일련번호를";  //일련번호
            break;
        case "getIncomeType":
            var str_txt="입고유형을";  //입고유형
            break;
        case "getTecoLevel":
            var str_txt="등급을";      //T-eco 등급
            break;
        case "getiAgency":
            var str_txt="대리점을";    //대리점
            break;
        default:
            var str_txt=$(Obj.elementID).data("name");
            if(str_txt==undefined || str_txt==''){
                str_txt=$(Obj.elementID).closest('.control-group').find('label.control-label').text();
            }
            break;
    }
    var elementID=$(Obj.elementID);
    str_html="";
    str_html+="<option value=''>"+str_txt+" 선택하세요</option>";

    if(jsonS){
        for(var i=0,cnt=jsonS.length;i<cnt;i++){
            var val_id=jsonS[i].val_id;
            var val_txt=jsonS[i].val_txt;
            var val_etc=jsonS[i].val_etc;
            
            if(val_txt){
                str_html+="<option value='"+val_id+"'";
                if(val_etc) str_html+=" data-etc='"+val_etc+"' ";
                str_html+=">"+val_txt+"</option>";
            }
        }
    }
    elementID.html("");
    elementID.append(str_html);
}




/**
 * @author Toby Kim
 * 2013-02-15
 * value 형태로 가져오는 함수
 * @param jsonS : Json 데이터
 * @param Obj   : Object
 */
function cf_getJsonToValue(jsonS,Obj)
{
    var elementID=$(Obj.elementID);
    var setVal="";
    if(jsonS){
        for(var i=0,cnt=jsonS.length;i<cnt;i++){
            var val=jsonS[i].val_id;
            if(!val) continue;
            switch(Obj.FunctionType){
                case "getPriceIn":
                {
                    setVal=cf_addComma(val);
                    break;
                }
                case "getModelState":
                {
                    //모델유형
                    if(val=="2"){
                        setVal="충전기";
                        //충전기 일련번호 제한
                        elementID.parent().children().each(function(){
                            $(this).val("");
                            $(this).prop('readonly',true);
                        });
                    }else{
                        if(Obj.sndData['code']!="충전기") setVal=Obj.sndData['code'];
                        elementID.parent().children().each(function(){
                            $(this).val("");
                            $(this).prop('readonly',false);
                        });
                    }
                    break;
                }
                default:
                {
                    setVal=val;
                    break;
                }
            }
        }

        var element_type=getTagName(Obj.elementID);
        if(element_type=="CEHCEKBOX" || element_type=="RADIO"){
            elementID.each(function(){
                if($(this).val()==setVal) $(this).prop("checked",true);
                else $(this).prop("checked",false);
            });
        }else{
            elementID.val("");
            elementID.val(setVal);
        }
    }
}

/**
 * OPTION 가져오기
 * @author Toby Kim
 * 2012-02-06
 * @param : FunctionType : 함수종류
 *******************************************
 * getFactory         : 제조사
 *  - id_model        (모델ID)
 *******************************************
 * getIncome          : 입고처1
 *******************************************
 * getIncome2         : 입고처2
 *  - id_agency       (대리점ID) - 필수
 *******************************************
 * getModel           : 모델
 *  - id_factory      (제조사ID)
 *******************************************
 * getModelSearch     : 모델명 검색
 *  - id_factory      (제조사ID)
 *  - model_nm        (모델명  %모델명%)
 *******************************************
 * getModelColor      : 모델색상
 *  - id_model        (모델ID)   - 필수
 *******************************************
 * getSubagency_type1 : 직영점
 *  - id_agency       (대리점ID) - 필수
 *******************************************
 * @param : ElementID    : 적용대상 ElementID
*/
function cf_getOptionData(Obj)
{
    Obj.CALLBACK     = "cf_getJsonToOption";          //select Option형식
    Obj.URL          = '/PHP/common/commonUiData.php';//T.key공통 기능을 Json형식으로 가져오는 PHP
    //전송데이터 설정
    if(Obj.DATA==undefined) Obj.DATA=new Object;
    Obj.DATA['FunctionType']=Obj.FunctionType;

    if(Obj.sndData!=undefined){
        $.each(Obj.sndData,function( key , val ) {
            Obj.DATA[key]=$.trim(val);
        });
    }
    __setLoadingOption(Obj.elementID);
    cf_getJsonData(Obj);
}

/**
 * Value 가져오기
 * @author Toby Kim
 * 2012-02-06
 * @param : FunctionType : 함수종류
 *******************************************
 * getFactory         : 제조사
 *  - id_model        (모델ID)
 *******************************************
 * getPriceIn         : 입고가
 *  - id_model        (모델ID)   - 필수
 *  - price_type      (입고유형) - 필수
 *  - date_in         (입고일자) - 필수
 *******************************************
 * @param : ElementID    : 적용대상 ElementID
 */
function cf_getValueData(Obj){
    Obj.CALLBACK     = "cf_getJsonToValue";             //Value 데이터
    Obj.URL          = '/PHP/common/commonUiData.php';  //T.key공통 기능을 Json형식으로 가져오는 PHP

    //전송데이터 설정
    if(Obj.DATA==undefined) Obj.DATA=new Object;
    Obj.DATA['FunctionType']=Obj.FunctionType;

    if(Obj.sndData!=undefined){
        $.each(Obj.sndData, function( key , val ) {
            Obj.DATA[key]=$.trim(val);
        });
    }
    //console.log("cf_getValueData : %j" , Obj);
    cf_getJsonData(Obj);
}

function __setLoadingOption(ElementID){
    //Loadding.....
    $(ElementID).html("");
    str_html="";
    str_html+="<option value=''>Loadding.....</option>";
    $(ElementID).append(str_html);
}



function cf_getCheckData(Obj)
{    
    Obj.CALLBACK  = "__callBackToCheck";              //checkbox 형식
    if(Obj.FunctionType == 'getRptModelColor' || Obj.FunctionType =='getSearchModelColor')
    {
        Obj.CALLBACK  = "__callBackToCheckRpt";
    }
   

    Obj.URL       = '/PHP/common/commonUiData.php';        //T.key공통 기능을 Json형식으로 가져오는 PHP
    Obj.elementID = Obj.printElementID;
    //전송데이터 설정
    if(Obj.DATA == undefined) Obj.DATA = new Object;
    Obj.DATA['FunctionType'] = Obj.FunctionType;
    Obj.DATA['ViewType'    ] = 'checkbox';

    if(Obj.sndData!=undefined){
        $.each(Obj.sndData, function( key , val ) {
            Obj.DATA[key]=$.trim(val);
        });
    }
 //   console.log("cf_getValueData : %j" , Obj);
    cf_getJsonData(Obj);
}


function __callBackToCheck(jsonS,Obj)
{
    var printElementID  = $(Obj.printElementID);
    var targetElementID = Obj.targetElementID;

    var str_html = "";

    if(jsonS){
        $.each(jsonS, function( index , entry ) {
            var id = targetElementID + "_idx" + index;
            str_html += "<label class='checkbox' for='" + id + "'>";
            str_html += "<input type='checkbox' class='ckBox' id='" + id +"' name='" + targetElementID + "' value="+entry.val_id+">";
            str_html += "<span class='inp-check check'></span>";
            str_html += entry.val_txt;
            str_html += "</label>";
        });
    }
    printElementID.html("");
    printElementID.append(str_html);
}

function __callBackToCheckRpt(jsonS,Obj)
{

    var printElementID  = $(Obj.printElementID);
    var targetElementID = Obj.targetElementID;

    var str_html = "";

    var idx = 0;
    
    if(jsonS){
        $.each(jsonS, function( index , entry ) {
            var id = targetElementID + "_idx" + index;
            str_html += "<label class='checkbox' for='" + id + "'>";
            str_html += "<input type='checkbox' class='ckBox' id='" + id +"' name='" + id + "' value="+entry.val_id+" checked>";
            str_html += "<span class='inp-check check'></span>";
            str_html += entry.val_id;
            str_html += "</label>";
            idx = index; 
        });
        
        idx++;
        var id = targetElementID + "_idx" + idx;
        str_html += "<label class='checkbox' for='" + id + "'>";
        str_html += "<input type='checkbox' class='ckBox' id='" + id +"' name='" + id + "' value='기타' checked>";
        str_html += "<span class='inp-check check'></span>";
        str_html += "<font color='blue'>기타</font>";
        str_html += "</label>";
        
        idx++;
        id = targetElementID + "_idx" + idx;      
        str_html += "<label class='checkbox' for='" + id + "'>";
        str_html += "<input type='checkbox' class='ckBox' id='" + id +"' name='" + id + "' value='색상없음' checked>";
        str_html += "<span class='inp-check check'></span>";
        str_html += "<font color='red'>색상없음</font>";
        str_html += "</label>"; 
    }
    printElementID.html("");
    printElementID.append(str_html);
}

