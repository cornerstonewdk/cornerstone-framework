/**
 * depend on source
 * jquery-1.8.3.min.js
 * cf_common.js
 */

/**
 * INPUT BOX 패턴 적용
 * [data-pattern=mobile]   : Onblur 시 휴대폰 정규식
 * [data-pattern=ssn]      : Onblur 시 주민등록번호 정규식체크
 * [data-pattern=currency] : onKeyup 시 통화형태는 자동으로 comma를 표기
     - [data-minval] : 최소값
     - [data-maxval] : 최대값
 * [data-pattern=number]   : onKeyup 시 숫자만 가능하도록 함 Onblur 시 허용 최대/최소값 Validation체크
     - [data-minval] : 최소값
     - [data-maxval] : 최대값
 * @author 김도엽
 * @param elementID : #formID
 * @since 2013-01-14
 */
function cf_setRegularExpression(elementID){
    var elementID=$(elementID);
    var _find_tag=":input[data-pattern]";

    var errMsg="";
    var is_err=0;

    elementID.find(_find_tag).each(function(){
        var pattern_val=$(this).data("pattern").toString().toUpperCase();

        if(pattern_val=="MOBILE"){
            $(this).on("keyup",function(){
                $(this).val(cf_isOnlyNumber($(this).val(),"dash"));
            });
            $(this).on("blur",function(){
                if(__checkMobile($(this))==false){

                    errMsg="휴대폰번호 형식을 확인해주세요.";
                    is_err=1;
                    var ErrObj=new Object();
                    ErrObj.elementID=$(this);
                    ErrObj.errMsg=errMsg;
                    cf_setErrorMsg(ErrObj);

                    $(this).select();
                    $(this).focus();
                }else{
                    var ErrObj=new Object();
                    ErrObj.elementID=$(this);
                    cf_resetErrorMsg(ErrObj);
                }
            });
        }else if(pattern_val=="SSN"){
            $(this).on("keyup",function(){
                $(this).val(cf_isOnlyNumber($(this).val(),"dash"));
            });
            $(this).on("blur",function(){
                if(__checkSSN($(this))==false){
                    errMsg="주민등록번호 형식을 확인해주세요.";
                    is_err=1;
                    var ErrObj=new Object();
                    ErrObj.elementID=$(this);
                    ErrObj.errMsg=errMsg;
                    cf_setErrorMsg(ErrObj);

                    $(this).select();
                    $(this).focus();
                }else{
                    var ErrObj=new Object();
                    ErrObj.elementID=$(this);
                    cf_resetErrorMsg(ErrObj);
                }
            });
        }else if(pattern_val=="CURRENCY"){
            $(this).addClass("textRight");
            $(this).on("keyup",function(){
                $(this).val(__checkCurrency($(this).val()));
            });
            $(this).on("blur",function(){
                __checkMinMax($(this),"float",pattern_val);
            });
        }else if(pattern_val=="NUMBER"){
            $(this).on("keyup",function(){
                $(this).val(cf_isOnlyNumber($(this).val()));
            });
            $(this).on("blur",function(){
                __checkMinMax($(this));
            });
        }
    });
}

/**
 * 휴대폰 번호 정규식 체크
 * @author 김도엽
 * @param val
 * @return bool
 * @since 2013-01-14
 */
function __checkMobile(elementID){
    var val=elementID.val();
    val=cf_isOnlyNumber(val);

    if(val.toString().length>0){ //휴대폰번호를 입력을 해야 적용
        Mobile_regular_expression=cf_removeWhiteSpace(val).match(/^01[016789]{1}[1-9]{1}[0-9]{2,3}[0-9]{4}$/);
        if(Mobile_regular_expression!=undefined){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    }
}

/**
 * 주민등록번호 체크
 * 주민등록번호 앞 7자리까지만 체크
 * @author 김도엽
 * @param val
 * @return bool
 * @since 2013-01-14
 */
function __checkSSN(elementID){
    var val=elementID.val();
    val=cf_isOnlyNumber(val);

    if(val.toString().length>0){
        if(val.toString().length<7){
            return false;
        }

        var gender=val.substring(6,7);

        //    ** 9: 1800 ~ 1899년에 태어난 남성
        //    ** 0: 1800 ~ 1899년에 태어난 여성
        //    ** 1: 1900 ~ 1999년에 태어난 남성
        //    ** 2: 1900 ~ 1999년에 태어난 여성
        //    ** 3: 2000 ~ 2099년에 태어난 남성
        //    ** 4: 2000 ~ 2099년에 태어난 여성
        //    ** 5: 1900 ~ 1999년에 태어난 외국인 남성
        //    ** 6: 1900 ~ 1999년에 태어난 외국인 여성
        //    ** 7: 2000 ~ 2099년에 태어난 외국인 남성
        //    ** 8: 2000 ~ 2099년에 태어난 외국인 여성
        var add_year_txt="";
        if(gender=="1" || gender=="2" || gender=="5" || gender=="6") add_year_txt="19";
        else if(gender=="3" || gender=="4" || gender=="7" || gender=="8") add_year_txt="20";
        else if(gender=="9" || gender=="0") add_year_txt="18";

        var yyyymmdd=add_year_txt+val.substring(0,6);

        if(cf_validDate(yyyymmdd)==false){
            return false;
        }else{
            return true;
        }
    }else{
        if(val.toString().length==0) elementID.val("");
        return true;
    }
}

/**
 * 숫자(통화)타입체크
 * @author 김도엽
 * @param val
 * @return Comma(,)가 붙은 숫자형태
 * @since 2013-01-14
 */
function __checkCurrency(val){
    val=cf_isOnlyNumber(val,"float");
    return cf_addComma(val);
}


/**
 * 허용되는 최소값 최대값 Vaildation 체크
 * @author 김도엽
 * @param elementID
 * @since 2013-01-14
 */
function __checkMinMax(elementID,type,pattern_val){
    var errMsg="";
    var is_err=0;
    if(elementID.val().length>0){
        var val=cf_isOnlyNumber(elementID.val(),type);

        if(type=='float') val=cf_convert(cf_removeWhiteSpace(val.toString()),"float");
        else val=cf_convert(cf_removeWhiteSpace(val.toString()),"int");

        if(val.toString()!="NaN"){
            var min=elementID.data("minval");
            var max=elementID.data("maxval");

            if(pattern_val=="CURRENCY") ret_val=__checkCurrency(val.toString());
            else ret_val=val;

            if(min==undefined && max==undefined){
                elementID.val(ret_val);
            }else{
                if(val<min){
                    errMsg="입력 값이 [최소값:"+min +"] 보다 작습니다.";
                    is_err=1;
                    var ErrObj=new Object();
                    ErrObj.elementID=elementID;
                    ErrObj.errMsg=errMsg;
                    cf_setErrorMsg(ErrObj);

                    elementID.val(ret_val);
                    elementID.focus();
                    elementID.select();
                }else if(val>max){
                    errMsg="입력 값이 [최대값:"+max +"] 보다 큽니다.";
                    is_err=1;
                    var ErrObj=new Object();
                    ErrObj.elementID=elementID;
                    ErrObj.errMsg=errMsg;
                    cf_setErrorMsg(ErrObj);

                    elementID.val(ret_val);
                    elementID.focus();
                    elementID.select();
                }else{
                    elementID.val(ret_val);
                }
            }
        }else{
            elementID.val("");
        }

        //Error창 초기화
        if(is_err==0){
            var ErrObj=new Object();
            ErrObj.elementID=elementID;
            cf_resetErrorMsg(ErrObj);
        }

    }
}