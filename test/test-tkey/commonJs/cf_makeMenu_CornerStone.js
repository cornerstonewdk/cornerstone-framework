
function cf_getMenuList(){
    
    console.error('필요없는 함수로 삭제 요망!!');
}

var g_divMenu = null;


function df_initCollapseMemu(){
    var colInfo = {};
    colInfo.ID      = 'menu_id';
    colInfo.NAME    = 'menu_name';
    colInfo.LINK    = 'menu_url';
    colInfo.MENUIDX = 'menu_id';
    colInfo.PARENT1 = 'parent1_menu_id';
    colInfo.PARENT2 = 'parent2_menu_id';
    colInfo.DEPTH   = 'depth';
    colInfo.FUNC    = function(event, objElement){
        
                            var urlStr  = $(objElement).data('url');                            
                            var sndObj=new Object();
                            sndObj.hrefPage=urlStr;
                            cf_go2TopPage(sndObj);
                        };
                    
    var sndData = new Object();
        sndData["menu_corp"] ='T';
        sndData["menu_org" ] ='D';
    
    var objDef = {};
        objDef.URL = '/PHP/menu/menu.php';
        objDef.DIV_MENU_ID = '#divCollapseMenu';
        
    var menu = new CollapseMemu(colInfo, objDef);
        menu.setSendData(sndData);
        
}

var CollapseMemu = function(_colInfo, _objDef){
    
    var m_colsInfo = _colInfo;
    var m_aJaxOpt  = _objDef;
    var m_objSendData = null;
    
    var m_menuString = null;
    var m_divPreScreen = null;
    
    this.setSendData = function(_objSendData){
        m_objSendData = _objSendData;
    }
    
    var __drawMenu = function(){
        
        //필수 항목ST
        var obj = {};
            obj.URL      = m_aJaxOpt.URL; //menu list 추출을 위한 ajax 통신 URL
            obj.CALLBACK = __makeMenuColapse;    //ajax 통신 후 콜백 함수명
            obj.ASYNC    = true;                //ajax 통신 방식 false:동기식, true:비동기식
        //필수 항목ED

        //리스트 조회(DB) 시 조건 필요 데이터 ST
        
        if(m_objSendData != undefined){
            var data = m_objSendData;                
            obj.DATA = data;            
        }
        //리스트 조회(DB) 시 조건 필요 데이터 ED

        //ajax 통신 시작(json 형식의 리스트 리턴)
        cf_getJsonData(obj);
    }
    
    var __makeMenuColapse = function (_jsonData){
        
        var arrStack = new Array();
        var MENUOBJ   = m_colsInfo.MENUOBJ;
        var oldDepth = -1;
        var html = '';
        var item = '';
        var isItem = false;
        
        $.each(_jsonData,function(idx, entry){

            var menuId   = entry[_colInfo.ID];
            var menuNm   = entry[_colInfo.NAME];
            var menuUrl  = entry[_colInfo.LINK];        
            var curDepth = entry[_colInfo.DEPTH];
            //console.log('menuId:%s, menuNm : %s, depth:%s ', menuId, menuNm,  curDepth);
            
            if(oldDepth < curDepth && menuUrl == ''){
                
                var objMenu = {};
                    objMenu.id = menuId;
                    objMenu.name = menuNm;
                    
                arrStack.push(objMenu);            
                //console.log('name:%s, url-x : %s, depth:%s ', menuNm, menuUrl,  curDepth);
            }else if(oldDepth > curDepth && menuUrl == ''){
                
                if(isItem){
                    var objMenu = arrStack.pop();
                    var collapse = __collapseHead(objMenu, item);                
                    html += __collapseGroup(collapse);
                    
                    var diff = oldDepth - curDepth;                
                    if(diff > 1){
                        for(var i = 1 ; i < diff; i++){
                            objMenu = arrStack.pop();
                            collapse = __collapseInner(html);
                            collapse = __collapseHead(objMenu, collapse);                
                            html = __collapseGroup(collapse);       
                        }
                    }
                    
                    item = '';

                }else{
                    html = __collapseHead(objMenu, html);
                }
                
                var objMenu = {};
                    objMenu.id = menuId;
                    objMenu.name = menuNm;
                
                arrStack.push(objMenu);            
                
            }else if(menuUrl != ''){
                item += __collapseItem(_colInfo, entry);
                isItem = true;
            }else{
                console.log('else');
            }            
            oldDepth = curDepth;         
        });
        if(arrStack.length > 0){
            var objMenu = arrStack.pop();
            var collapse = __collapseHead(objMenu, item);                
            html += __collapseGroup(collapse);    
            html = __collapseGroup(html);
        }
        html = '<div id="collapseMenu" class="accordion">' + html + '</div>'; 
        //console.log(html);
        
        m_menuString = html;
        
        $(m_aJaxOpt.DIV_MENU_ID).html(html);
        
               

        
    }
    
    var __createDivMenu = function(){
        
        m_divPreScreen = "#"+$("div [data-page=Y].current").attr("id");
        
        var divMenu = "<div id='divCollapseMenu' data-page='Y'></div>";
        
        $(m_divPreScreen).parent().prepend(divMenu);
    }
    

    
    var __collapseGroup = function(_html){
        var retValue = '';

        retValue += '\n' + '<div class="accordion-group">';
        retValue += '\n' +      _html;                
        retValue += '\n' + '</div>';                
        
        return retValue;
    }
    
    var __collapseHead = function(_objMenu, _html){
        
        var retValue = '';
        var menuId = _objMenu.id;
        var menuNm = _objMenu.name;
        
        retValue += '\n' + '    <div class="accordion-heading">';
        retValue += '\n' + '    <a class="accordion-toggle" href="#' + menuId + '">' + menuNm + '</a>';    
        retValue += '\n' + '    </div>';
        retValue += '\n' + '    <div id="' + menuId + '" class="accordion-body collapse">';
        retValue += '\n' +              _html;            
        retValue += '\n' + '    </div>';    
        
        return retValue;
    }

    var __collapseItem = function(_colInfo,_entry){
        var retValue = '';

        var menuId   = _entry[_colInfo.ID];
        var menuNm   = _entry[_colInfo.NAME];
        var menuUrl  = _entry[_colInfo.LINK];        
        
        retValue += '\n' + '<div id="' + menuId + '" class="accordion-inner munuLink" data-url="' + menuUrl +'">';
        retValue += '\n' +     menuNm;
        retValue += '\n' + '</div>';                        

        return retValue; 
    }

    var __collapseInner = function (_html){
        var retValue = '';

        retValue += '\n' + '<div class="accordion-inner">';
        retValue += '\n' +     _html;
        retValue += '\n' + '</div>';                        

        return retValue; 
    }

    var __setMenuEventHandler = function (_colInfo){
        
        $(document).on('click','#btnShowMenu', function(){
            console.log('show-click');
            if(m_menuString == undefined){
                __drawMenu();
            }else{
                $(m_aJaxOpt.DIV_MENU_ID).html(m_menuString);
            }
            m_divPreScreen = "#"+$("div [data-page=Y].current").attr("id");
            transScreen.cf_transScreen(false, '#divCollapseMenu',m_divPreScreen);
        });
        
        $(document).on('click','#btnHideMenu', function(){  
            console.log('hide-click');
            
            transScreen.cf_transScreen(true);
        });  
        
        //$(".accordion-toggle").on("click", function(event){
        $(document).on('click', ".accordion-toggle", function(e) {
            
            var $this = $(this);
            var target = $this.attr('data-target') || event.preventDefault() || (href = $this.attr('href'));
            var option = $(target).data('collapse') ? 'toggle' : $this.data();
            $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
            $(target).collapse(option);
        }); 
        
        $(document).on('click', ".munuLink", function(e) {
        //$(".munuLink").on("click", function(event){
            
            var eventFunc = _colInfo.FUNC;
            
            if(eventFunc != undefined){
                
                eventFunc(event, this);
            }
        });         
    }
    __createDivMenu();
    __setMenuEventHandler(_colInfo); 
}

$(document).ready( function(){
    //console.log('menu ready');
    df_initCollapseMemu();
});


