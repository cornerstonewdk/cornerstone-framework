var g_TcInput = function(){};
function cf_TcInput(FormID,numEleID,CodeEleID,modelEleID,subagencyEleID,dateEleID)
{
    var str_tag="<div class='control-group' id='is_chargerDiv'>"
        +"  <label class='control-label'>자동일련번호입력</label>"
        +"  <div class='controls'>"        
        +"    <input type='radio' value='ASC' id='is_charger_idx0' name='is_charger'/>"
        +"    <span class='inp-radio'></span>"
        +"    <label class='radio'>충전기 선입고선출고</label>"        
        +"    <input type='radio' value='DESC' id='is_charger_idx1' name='is_charger'/>"
        +"    <span class='inp-radio'></span>"
        +"    <label class='radio'>충전기 후입고선출고</label>"
        +"    <input type='radio' value='CANCEL' id='is_charger_idx2' name='is_charger'/>"
        +"    <span class='inp-radio'></span>"
        +"    <label class='radio'>취소 </label>"
        +"  </div>"
        +"</div>";

    if($(numEleID,FormID).val()>1 && $(FormID).find("#is_chargerDiv").length==0){
        $(CodeEleID,FormID).closest('div.controls').parent().before(str_tag);
    }
    else{    	
        if($(FormID).find("#is_chargerDiv").length>0 && $(numEleID,FormID).val()==1) $(FormID).find("#is_chargerDiv").remove();
    }

    $(document).on("click",FormID+" #is_chargerDiv input[name=is_charger]",function(){        
        var orderby=$(this).val();
        var CodeEleNM=CodeEleID.substr(0,CodeEleID.length-1);
        if(orderby=="CANCEL"){
            for(var idx=0;idx<$(numEleID,FormID).val();idx++){
                $(CodeEleNM+idx,FormID).val("");
            }
            
            var ErrObj = new Object();
            ErrObj.elementID = $(dateEleID,FormID);
            cf_resetErrorMsg(ErrObj);
            
            var ErrObj = new Object();
            ErrObj.elementID = $(subagencyEleID,FormID);
            cf_resetErrorMsg(ErrObj);
            
            var ErrObj = new Object();
            ErrObj.elementID = $(modelEleID,FormID);
            cf_resetErrorMsg(ErrObj);
        }else{
            var isDo=true;
            //필수 항목 ST
            var obj=new Object();
            obj.URL             = '/PHP/common/hardware_search.php'; //json 전송 URL
            obj.CALLBACK        = g_TcInput.cb_tcInput;
            obj.ASYNC           = true;
            obj.FormID          = FormID;
            obj.CodeEleNM       = CodeEleNM;

            var id_model     = $(modelEleID    ,FormID).val();
            var id_subagency = $(subagencyEleID,FormID).val();
            var date_out     = $(dateEleID     ,FormID).val();
            var limit        = $(numEleID      ,FormID).val();

            if(!date_out){
                isDo=false;
                var ErrObj = new Object();
                    ErrObj.elementID = $(dateEleID,FormID);
                    ErrObj.errMsg    = "일자를 선택하세요.";
                cf_setErrorMsg(ErrObj);
            }

            if(!id_subagency){
                isDo=false;
                var ErrObj = new Object();
                    ErrObj.elementID = $(subagencyEleID,FormID);
                    ErrObj.errMsg    = "매장을 선택하세요.";
                cf_setErrorMsg(ErrObj);
            }

            if(!id_model){
                isDo=false;
                var ErrObj = new Object();
                    ErrObj.elementID = $(modelEleID,FormID);
                    ErrObj.errMsg    = "모델을 선택하세요.";
                cf_setErrorMsg(ErrObj);
            }else{
                if($(modelEleID+" :selected",FormID).data("etc")==1){
                    isDo=false;
                    var ErrObj = new Object();
                    ErrObj.elementID = $(modelEleID,FormID);
                    ErrObj.errMsg    = "충전기모델을 선택하세요.";
                    cf_setErrorMsg(ErrObj);
                }
            }

            if(isDo)
            {
                var sndData=new Object();
                sndData['id_model'    ] = id_model;
                sndData['id_subagency'] = id_subagency;
                sndData['date_out'    ] = date_out;
                sndData['limit'       ] = limit;
                sndData['orderby'     ] = orderby;
                sndData['MODE'        ] = "TC_SEARCH";
                obj.DATA            = sndData;
                cf_getJsonData(obj);
            }
        }
    });
}

g_TcInput.cb_tcInput = function(JsonS,Obj){
    if(JsonS){
        $.each(JsonS, function( idx , entry ) {
            $(Obj.CodeEleNM+idx,Obj.FormID).val(entry.code);
        });
    }
}