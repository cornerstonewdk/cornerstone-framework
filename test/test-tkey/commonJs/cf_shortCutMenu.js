
var ShortCutMenu = function(){
	
	var m_imgPath= '../style/mymenu/';
	var m_isLoad = false;
	var __drawMyMenu = function(){
		var html = "";
		html += '<div class="flex-menu">';
		html += '    <div class="btn-group">';
		html += '        <ul class="flex-btn" id="short_cut_menu">';
//		html += '            <li><a href="/screen/menu/my_menu.html" class="btn"><span>설정</span></a></li>';
//		html += '            <li class="menu-no01"><a href="#" class="btn"><span>메뉴1</span></a></li>';
//		html += '            <li class="menu-no02"><a href="#" class="btn"><span>메뉴2</span></a></li>';
//		html += '			 <li class="menu-no03"><a href="#" class="btn"><span>메뉴3</span></a></li>';
//		html += '			 <li class="menu-no04"><a href="#" class="btn"><span>메뉴4</span></a></li>';
		html += '		</ul>';
		html += '		<p id="side_fixed_button"><a href="#"></a></p>';
		html += '	</div>';
		html += '</div>';
		
		$('.wrap').append(html);		
	}
	
	var __getShortCutMenu = function(){
		
		var sendData = {};
			sendData.MODE   = "short_cut_my_menu";
			
		var objDef = {};
			objDef.URL      = '/PHP/menu/my_menu.php';
	        objDef.CALLBACK = __cbShortMenu;
			objDef.DATA = sendData;
			
	    cf_getJsonData(objDef);		
	    
	}
	
	var __cbShortMenu = function(jsonData, objDef){

		var html = "";
		html += '<li><a href="/screen/menu/my_menu.html" class="btn"><span>설정</span></a></li>';
		
		if(jsonData != null){
			$.each(jsonData, function(idx, entry ){
				html += '<li class="' + entry.img_url.substring(0, entry.img_url.length -4) + '"><a href="' + entry.menu_url + '" class="btn"><span>' + entry.menu_name + '</span></a></li>';
			});
		}
		$("#short_cut_menu").html(html);
		
		m_isLoad = true;
	}
	
	var __init = function(){
		
		__drawMyMenu();
		
		
	    //flex-menu 열고닫기동작
	    $('.btn-group p a').click(function () {
	        //alert ()
	    	if(m_isLoad == false) __getShortCutMenu();
	    	
	        $('.flex-btn').toggle();
	    });		
		
	}
	__init();
}