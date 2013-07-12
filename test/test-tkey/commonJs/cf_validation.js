/**
 * Validation 체크
 */
function cf_doValidation(elementID){
	var is_return=true;
	var elementID=$(elementID);	
	if(!elementID.is("form")){
	    if($(elementID).find("form").first().length) elementID=$(elementID).find("form").first();
	}
	
	var elements=elementID.find("*[data-req=Y]").not(":disabled");
	if(elements.length==0) return true;
	
	if(!elementID.is("form")){
	    console.error("Validation 체크할 <form> Tag 를 찾을 수 없습니다.");
	    return false;
	}
	
	var values = {};
    var FormSerialize=elementID.serializeArray();
	var thisNmArray={};
	var i=0;
	elementID.find(":input[name]").not(":disabled").each(function(){
		//Diabled 된 값은 체크 하지 않도록 한다.		
		var this_nm=$(this).attr('name');
		var is_exist=false;
		$.each(thisNmArray,function(key,value){
			if(value==this_nm){
				is_exist=true;
			}
		});
		if(is_exist==false){
			thisNmArray[i]=this_nm;
			i++;
		} 		
	});
	$.each(thisNmArray,function(key,value){
		var is_exist=false;
		var this_nm=value;
		$.each( FormSerialize, function( item, index ) {
			if(index.name==this_nm){
			   is_exist=true;
				if ( values[ index.name ] ) {
					if ( !$.isArray( values[ index.name ] ) )
						values[ index.name ] = [ values[ index.name ] ];

					values[ index.name ].push( index.value );
				}
				else {
					values[ index.name ] = index.value;
				}
			}
		});		
		if(is_exist==false){
			values[this_nm]='';
		}
	});
	
	elements.each(function(){
		var ElementObj=$(this);
		var elementName=$(this).attr("name");
		
		var elementValue="";
		//if(isFormTag=="FORM"){
		//    elementValue=values[elementName];
		//}else{
		//    elementValue=$(this).val();		    
		//}
		elementValue=values[elementName];

		var retval="";
		var element_tagnm=ElementObj.prop("tagName").toString().toUpperCase();

		var element_type="";
		if(element_tagnm=="INPUT"){
			element_type=ElementObj.attr("type").toString().toUpperCase();
		}else{
			element_type=element_tagnm;
		}

		switch (element_type){
			case "CHECKBOX" :
			case "RADIO"    :
			case "SELECT"   :
				if($.isArray(elementValue)){
					var is_checked_cnt=elementValue.length;
				}else{
					var is_checked_cnt=1;
				}
				if(is_checked_cnt==1) if(elementValue=='') is_checked_cnt=0;

				retval=__isValidationErr(ElementObj,elementName,element_type,is_checked_cnt);
				break;
			default :
				var txt_length=cf_getStrLen(cf_removeWhiteSpace(elementValue.toString()));
				retval=__isValidationErr(ElementObj,elementName,element_type,txt_length)
				break;
		}
		
		if(retval.message!=undefined){
			var ErrObj=new Object();
			ErrObj.elementID=$( ':input[name=' + retval.attribute + ']:first' );
			ErrObj.errMsg=retval.message;
			cf_setErrorMsg(ErrObj);
			is_return=false;
			//return is_return;
		}
	});


	return is_return;

}



function __isValidationErr(elementID,elementName,element_type,CHK_CNT){
	var err_msg="";

	/*사용자 속성*/
	var user_msg=elementID.data("usermsg");
	var data_name=__getDataName(elementID);
	var min_chk=elementID.data("min");
	var max_chk=elementID.data("max");
	var same_val=elementID.data("sameval");
	var err_type=0;
	var retObj={};
	var retMsg="";

	retObj['attribute']=elementName;

	/* 기본 Define */
	var MINCHK=1;
	var MAXCHK=99999999;

	var maxlength=elementID.attr("maxlength");
	if(maxlength>0) MAXCHK=maxlength;

	if(min_chk==undefined){
		min_chk=MINCHK;
		err_type=1;
	}
	if(max_chk==undefined) max_chk=MAXCHK;
	if(same_val==undefined) same_val="";


	if(same_val.toString().length>0){
		if(elementID.val()!=$('#'+same_val).val()){
			same_val_data_name=__getDataName($('#'+same_val));

			retMsg=same_val_data_name+" 과(와) "+data_name+" 값이 다릅니다.";

			retObj['message']=retMsg;
		}
	}

	//조건 만족시
	if(CHK_CNT>=min_chk && CHK_CNT<=max_chk){
	}else{
		switch (element_type){
			case "CHECKBOX" :
			case "RADIO"    :
			case "SELECT"   :
				err_msg_min=" 개 이상 선택 되어야 합니다.";
				err_msg_max=" 개 까지 선택 가능 합니다.";
				break;
			default         :
				err_msg_min=" 글자 이상 입력 되어야 합니다.";
				err_msg_max=" 글자 까지 입력 가능 합니다.";
				break;
		}


		if(user_msg==undefined){
			err_msg="[필수] "+data_name+"은(는) ";
			if(min_chk>CHK_CNT){
				if(err_type==1){
					err_msg+="반드시 입력되어야합니다.";
				}else{
					err_msg+="최소 "+min_chk+err_msg_min;
				}
			}else if(max_chk<CHK_CNT){
				err_msg+="최대 "+max_chk+err_msg_max;
			}
			retMsg=err_msg;
		}else{
			retMsg=user_msg;
		}
		retObj['message']=retMsg;
	}

	if(retObj['message']!="") return retObj;

}

function __getDataName(elementID){

	var data_name=elementID.data("name");

	if(data_name==undefined || data_name==''){
		data_name=elementID.closest('.control-group').find('label.control-label').text();
	}
	return data_name;
}