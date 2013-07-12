/**
 * 신권한 Page 권한 가져오기
 * @author Toby Kim
 * @since 2013-03-20
 * @param getObj.URL=호출페이지 URL (location.pathname)
 * @param getObj.DEBUG=true(console로그에 화면 권한 보여줌)
 */
function cf_pageNewAuth(DEBUG){
    var DEBUG  = true;
    var sndObj         = new Object();
        sndObj.DEBUG    = DEBUG;
        sndObj.ASYNC    = false; //Page 권한은 동기식으로 작동
        sndObj.CALLBACK = "cf_pageNewAuthCallback";
        sndObj.URL      = '/PHP/common/attriCheck.php';

    var sndData         = new Object();
        sndData.MODE    = "NEWAUTH";
        sndData.PAGEURL = location.pathname;
        sndObj.DATA     = sndData;

    cf_getJsonData(sndObj);

    if(DEBUG==true){
        //Attribute Name Log
        sndData.DEBUG = DEBUG;
        sndObj.DATA   = sndData;

        cf_getJsonData(sndObj);
    }
}
//신권한 콜백
var g_NewPageAuth=""; //신권한 PAGE속성 정보
function cf_pageNewAuthCallback(jsonS,getObj){

    if(getObj.DATA.DEBUG==true){
        console.log(jsonS);
        //console.trace();
    }else{
        g_NewPageAuth=jsonS;
        if(getObj.DEBUG==true){
            console.log(jsonS);
            //console.trace();
        }
    }
}
/**
 * 신권한 Object 숨김
 * @author Toby Kim
 * @since 2013-03-21
 * @param getObj.chkTarget : 신권한 체크 대상 영역
 * @param getObj.attri     : 신권한 체크 대상 속성 (배열:해당 속성, all:Page 속성 전체)
 */
function cf_doAuthCheck(getObj){
    var chkTarget=getObj.chkTarget;
    //Loop
    var AuthCheckLoop=function(target,state){
        $(chkTarget).find('*[data-auth*='+target+']').each(function(){
            if(state=="hide"){
                $(this).hide();
            }
        });
    };

    if(getObj.attri.toString().toUpperCase()=="ALL"){     //Page 속성 전체
        $.each(g_NewPageAuth,function(key,val){
            //key : 속성명 , val : show/hide
            AuthCheckLoop(key,val);
        });
    }else{ //지정된 속성만
        $.each(getObj.attri,function(key,val){
            //key : index , val : 속성명
            var isState=g_NewPageAuth[val]; //show/hide
            AuthCheckLoop(val,isState);
        });
    }
}

/**
 * 구권한 Page 권한
 * @author Toby Kim
 * @since 2013-03-21
 * @param getObj.AUTHID=구권한필드
 */
function cf_pageOldAuth(getObj){
	
	var retValue = false;
    var sndObj = new Object();
        sndObj.AuthObj = getObj;
        sndObj.ASYNC   = false;                                    //Page 권한은 동기식으로 작동
        sndObj.URL     = '/PHP/common/attriCheck.php';

    var sndData = new Object();
        sndData.AUTHID = getObj.AUTHID;
        sndData.MODE   = "OLDAUTH";
        sndObj.DATA    = sndData;

    var jsonS=cf_getJsonData(sndObj);

    if(jsonS.Auth == 1){
    	retValue = true;
    }
    return retValue;
    
}
/** 특수권한
 *
 */
function cf_specialAuth(){
    var sndObj = new Object();
        sndObj.ASYNC   = false;                                    //Page 권한은 동기식으로 작동
        sndObj.URL     = '/PHP/common/attriCheck.php';

    var sndData = new Object();
        sndData.MODE   = "SPECIALAUTH";
        sndObj.DATA    = sndData;

    var jsonS=cf_getJsonData(sndObj);

    return jsonS['QuickSearch'];
}
/*
 * LOGIN 여부 체크 Pageinit 전에 실행 하길!!!
 */
function cf_isLogin(){
    var sndObj       = new Object();
        sndObj.ASYNC = false;                                    //Page 권한은 동기식으로 작동
        sndObj.URL   = "/PHP/common/login.php";

    var Data = cf_getJsonData(sndObj);

    if(Data == "LOGIN_OK"){

        return true;
    }else if(Data=="SERVERWORK"){

        location.href="main/server_work.html";

        return false;
    }else{

        return false;
    }
}