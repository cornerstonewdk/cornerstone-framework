/**
 * ajax 통신으로 json형식으로 만들어진 리스트를 가져온다
 * @param obj 검색 파라메터값
 */
function cf_getJsonData(obj){
    var ASYNC = true;
    var returnJson="";
    var retFlag=true;
    var isSpinner=true;
    
    if(obj.isSpinner!=undefined) isSpinner=obj.isSpinner;
    ASYNC = obj.ASYNC;

    /**CookieData***************************/
    var cook=cf_getSessionStorage("cook");
    if(cook){
        if(obj.DATA==undefined) obj.DATA=new Object();
        //var cook_sndData=cf_getDecrypt(cook);
        //$.each(cook_sndData, function( key , val ) {
        //        obj.DATA[key]=val;
        //});
		obj.DATA=cf_mergeHashData(obj.DATA,cook);
    }	
    /*********************************************/
//    try{
        $.ajax({
             type:"POST"
            ,url: obj.URL
            ,cache: false
            ,headers:{"cache-control":"no-cache","pragma":"no-cache"}
            ,async: ASYNC
            ,dataType:"json"
            ,timeout:0
            ,data: obj.DATA
            ,beforeSend:function(){                
                if(obj.elementID==undefined){
                    //makeGrid 일경우 스피너제외
                    if(isSpinner) $("body").spinner("show");
                }else{
                	if(isSpinner) $(obj.elementID).closest('div').spinner("show");
                }
            }
            ,error: function(jqXHR){
                alert('서버와 통신이원할하지않습니다.\nreadyState:'+jqXHR.readyState+'\nstatus:'+jqXHR.status);
                //빈공백 2칸 -> 빈공백 1칸 으로 변환해서 찍음...Log 보기 편하게;
				/*
				readyState 
				0 : Uninitialized  - 초기화되지 않은 상태 open 이전
				1 : Loading        - open 실행후 send 실행 이전
				2 : Loaded         - send 실행후  status 와 header 는 도착전
				3 : Interactive    - 데이터 일부를 받은 상태
				4 : Complete       - 데이터를 전부 받은 상태, 완전한 데이터 이용가능

				status 
				200 : Ok
				403 : Forbidden
				404 : Not Found
				500 : Internal Server Error 
				*/
                console.error(cf_replaceAll(jqXHR.responseText,'  ',' '));				
                return;
            }
            ,success : function(jsonS) {
               returnJson=jsonS;               
                //Error 체크
                cf_jsonErrorChk(returnJson);

                if(obj.CALLBACK != undefined){
                    var funcType = typeof(obj.CALLBACK);
                    if(funcType == 'function'){
                        obj.CALLBACK(returnJson,obj);
                    }else{
                        window[obj.CALLBACK](returnJson,obj);
                    }
                    retFlag=false;
                }                
            }
            ,complete:function(){
                if(obj.elementID==undefined){
                    //makeGrid 일경우 스피너제외
                    if(isSpinner)  $("body").spinner("hide");
                }else{
                    $(obj.elementID).closest('div').spinner("hide");
                }                
            }
        });

        if(retFlag) return returnJson;
//    }catch(e){
//        console.log(e); 
//    }
}

/**
 * 서버에서 수신한 데이터를 파싱한 데이터를 입력 받아 에러 데이터인지 확인하는 함수
 */
function cf_isValidResponse( response ){
    if( response == null || response == undefined ){
        return true;
    }
    else{
        if( response.error == null || response.error == undefined ){
            return true;
        }
    }
    return false;
}
/**
 * 서버에서 수신한 데이터를 파싱하여 알림창(성공 or 에러)를 팝업하는 함수
 */
function cf_alertResponse(msg){
    var response = eval(msg);
    if( cf_isValidResponse( response ) ){
        alert("정상적으로 처리 되었습니다.");
        return true;
    }
    else{
        alert( response.error );
        return false;
    }
}