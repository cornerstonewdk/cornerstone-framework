/**
 * 글자수 체크
 * @author Toby Kim
 * @param str : String
 * @returns {Number}
 * @since 2013-01-14
 */
function cf_getStrLen(str){
    var n=0;
    for(var i=0;i<str.length;i++ )
    {
        var c = str.charAt(i);
        if(escape(c).length>4){
            n+=1;
        }else if(c=="\n"){
            if(str.charAt(i-1)!="\r") n+=1;
        }else if(c =="<" || c==">" ){
            n+=4;
        }else{
            n+=1;
        }
    }
    return n;
}

/**
 * Comma 찍기
 * @author Toby Kim
 * @param val
 * @returns val
 * @since 2013-01-14
 */
function cf_addComma(val){    
    var reg = /(^[+-]?\d+)(\d{3})/;
    val +="";
    while (reg.test(val))
    {
        val = val.replace(reg,"$1"+","+"$2");
    }
    return val;
}

/**
 * 숫자이외 제거
 * type : NULL  (+)정수타입
 * type : float 실수형태를 제공
 * type : dash  (-) 허용
 * @author Toby Kim
 * @param val   : String
 * @param type  : 적용형태
 * @returns val : 숫자이외 제거된 String
 * @since 2013-01-14
 */
function cf_isOnlyNumber(val,type){
    switch (type){
        case "float" : //실수   ex) -10.0001
            val=val.replace(/[^-\.0-9]/g,"");
            break;
        case "dash"  :
            val=val.replace(/[^0-9\-]/g,"");
            break;
        default : // 10000
            val=val.replace(/\D/g,"");
            break;
    };
    return val;
}

/**
 * Form 을 Object 화시킴
 * @author Toby Kim
 * @param formElemetId : FormformElemetIdID
 * @since 2013-02-25
 */
function cf_serializeArray(formElemetId){
    var FormJson=$(formElemetId).serializeArray();
    var sndData=new Object();
    $.each(FormJson, function( index , entry ) {
        if(sndData[entry.name]){
            if (!$.isArray(sndData[ entry.name ])){
                sndData[ entry.name ] = [ sndData[ entry.name ] ];
            }
            sndData[entry.name].push( entry.value );
        }else{
            sndData[entry.name] = entry.value;
        }
    });
    return sndData;
}

/**
 * Page이동
 * @author Toby Kim
 * @since 2013-02-25
 */
function cf_go2TopPage(getObj){
    if(getObj.msg) alert(getObj.msg);
    if(getObj.hrefPage){
        top.location.href=getObj.hrefPage;
    }else{
       if(getObj.historyGo=='reload'){
            location.reload();
       }else if(getObj.historyGo=='goback'){
           transScreen.cf_transScreen(true);
       }
       else{
           history.go(getObj.historyGo);
       }
    }

}

/**
 * 첫번째 문자열의 표현식을 대체문자로 변경<br>
 * 사용법 cf_printf('이름 : %s, 나이 : %s', '개발자', '18');
 * @param val 표현문자을 포함한 문자열
 * @returns 표현문자를 대체문자로 변환한 문자열
 * @author 정재열
 */
function cf_printf(val)
{
    var cnt = arguments.length;
    if(cnt < 2)
    {
        return val;
    }

    for(var i=1; i < cnt; i++)
    {
        val = val.replace(/%s/, arguments[i]);
    }
    return val;
}

/**
 * 문자열에 포함된 공백, 개행문자 제거
 * @param strTarget 문자열에 포함된 공백, 개행문자를 제거하고자하는 문자열
 * @returns {String}
 * @author 정재열
 */
function cf_removeWhiteSpace(strTarget)
{
    var    strEliminate = /\s+/g;

    if(strTarget)
    {
        return strTarget.replace(strEliminate,"");
    }
    else
    {
        return strTarget;
    }
 }

/**
 *
 * @param strSrc 소스 문자열
 * @param strOld 대체대상 문자열
 * @param strNew 대체 문자열
 * @author 정재열
 * @returns
 */
function cf_replaceAll(strSrc,strOld,strNew)
{

    var    retValue = "";

    if(strOld == null)
    {
        return strSrc;
    }
    if (strSrc != "" &&    strOld != strNew)
    {
        retValue = strSrc;

        while (retValue.indexOf(strOld)    > -1)
        {
            retValue = retValue.replace(strOld,    strNew);
        }
    }
    return retValue;
}


/**
 * 포멧 문자열 변환
 * @param strSrc 변환하고자    하는 문자열
 * @param strFormat 포멧 구분자 문자
 * @author 정재열
 * @returns {String}
 */
function cf_formatString(strSrc,strFormat)
{
    var    retValue = "";
    var    j =    0;

    var    strSrc = strSrc.replace(/(\$|\^|\*|\(|\)|\+|\.|\?|\\|\{|\}|\||\[|\]|\-|\/|\:)/g, "");
console.log("length:"+strSrc.length);
    for    (var i=0; i< strSrc.length;    i++)
    {
        retValue +=    strSrc.charAt(i);
        j++;

        if ( (j    < strSrc.length    && j < strFormat.length)
              && (strFormat.charAt(j) != "Y"
              && strFormat.charAt(j) != "M"
              && strFormat.charAt(j) != "D"
              && strFormat.charAt(j) != "9"
              && strFormat.charAt(j).toLower !=    "x"
              && strFormat.charAt(j) !=    "#")  )
        {
            retValue +=    strFormat.charAt(j++);
        }
    }
    return retValue;
}

/**
 * 소스 문자열을    포함해 원하는 위치에 공백 또는    '0'을 자리수만큼 채운 문자열
 * @param strSrc 소스 문자열을    포함해 원하는 위치에 공백 또는    '0'을 자리수만큼 채운 문자열
 * @param nSize 총 자릿수
 * @param 대체문자
 * @param bLeft 왼쪽에 위치할    것인지?    (옵션 default :    true )
 * @author 정재열
 * @returns {String}
 */
function cf_packValue(strSrc, nSize, strReplace, bLeft)
{
    var    retValue = "";
    var    preValue = "";
    var    postValue =    "";
    var    nLen = 0;
    var    i =    0;

    if(bLeft ==    null)
    {
        bLeft =    true;
    }

    if(strReplace == undefined)
    {
        strReplace = '0';
    }

    strSrc = ""    + strSrc;
    nLen = strSrc.length;
    retValue = strSrc;

    for(i =    nLen; i    < nSize; i++)
    {
        if(bLeft)
        {
            preValue +=    strReplace;
        }
        else
        {
            postValue += strReplace;
        }
    }


    retValue = preValue    + retValue + postValue;

    return retValue;
}



/**
 * 문자열의 바이트수    구하기
 * @param strSrc 소스 문자열
 * @returns {Number}
 * @author 정재열
 */
function cf_getByte(strSrc)
{
    return (strSrc.length+(escape(strSrc)+"%u").match(/%u/g).length    - 1);
}



/**
 * 문자열에 포함된 ','를 제거
 * @param strSrc 소스 문자열
 * @returns
 * @author 정재열
 */
function cf_removeComma(strSrc)
{
    return strSrc.replace(/,/gi,"");
}


/**
 * 문자열에 포함된 포멧문자 ", .    - /    :"를 제거
 * @param strSrc 소스 문자열
 * @returns
 * @author 정재열
 */
function cf_removeFormat(strSrc)
{
    if(strSrc!=undefined) return strSrc.replace(/(\,|\.|\-|\/|\:)/g,"");
    else return;
}

/**
 * cf_checkedAll
 * @param chackBoxName
 */
function cf_checkedAll(chackBoxName)
{
    var booleanVal = $('input:checkbox[name="' + chackBoxName + '"]').is(':checked');
    var elementName = chackBoxName.substring(0,chackBoxName.indexOf("_"));
    var elements = $("input:checkbox[id*='" + elementName + "_idx" +"']");

    $.each(elements, function(idx, element){
        element.checked = booleanVal;
    });
}

/**
 * 리스트 내에 체크박스 모두 선택 시 사용
 * cf_checkedAll_class
 * @param classObj : 체크박스 클레스 이름
 * @param flag : Y-모두 체크, N-모두 해제
 */
function cf_checkedAll_class(classObj,flag){
    var eleMents = $('input[type="checkbox"].'+classObj);
    var boolean;
    if(flag == 'Y'){
        boolean = true;
    }else{
        boolean = false;
    }

    $.each(eleMents, function(idx, element){
        element.checked = boolean;
    });
}

/**
 * 인자 값을 지정한 데이터타입으로 변환
 * @param sValue
 * @param type
 * @returns
 */
function cf_convert ( sValue, sDataType )
{
    if( sDataType != undefined )
    {
        type = sDataType.toLowerCase();
    }

    switch( type )
    {
    case "int":        // 정수형
        return parseInt(sValue, 10);
        break;

    case "float":    // 실수형
        return parseFloat(sValue);
        break;

    case "date":    // 데이트형
        return new Date( Date.parse(sValue) );
        break;

    default:
        return sValue.toString();
        break;
    }
}
//
///**
// * 리스트 화면 전환(corner stone)
// * @author An Hyo Seop
// * @param back : 들어오는 페이지의 element의 셀렉터나 ID 또는 클래스 ex) #obj .obj
// * @param front : 나가는 페이지의 element의 셀렉터나 ID 또는 클래스 ex) #obj .obj
// * @param type : 화면전환시 에이메이션 효과 :flip,spin,slide,slideup,slidedown,pop,fade,turn
// * @param reverse : 뒤로가기 여부 :true,false
// * @since 2013-03-12
// */
//function cf_makeMoreView(back,front,type,reverse){
//
//    console.error("cf_makeMoreView -> cf_transScreen로 변경");
//
//    var transitionType = type,
//        inTargetID = back,
//        outTargetID = front;
//    Transition.launcher({
//        transitionType:transitionType,
//        inTarget:{
//            el:inTargetID
//        },
//        outTarget:{
//            el:outTargetID
//        },
//        isReverse:reverse,
//        done:function () {
//            $(front).removeClass("current");
//            $(back).addClass("current");
//        }
//    });
//}
//
///**
// * 리스트 화면 전환(corner stone)
// * @param formElementId : Form ElementId
// * @param reverse : 뒤로가기 여부 :true,false
// *
// */
//function cf_transScreen(back, front, reverse){
//
//    console.error("cf_transScreen-> TransScreen 변경 income_list.js ");
//
//    if($(back).length == 0) console.error("back Element 확인");
//    if($(front).length == 0) console.error("front Element 확인");
//
//    var transitionType = "slide";
//    var inTargetID;
//    var outTargetID;
//
//    if(reverse == false){
//        //if($(back).attr("class") == "current") return false;
//        inTargetID  = back;
//        outTargetID = front;
//    }
//    else
//    {
//        inTargetID  = front;
//        outTargetID = back;
//    }
//
//
//    Transition.launcher({
//        transitionType:transitionType,
//        inTarget:{
//            el:inTargetID
//        },
//        outTarget:{
//            el:outTargetID
//        },
//        isReverse:reverse,
//        done:function () {
//            if(reverse==false)
//            {
//                $(front).removeClass("current");
//                $(back).addClass("current");
//            }else{
//                $(back).removeClass("current");
//                $(front).addClass("current");
//            }
//        }
//    });
//}
//


/**
 * 2개의 hash object 병합하기
 */
function cf_mergeHashData(sourceData, targetData)
{
    var retValue = new Object();

    if(sourceData != undefined)
    {
        for(key in sourceData)
        {
            retValue[key] = sourceData[key];
        }
    }

    if(targetData != undefined)
    {
        for(key in targetData)
        {
            retValue[key] = targetData[key];
        }
    }
    return retValue;
}

//체크박스 전체 체크 관련 class
flagVal = function(){
  var allCKVal = 'Y';
  var element  = null;
  this.checked = function(){
      cf_checkedAll_class('ckBox',allCKVal);
      if(allCKVal == 'N'){
          allCKVal = 'Y';
      }
      else{
          allCKVal = 'N';
      }
  }
}

//함수실행
function __doFunction(CallBackFn){
    var funcType = typeof(CallBackFn);
    if(funcType == 'function'){
        CallBackFn();
    }else{
        if(CallBackFn.indexOf(".") != -1){
            eval(CallBackFn);
        }else{
            window[CallBackFn]();    
        }        
    }
}

function cf_nvl(src, replace){
	var retValue = null;
	
	if(src == undefined || src == ''){
		if(replace != undefined){
			retValue = replace;
		}else{
			retValue = src;
		}
	}else{
		retValue = src;
	}
	return retValue;
}

function cf_nl2br(str){
    return str.replace(/\n/g,"<br/>");
}