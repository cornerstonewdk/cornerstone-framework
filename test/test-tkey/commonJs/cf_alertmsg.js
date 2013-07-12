/**
 * CornerStone용 에러박스
 * @author Toby Kim
 * @param ErrObj.elementID : ElementID <selector>
 * @param ErrObj.errMsg : 에러MSG String
 * @param ErrObj.mode   :  dialog : 모달 ,tip 툴팁(뻘건색) , 없으면 alert(코너스톤 Alerts)
 * @since 2013-02-26
 */
function cf_setErrorMsg(ErrObj){
    var strError='';
    if(ErrObj.MODE)      var mode=ErrObj.MODE;
    if(ErrObj.errMsg)    var ErrMsg=ErrObj.errMsg;
    if(ErrObj.elementID) var ElementID=ErrObj.elementID;
    if(ErrObj.CALLBACK)  var CALLBACK_FN=ErrObj.CALLBACK;
    
    switch (mode){
        case 'dialog':
        {
            $("body:first").find(".errMsg").remove();            
            strError+='<div class="modal fade errMsg modal-wrap" id="errModal" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">';
            strError+='    <div class="modal-header">';
            strError+='        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
            strError+='        <h3 id="myModalLabel">알림!</h3>';
            strError+='    </div>';
            strError+='    <div class="modal-body">';
            strError+='        <div class="innerbox">';            
            strError+='            <p>'+ErrMsg+'</p>';
            strError+='        </div>';            
            strError+='    </div>';
            strError+='    <div class="modal-footer">';
            strError+='        <button class="btn btn-bigtype02" data-dismiss="modal" aria-hidden="true">닫기</button>';
            strError+='    </div>';            
            strError+='</div>';
            
            //$("#divModal").html(strError);
            $("body:first .container-fluid").append(strError);



            $("#errModal").modal("hide").on("show", function(event) {
                //console.log("show");
                //event.preventDefault();
            }).on("shown", function(event) {
                //console.log("shown");
                //event.preventDefault();
            }).on("hide", function(event) {
                //console.log("hide");
                //event.preventDefault();
            }).on("hidden", function(event) {
                $('#errModal').remove();
//                if(CALLBACK_FN){
//                    window[CALLBACK_FN](ErrObj);
//                }else{
//                }
                if(CALLBACK_FN){
	                var funcType = typeof(CALLBACK_FN);
	                if(funcType == 'function'){
	                	CALLBACK_FN();
	                }else{
	                    if(CALLBACK_FN.indexOf(".") != -1){                    	
	                        eval(CALLBACK_FN+"()");
	                    }else{
	                        window[CALLBACK_FN](ErrObj);    
	                    }        
	                }
                }
                
                //event.preventDefault();
            });
            $("#errModal").modal("toggle");

            break;
        }
        case "tip":
        {
            ElementID.closest('div.controls').find(".errMsg").remove();

            strError='<span class="help-inline errMsg">'+ErrMsg+'</span>';

            ElementID.closest('div.controls').append(strError);
            ElementID.closest('div.controls').addClass('error');
            break;
        }
        default:
        {	
        	console.log(ElementID);
            ElementID.closest('div.controls').find(".errMsg").remove();

            strError ='<div class="alert alert-error errMsg">';
            strError+='    <button type="button" class="close" data-dismiss="alert">×</button>';
            strError+='    <strong>'+ErrMsg+'</strong>';
            strError+='</div>';

            ElementID.closest('div.controls').append(strError);
            break;
        }
    }
}
/**
 * CornerStone용 에러박스 초기화
 * @author Toby Kim
 * @param ErrObj.elementID : ElementID <selector>
 * @param ErrObj.mode :  dialog : 모달 ,tip 툴팁(뻘건색) , 없으면 alert(코너스톤 Alerts)
 * @since 2013-02-26
 */
function cf_resetErrorMsg(ErrObj){
    if(ErrObj.MODE)      var mode=ErrObj.MODE;
    if(ErrObj.elementID) var ElementID=ErrObj.elementID;

    switch(mode){
        case "dialog":
        {
            if($(document).find(".errMsg").length>0){            
                $(document).find(".errMsg").remove();
            }
            break;
        }
        case "tip":
        {
            if(ElementID.closest('div.controls').find(".errMsg").length>0){
                ElementID.closest('div.controls').removeClass('error');
                ElementID.closest('div.controls').find(".errMsg").remove();
            }
            break;
        }
        default:
        {
            if(ElementID.closest('div.controls').find(".errMsg").length>0){
                ElementID.closest('div.controls').find(".errMsg").remove();
            }
            break;
        }
    }
}

/**
 * Form Object 변경시 Error창 초기화
 * @param formID
 * @author Toby Kim
 * @since 2013-03-21
 */
function cf_initFormObjectError(FormID){
    $(FormID).on("change",function(event){
        var ErrObj=new Object();
            ErrObj.elementID=$('#'+event.target.id,FormID);
        cf_resetErrorMsg(ErrObj);
    });
}

/**
 * Error 처리 Script
 * @author Toby Kim
 * @since 2013-02-01
 */
function cf_jsonErrorChk(JsonS){
    if(JsonS){
        var ErrObj=new Object();
        ErrObj.errMsg=JsonS.ErrorMsg;

        if(JsonS.ErrorCODE){
            if(JsonS.ErrorAction=="" || JsonS.ErrorAction==undefined){
                //dialog만 띄움
            }else if(JsonS.ErrorAction=="reload" || JsonS.ErrorAction=="goback"){
                ErrObj.historyGo=JsonS.ErrorAction;
                ErrObj.CALLBACK="cf_go2TopPage";
            }else{
                ErrObj.hrefPage=JsonS.ErrorAction;
                ErrObj.CALLBACK="cf_go2TopPage";
            }
            ErrObj.MODE="dialog";
        }

        //Error 코드가 있을 경우에만 실행
        if(JsonS.ErrorCODE){
            cf_setErrorMsg(ErrObj);
        }
    }
}

