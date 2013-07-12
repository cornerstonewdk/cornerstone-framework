function cf_confirm(_msg, _callBack, _param){
	
	var confirmModal = new ConfirmModal(_msg, _callBack, _param); 	
}

var ConfirmModal = function(_msg, _callBack, _param){
	
	var m_divCurScreen; 
	
	var __drawDivConfirmArea = function(){
		
	    m_divCurScreen = "#"+$("div [data-page=Y].current").attr("id");	    
	    var divConfirmArea = "<div id='divConfirmArea' class= 'modal-wrap'></div>";
	    
	    $(m_divCurScreen).append(divConfirmArea);
	}	
	
	var __drawDivConfirmModal = function(){
		var html = '';
		html += '<div class="modal fade" id="divConfirmModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">';
		html += '<div class="modal-header">';
		html += '    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
		html += '    <h3 id="myModalLabel">확인창</h3>';
		html += '</div>';
		html += '<div class="modal-body">';
		html += '    <div class="innerbox">';
//		html += '    <div class='kind'></div>';
		html += '        <div class="table-type7">';
		html += _msg;	            
		html += '        </div>';
//		html += '    </div>';
		html += '</div>';
		html += '<div class="modal-footer">';
		html += '    <input type="button" class="btn btn-bigtype02 clsClose" data-dismiss="modal" id="btnCancel"  value="취소"/>';
		html += '    <input type="button" class="btn btn-bigtype01 clsClose" data-dismiss="modal" id="btnOk" value="확인"/>';		
		html += '</div>';
		html += '</div>';
	
		$('#divConfirmArea').html(html);
	}
	
	var __eventHandler = function(){

	    $("#divConfirmModal #btnOk").on('click', function(event){
	    	__procConfirmModal(true);
	    });	    

	    
	    $("#divConfirmModal #btnCancel").on('click', function(event){
	    	__procConfirmModal(false, _param);	    		    	
	    });
	}
	
	var __procConfirmModal = function(_isOk){

		var divCurScreen = $("#"+$("div[data-page=Y].current").attr("id"));
    	var modal = $("#divConfirmArea #divConfirmModal").modal("toggle");
    	
    	if(_callBack != undefined){
    		modal.on('shown', function(){
					    	      divCurScreen.hide();
					    		  _callBack(_isOk, _param);
					    	  })
			     .on('hidden', function(){
		    				       divCurScreen.show();
		    				       _callBack(_isOk, _param);
		    					   $('#divConfirmArea').html('');
		    				   });
    	}
		
	}
	
	if($(m_divCurScreen).length == 0) __drawDivConfirmArea();
	
	__drawDivConfirmModal();
	__eventHandler();
	$("#divConfirmArea #divConfirmModal").modal("toggle");
}