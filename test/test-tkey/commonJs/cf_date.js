/**
 * 유효일자체크
 * 
 * @author Toby Kim
 * @param iDate :
 *            일자형태 20120101 , 2012-01-01
 * @since 2013-01-14
 */
function cf_validDate(iDate) {
    // 입력된 Date 를 숫자만 남김
    iDate = cf_isOnlyNumber(iDate);

    // 입력된 글자수가 8자 이하 일경우 오류
    if (iDate.length != 8) {
        return false;
    }
    // 유효일자 체크
    oDate = new Date();
    oDate.setFullYear(iDate.substring(0, 4));
    oDate.setMonth(cf_convert(iDate.substring(4, 6), "int") - 1);
    oDate.setDate(iDate.substring(6));
    if (oDate.getFullYear() != iDate.substring(0, 4)
            || oDate.getMonth() + 1 != iDate.substring(4, 6)
            || oDate.getDate() != iDate.substring(6)) {
        return false;
    }
    return true;
}

/**
 * 월의마지막 일자 가져오기
 * 
 * @param val :
 *            YYYY-MM-DD
 * @author Toby Kim
 * @since 2013-02-25
 */
function cf_getLastDateInMonth(val) {
    var dateVal = cf_removeFormat(val);
    var year = dateVal.toString().substring(0, 4);
    var month = cf_convert(dateVal.toString().substring(4, 6), "int") - 1;

    var is_leapYear = false;
    if ((((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))) {
        is_leapYear = true;
    }

    return [ 31, (is_leapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
}

/**
 * 일자세팅 : 오늘 기준으로 몇일
 * 
 * @author Toby Kim
 * @param ElementID :
 *            일자표시
 * @param Diff :
 *            오늘로 부터 차이 (d+1,d-1,m+1,m-1,y+1,y-1....)
 * @since 2013-02-25
 */
function cf_setDate(ElementID, Diff) {
    var year = '';
    var month = '';
    var day = '';
    var today = new Date();

    if (Diff == undefined)
        Diff = "x+0";

    var DateType = Diff.substring(0, 1).toUpperCase();
    var DateDiff = cf_convert(Diff.substring(1), "int");

    switch (DateType) {
    case "D": // 일
        year = today.getUTCFullYear();
        month = today.getUTCMonth();
        day = today.getUTCDate() + DateDiff;
        break;
    case "M": // 월
        year = today.getUTCFullYear();
        month = today.getUTCMonth() + DateDiff;
        day = today.getUTCDate();
        break;
    case "Y": // 년
        year = today.getUTCFullYear() + DateDiff;
        month = today.getUTCMonth();
        day = today.getUTCDate();
        break;
    default:
        year = today.getUTCFullYear();
        month = today.getUTCMonth();
        day = today.getUTCDate();
        break;
    }

    var dateVal = new Date(Date.UTC.apply(Date, [ year, month, day ]));

    var retVal = cf_packValue(dateVal.getUTCFullYear(), '4', '0') + '-'
            + cf_packValue((dateVal.getUTCMonth() + 1), '2', '0') // 월은 0~11 로 표현 +1 로해줘야함
            + '-' + cf_packValue(dateVal.getUTCDate(), '2', '0');

    $(ElementID).val(retVal);
}

/**
 * 일자변경 Teco
 */
function cf_Teco_date_in(v_m_gubun,v_date_in){
    var input_date=Number(cf_isOnlyNumber(v_date_in.val()));
    var today = new Date();    
        today = Number(cf_packValue(today.getUTCFullYear(), '4', '0') 
                + cf_packValue((today.getUTCMonth() + 1), '2', '0') // 월은 0~11 로 표현 +1 로해줘야함
                + cf_packValue(today.getUTCDate(), '2', '0'));
    
    if(v_m_gubun==0) return true;
    
    if(today<=input_date){
        var ErrObj = new Object();
        ErrObj.MODE = 'alert';
        ErrObj.elementID = v_date_in;
        ErrObj.errMsg = "T-ECO폰은 당일을 포함한 이후 날짜는 등록 할 수 없습니다.";
        cf_setErrorMsg(ErrObj);
        return false;
    }
    return true;
}


function cf_getNowDateTime() {
    var retValue = '';

    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    var date = nowDate.getDate();
    var hours = nowDate.getHours();
    var minutes = nowDate.getMinutes();

    retValue = year + '년' + cf_packValue(month, '2', '0') + '월'
            + cf_packValue(date, '2', '0') + '일' + ' '
            + cf_packValue(hours, '2', '0') + ':'
            + cf_packValue(minutes, '2', '0');

    return retValue;
}

function cf_getObjDate(strYYYYMMDD) {
    // 인자값이 입력되지 않았을 경우
    if (strYYYYMMDD == undefined || strYYYYMMDD.length == 0) {
        return new Date();
    } else {
        var strYYYYMMDD = cf_removeFormat(strYYYYMMDD);

        if (strYYYYMMDD.length == 8) {
            var strYear = strYYYYMMDD.substring(0, 4);
            var strMonth = strYYYYMMDD.substring(4, 6) - 1;
            var strDay = strYYYYMMDD.substring(6, 8);

            return new Date(strYear, strMonth, strDay);
        } else {
            return null;
        }
    }
};

function cf_getIntervalDay(strFromDate, strToDate) {
    var objFromDate = cf_getObjDate(strFromDate);
    var objToDate = cf_getObjDate(strToDate);

    // MilliSconds * Sconds * Minutes * Hours
    var nDay = 1000 * 60 * 60 * 24;

    return parseInt((objToDate - objFromDate) / nDay, 10);
};

/**
 * 해당 년월 세팅
 * 
 * @author P024390
 * @param ElementID :
 *            월표시앨리먼트
 * @since 2013-04-12
 */
function cf_setThisMonth(ElementID) {

    var today = new Date();

    var year = today.getUTCFullYear();
    var month = today.getUTCMonth();
    var day = today.getUTCDate();

    var dateVal = new Date(Date.UTC.apply(Date, [ year, month, day ]));

    var retVal = cf_packValue(dateVal.getUTCFullYear(), '4', '0') + '-'
            + cf_packValue((dateVal.getUTCMonth() + 1), '2', '0');

    $(ElementID).val(retVal);
}

/**
 * FH_agency 전월1일세팅까지 달력세팅 (등록화면)
 */
function cf_fh_agency_date(FormId) {
    var getMinMaxObj = cf_chkInputLimitDate();
    
    if(!getMinMaxObj) return;

    $(FormId + " input[data-dtpicker]").each(function() {
        $(this).data("mindate", getMinMaxObj.mindate);
        $(this).data("maxdate", getMinMaxObj.maxdate);
    });
}

/**
 * 일자제한 (현황 막기)
 */
function cf_chkDateLimitList(objElement) {
    /* 작업예정 */
    var trElement = $(objElement).closest("tr");
    var getMinMaxObj = cf_chkInputLimitDate();
    
    if(!getMinMaxObj) return true;

    var minDate = getMinMaxObj.mindate.replace(/-/g, '');
    var maxDate = getMinMaxObj.maxdate.replace(/-/g, '');
    var input_date = '';
    var retVal = true;
    var ErrObj = new Object();
    ErrObj.errMsg="";

//    $(trElement + " .class_chk_date").each(
    $(".class_chk_date", trElement).each(
        function() {
            input_date = $(this).text().replace(/-/g, '');
            
            if (input_date != '') {
                if (input_date.length == 6) {
                    var VminDate = minDate.substr(2);
                    var VmaxDate = maxDate.substr(2);
                }
                input_date = $.trim(input_date);
                VminDate = $.trim(VminDate);
                VmaxDate = $.trim(VmaxDate);
                
    
                if (Number(input_date) < Number(VminDate)) {
                    ErrObj.errMsg = VminDate + ' 이전 날짜 데이터는 등록,수정,삭제 할 수 없습니다. 입력된날짜['+ input_date + ']';
                    ErrObj.MODE = "dialog";
                    retVal = false;
                } else if (Number(input_date) > Number(VmaxDate)) {
                    ErrObj.errMsg = ' 오늘날짜 이후 데이터는 등록,수정,삭제 할 수 없습니다. 입력된날짜['+ input_date + ']';
                    ErrObj.MODE = "dialog";    
                    retVal = false;
                }
            }
        });
    if(ErrObj.errMsg != "") {
        cf_setErrorMsg(ErrObj);
    }

    return retVal;
}

/**
 * FH_AGENCY 일자제한 min/max date
 */
function cf_chkInputLimitDate() {
    if (cf_fh_agency()) { // 전월 1일 ~ 오늘까지만
        var today = new Date();

        // minDate 설정
        year = today.getUTCFullYear();
        month = today.getUTCMonth() - 1; // 전월
        day = 1; // 1일
        var dateVal = new Date(Date.UTC.apply(Date, [ year, month, day ]));
        var mindate = cf_packValue(dateVal.getUTCFullYear(), '4', '0') + '-'
                + cf_packValue((dateVal.getUTCMonth() + 1), '2', '0') // 월은 0~11 로 표현+1 로해줘야함
                + '-' + cf_packValue(dateVal.getUTCDate(), '2', '0');

        // maxDate 설정 -- 오늘
        year = today.getUTCFullYear();
        month = today.getUTCMonth();
        day = today.getUTCDate();
        var dateVal = new Date(Date.UTC.apply(Date, [ year, month, day ]));
        var maxdate = cf_packValue(dateVal.getUTCFullYear(), '4', '0') + '-'
                + cf_packValue((dateVal.getUTCMonth() + 1), '2', '0') // 월은 0~11 로 표현 +1 로해줘야함
                + '-' + cf_packValue(dateVal.getUTCDate(), '2', '0');

        var retObj = new Object();
        retObj.mindate = mindate;
        retObj.maxdate = maxdate;        

        return retObj;
    } else {
        return false;
    }
}

/**
 * 등록가능일자설정
 */
function cf_limit_date() {
    var cook = cf_getSessionStorage("cook");
    var sndObj = {};
    sndObj.cook_limit_date = cook.cook_limit_date;
    var getLimitDate = cf_getDecrypt(sndObj);
    var limit_date = getLimitDate.cook_limit_date;
    var maxDate = "";

    if (limit_date) {
        var today = new Date();
        year = today.getUTCFullYear();
        month = today.getUTCMonth();
        day = Number(today.getUTCDate()) + Number(limit_date);

        dateVal = new Date(Date.UTC.apply(Date, [ year, month, day ]));

        maxDate = cf_packValue(dateVal.getUTCFullYear(), '4', '0') + '-'
                + cf_packValue((dateVal.getUTCMonth() + 1), '2', '0') // 월은 0~11 로 표현 +1 로해줘야함
                + '-' + cf_packValue(dateVal.getUTCDate(), '2', '0');
    }
    return maxDate;
}

/**
 * 일자 차이 FromDate,ToDate,Diff Month: 1 1개월 2개월 ... 1개월은 무조건 31일로 함...
 */
function cf_DateDiff(sDate, eDate, diffMonth) {
    fromDate = sDate.val();
    toDate = eDate.val();
    
    if (cf_validDate(fromDate) && cf_validDate(toDate)) {
        fromDate = cf_isOnlyNumber(fromDate);
        toDate   = cf_isOnlyNumber(toDate);
        fromDate = new Date(fromDate.substring(0, 4), cf_convert(fromDate.substring(4, 6), "int") - 1, fromDate.substring(6));
        toDate   = new Date(toDate.substring(0, 4)  , cf_convert(toDate.substring(4, 6)  , "int") - 1, toDate.substring(6));

        var dateDiff = Math.abs(toDate - fromDate) / (1000 * 60 * 60 * 24);

        if (!diffMonth)
            diffMonth = 1;

        if (Number(dateDiff) * Number(diffMonth) > 31 * Number(diffMonth)) {
            var ErrObj = new Object();
            ErrObj.errMsg = "검색조건이 " + diffMonth + "개월 이상 차이가 납니다.<BR>" + diffMonth + "개월 이내로 입력하세요";
            //ErrObj.MODE = "dialog";
            ErrObj.elementID=sDate;
            cf_setErrorMsg(ErrObj);

            cf_setDate(sDate, 'D-2');
            cf_setDate(eDate, 'D-0');
            
            return false;
        }
    } else {
        var ErrObj = new Object();
        ErrObj.errMsg = '일자가 유효하지 않습니다.';
        //ErrObj.MODE = "dialog";
        ErrObj.elementID=sDate;
        cf_setErrorMsg(ErrObj);
        return false;
    }
    
    return true;
}

/**
 * 삭제/수정시 기간체크
 * date : 삭제/수정 대상 데이터의 날짜 / type : '삭제','수정' 문구
 */
function cf_limit_date_check(date, type) {
    var limit_date = cf_limit_date();
    if (!limit_date) {
        limit_date = '000000';
    }

    if (date <= limit_date) {
        ErrObj = new Object();
        ErrObj.MODE = 'dialog';
        ErrObj.CALLBACK = "";
        ErrObj.historyGo = "";
        ErrObj.errMsg = "고객님께서 " + type + "가능한 기간은 " + limit_date + " 일 이전으로 제한되어 있습니다";
        cf_setErrorMsg(ErrObj);
        return false;
    } else {
        return true;
    }
}