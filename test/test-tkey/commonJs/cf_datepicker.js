/**
 * @author Toby Kim
 * 2012-12-20
 * <INPUT type="TEXT" data-dtpicker="*" data-mindate="*" data-maxdate="*" data-datelink="*">
 * cf_common.js
 */
/**
 * 달력 붙이기
 * @param _target : 달력기능 추가 부분설정
 * [data-dtpicker="*"] day: 일자달력 , month: 월달력
 */
function cf_setDtpicker(elementID){
    //_target vaidation 추가 예정
    var _find_tag="input[data-dtpicker]";
    var elements=$(elementID+" "+_find_tag);
    for(var i=0,cnt=elements.length;i<cnt;i++){
        var element=elements.eq(i);
        var eleDatePicker=element.data("dtpicker").toUpperCase();
        element.prop("readonly",true);
        
        if(eleDatePicker=="DAY") __datepicker(element);
        else if (eleDatePicker=="MONTH") __monthpicker(element);
    }
}

/**
 * 일자 validation 체크
 * [data-mindate="yyyymm[dd]"] 입력가능 최소일자
 * [data-maxdate="yyyymm[dd]"] 입력가능 최대일자
 * [data-datelink="elementID"] elementID 일자보다 이후 일자만 가능(같은일자 포함)
 * @param elementID
 * @param DayMonth_type
 */
function __MinMaxDate_Validation(elementID,DayMonth_type){
    var ValidVal="";
    var errMsg="";
    var is_err=0;
    var thisVal=cf_removeFormat(elementID.val());
    var lastDate=cf_getLastDateInMonth(thisVal);

    if(DayMonth_type.toString().toUpperCase()=="MONTH") ValidVal=thisVal+lastDate;
    else ValidVal=thisVal;


    if(cf_removeWhiteSpace(ValidVal)!="" && ValidVal!='undefined'){
        if(cf_validDate(ValidVal)==true){
            var MaxDate=cf_removeFormat(elementID.data("maxdate"));
            var MinDate=cf_removeFormat(elementID.data("mindate"));
            var datelink=elementID.data("datelink");

            if(MaxDate!=undefined && MaxDate!=''){
                if(ValidVal>MaxDate){
                    var year  = MaxDate.toString().substring(0,4);
                    var month = MaxDate.toString().substring(4,6);
                    var day   = MaxDate.toString().substring(6,8);

                    errMsg="입력가능일자 ["+year+"-"+month;
                    if(DayMonth_type.toString().toUpperCase()=="DAY"){
                        errMsg+="-"+day+"]";
                    }else{
                        errMsg+="]";
                    }
                    errMsg+="보다 선택일자가 이후 입니다.";

                    is_err=1;

                    var ErrObj=new Object();
                    ErrObj.elementID=elementID;
                    ErrObj.errMsg=errMsg;
                    cf_setErrorMsg(ErrObj);
                    elementID.val("");
                }
            }
            if(MinDate!=undefined && MinDate!='' && is_err==0){
                if(ValidVal<MinDate){
                    var year  = MinDate.toString().substring(0,4);
                    var month = MinDate.toString().substring(4,6);
                    var day   = MinDate.toString().substring(6,8);

                    errMsg="입력가능일자 ["+year+"-"+month;
                    if(DayMonth_type.toString().toUpperCase()=="DAY"){
                        errMsg+="-"+day+"]";
                    }else{
                        errMsg+="]";
                    }
                    errMsg+="보다 선택일자가 이전 입니다.";

                    is_err=1;
                    var ErrObj=new Object();
                    ErrObj.elementID=elementID;
                    ErrObj.errMsg=errMsg;
                    cf_setErrorMsg(ErrObj);
                    elementID.val("");
                }
            }
            if(datelink!=undefined && datelink!='' && is_err==0){
                var target_elementID=$('#'+datelink);
                var target_val=target_elementID.val();

                if(target_val!=undefined){
                    target_val=cf_removeFormat(target_val);

                    if(cf_removeWhiteSpace(target_elementID.val().toString())==""){
                        errMsg="시작 일자가 입력되지 않았습니다.";
                        is_err=1;
                        var ErrObj=new Object();
                        ErrObj.elementID=elementID;
                        ErrObj.errMsg=errMsg;
                        cf_setErrorMsg(ErrObj);

                        elementID.val("");
                        //target_elementID.focus();
                    }
                    if(ValidVal<target_val){
                        var year  = target_val.toString().substring(0,4);
                        var month = target_val.toString().substring(4,6);
                        var day   = target_val.toString().substring(6,8);

                        if(datelink=='last_date') errMsg="최종이력일자";
                        else errMsg="";
                        errMsg+="["+year+"-"+month;
                        if(DayMonth_type.toString().toUpperCase()=="DAY"){
                            errMsg+="-"+day+"]";
                        }else{
                            errMsg+="]";
                        }
                        errMsg+="보다 이전 일자를 선택 하였습니다.";

                        is_err=1;
                        var ErrObj=new Object();
                        ErrObj.elementID=elementID;
                        ErrObj.errMsg=errMsg;
                        cf_setErrorMsg(ErrObj);
                        elementID.val("");
                    }
                }
            }
        }else{
            errMsg="입력된 ["+elementID.val()+"]는 유효한 일자가 아닙니다.\n일자를 확인하세요.";

            is_err=1;
            var ErrObj=new Object();
            ErrObj.elementID=elementID;
            ErrObj.errMsg=errMsg;
            cf_setErrorMsg(ErrObj);


            elementID.val("");
        }
    }
    if(is_err==0){
//        var ErrObj=new Object();
//        ErrObj.elementID=elementID;
//        cf_resetErrorMsg(ErrObj);
        return true;
    }else{
        return false;
    }
}

/**
 * 일자 달력
 * @param element
 */
function __datepicker(elementID){
    /*
    var datepicker_options = {
        language:"ko",
        format:"yyyy-mm-dd",
        firstDisable: true,
        changeDisplay: true,
        autoclose: true
    };
    elementID.datepicker(datepicker_options)
    .on("hide",function(e){
        __MinMaxDate_Validation(elementID,"day");
    });
    */

    //minDate = FH_AGENCY 포함대리점은 전월 1일 까지 입력
    //maxDate = FH_AGENCY 포함대리점은 최대일자는 오늘까지
    //          FH_AGNECY 미포함대리점은 cook_limit_date 까지 입렵가능
    var minDate=elementID.data('mindate');
    var maxDate=elementID.data('maxdate');
    if(!maxDate)
    {
        maxDate=cf_limit_date();
    }
    var datepicker_options = {
         dateFormat      : "yy-mm-dd"
        ,showOn          : "both"
        //,buttonImage     : ""
        //,buttonImageOnly : true
        ,buttonText      : ''
        ,minDate         : minDate
        ,maxDate         : maxDate
        ,yearRange       : "c-2:c+2"
        ,shortYearCutoff : "+3"
        ,changeYear      : true
        ,changeMonth     : true
        ,dayNamesMin     : [ "일", "월", "화", "수", "목", "금", "토" ]
        ,monthNamesShort : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ]
        ,onClose         : function(){
            return __MinMaxDate_Validation(elementID,"day");
        }
    };
    elementID.datepicker(datepicker_options);
}
/**
 * 월 달력
 * @param element
 */
function __monthpicker(elementID){
    /*
    var monthpicker_option = {
        language:"ko",
        format:"yyyy-mm",
        startView:1,
        firstDisable: true,
        changeDisplay: true
    };

    elementID.datepicker(monthpicker_option)
    .on("changeMonth",function(e){
        var dp=$(e.currentTarget).data('datepicker');
        dp.date=e.date;
        dp.setValue();

        dp.hide();
    })
    .on("hide",function(e){
        __MinMaxDate_Validation(elementID,"month");
    });
    */
    var monthpicker_option = {
         dateFormat      : "yy-mm"
        ,showOn          : "both"
        //,buttonImage     : "#"
        //,buttonImageOnly : true            
        ,buttonText      : ''        
        ,yearRange       : "c-2:c+2"
        ,shortYearCutoff : "+3"
        ,monthNamesShort : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ]
        ,onClose         : function(){
            return __MinMaxDate_Validation(elementID,"month");
            
        }
    };
    elementID.monthpicker(monthpicker_option);
}

