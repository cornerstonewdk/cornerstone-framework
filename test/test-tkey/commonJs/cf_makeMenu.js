function cf_getMenuList()
{

    console.error('필요없는 함수로 삭제 요망!!');
}

var g_divMenu = null;

function df_initCollapseMemu()
{
    var colInfo = {};
    colInfo.ID = 'menu_id';
    colInfo.NAME = 'menu_name';
    colInfo.LINK = 'menu_url';
    colInfo.MENUIDX = 'menu_id';
    colInfo.PARENT1 = 'parent1_menu_id';
    colInfo.PARENT2 = 'parent2_menu_id';
    colInfo.DEPTH = 'depth';
    colInfo.FUNC = function(event, objElement)
    {

        var urlStr = $(objElement).data('url');
        var sndObj = new Object();
        sndObj.hrefPage = urlStr;
        cf_go2TopPage(sndObj);
    };

    var sndData = new Object();
    sndData["MODE"] = 'menu';

    var objDef = {};
    objDef.URL = '/PHP/menu/menu.php';
    objDef.DIV_MENU_ID = '#divCollapseMenu';

    var menu = new CollapseMemu(colInfo, objDef);
    menu.setSendData(sndData);

}

var CollapseMemu = function(_colInfo, _objDef)
{

    var m_colsInfo = _colInfo;
    var m_aJaxOpt = _objDef;
    var m_objSendData = null;

    var m_menuString = null;
    var m_divPreScreen = null;

    this.setSendData = function(_objSendData)
    {
        m_objSendData = _objSendData;
    }

    var __drawMenu = function()
    {

        // 필수 항목ST
        var obj = {};
        obj.URL = m_aJaxOpt.URL; // menu list 추출을 위한 ajax 통신 URL
        obj.CALLBACK = __makeMenuColapse; // ajax 통신 후 콜백 함수명
        obj.ASYNC = true; // ajax 통신 방식 false:동기식, true:비동기식
        // 필수 항목ED

        // 리스트 조회(DB) 시 조건 필요 데이터 ST

        if (m_objSendData != undefined)
        {
            var data = m_objSendData;
            obj.DATA = data;
        }
        // 리스트 조회(DB) 시 조건 필요 데이터 ED

        // ajax 통신 시작(json 형식의 리스트 리턴)
        cf_getJsonData(obj);
    }

    var __makeMenuColapse = function(_jsonData)
    {
        var arrStack = new Array();
        var MENUOBJ = m_colsInfo.MENUOBJ;
        var oldDepth = -1;
        var html = '';
        var item = '';
        var isItem = false;
        
        if(_jsonData==undefined || _jsonData==null) return; 

        $.each(_jsonData, function(idx, entry)
        {

            var menuId = entry[_colInfo.ID];
            var menuNm = entry[_colInfo.NAME];
            var menuUrl = entry[_colInfo.LINK];
            var curDepth = Number(entry[_colInfo.DEPTH]);

            if (oldDepth != curDepth && curDepth != 2)
            {
                var objMenu = {};
                if (oldDepth < curDepth)
                {
                    objMenu.id = menuId;
                    objMenu.name = menuNm;
                    objMenu.depth = curDepth;

                    arrStack.push(objMenu);
                } else
                {
                    objMenu = arrStack.pop();

                    if (curDepth == 0 && oldDepth != 2)
                    {
                        html = __getMenuDepth(objMenu, html);
                    } else if (curDepth == 0 && oldDepth == 2)
                    {
                        html += __getMenuDepth(objMenu, item);

                        objMenu = arrStack.pop();
                        html = __getMenuDepth(objMenu, html);
                    } else
                    {
                        html += __getMenuDepth(objMenu, item);
                    }

                    objMenu.id = menuId;
                    objMenu.name = menuNm;
                    objMenu.depth = curDepth;
                    arrStack.push(objMenu);
                }
                item = '';
            } else if (curDepth == 2)
            {

                item += __getMenuItem(_colInfo, entry);
            }
            oldDepth = curDepth;
        });
        var cntStack = arrStack.length;
        if (cntStack > 0)
        {
            if (cntStack == 1)
            {
                var objMenu = arrStack.pop();
                html += __getMenuDepth(objMenu, item, true);
            } else
            {
                for ( var i = 0; i < cntStack; i++)
                {
                    var objMenu = arrStack.pop();
                    if (objMenu.depth == '1')
                    {
                        html += __getMenuDepth(objMenu, item);
                    } else
                    {
                        html = __getMenuDepth(objMenu, html);
                    }

                }
            }
        }

        html = ' <div id="collapseMenu" class="menu accordion">' + html + '</div>';
        // console.log(html);

        m_menuString = html;

        $(m_aJaxOpt.DIV_MENU_ID).html(html);
    }

    var __createDivMenu = function()
    {

        m_divPreScreen = "#" + $("div [data-page=Y].current").attr("id");

        var divMenu = "<div id='divCollapseMenu' data-page='Y'></div>";

        $(m_divPreScreen).parent().prepend(divMenu);
    }

    var __createDivModal = function()
    {

        m_divPreScreen = "#" + $("div [data-page=Y].current").attr("id");

        var divMenu = "<div id='divModal' class= 'modal-wrap'></div>";

        $(m_divPreScreen).parent().prepend(divMenu);
    }
    var m_subMenu = 0;
    var __getMenuDepth = function(_objMenu, _html, _isLast)
    {

        var retValue = '';
        // console.log('_objMenu : %j', _objMenu );
        if (_objMenu == undefined)
            return _html;
        var menuId = _objMenu.id;
        var menuNm = _objMenu.name;
        var depth = _objMenu.depth;

        if (depth == 0)
        {
            retValue += '<p>';
            retValue += '    <a id="a_' + menuId + '" href="#' + menuId
                    + '" class="accordion-toggle">';
            retValue += '        <span>' + menuNm + '</span>';
            retValue += '    </a>';
            retValue += '</p>';
            if (_isLast == undefined)
            {
                // retValue += '<ul id="' + menuId + '" class="collapse">';
                retValue += '<ul id="' + menuId + '" class="">';
                retValue += _html;
                retValue += '</ul>';
            } else
            {
                retValue += '<ul>';
                retValue += '    <li>';
                // retValue += ' <ul id="' + menuId + '" class="collapse">';
                retValue += '        <ul id="' + menuId + '" class="">';
                retValue += _html;
                retValue += '        </ul>';
                retValue += '    </li>';
                retValue += '<ul>';
            }
        } else
        {
            if (m_subMenu == 0)
            {
                retValue += '<li class="on">';
                retValue += '    <a id="a_' + menuId + '" href="#' + menuId
                        + '" class="accordion-toggle">';
                retValue += '        <span>' + menuNm + '</span><em></em>';
                retValue += '    </a>';
                retValue += '    <ul id="' + menuId + '" class="collapse in">';
                retValue += _html;
                retValue += '    </ul>';
                retValue += '</li>';

            } else
            {
                retValue += '<li>';
                retValue += '    <a id="a_' + menuId + '" href="#' + menuId
                        + '" class="accordion-toggle">';
                retValue += '        <span>' + menuNm + '</span><em></em>';
                retValue += '    </a>';
                retValue += '    <ul id="' + menuId + '" class="collapse">';
                retValue += _html;
                retValue += '    </ul>';
                retValue += '</li>';
            }
            m_subMenu++;

        }
        return retValue;
    }
    var __getMenuItem = function(_colInfo, _entry)
    {
        var retValue = '';

        var menuId = _entry[_colInfo.ID];
        var menuNm = _entry[_colInfo.NAME];
        var menuUrl = _entry[_colInfo.LINK];

        retValue += '\n' + '<li>';
        retValue += '\n' + '    <a id="' + menuId + '" href="' + menuUrl + '" class="item">';
        retValue += '\n' + '        <span>' + menuNm + '</span>';
        retValue += '\n' + '    </a>';
        retValue += '\n' + '</li>';

        return retValue;
    }

    var __setMenuEventHandler = function(_colInfo)
    {
        console.log('__setMenuEventHandler');

        $(document).on(
                'click',
                '#btnShowMenu',
                function()
                {
                    // console.log('show-click');
                    if (m_menuString == undefined)
                    {
                        __drawMenu();
                    } else
                    {
                        $(m_aJaxOpt.DIV_MENU_ID).html(m_menuString);
                    }
                    m_divPreScreen = "#"
                            + $("div [data-page=Y].current").attr("id");
                    transScreen.cf_transScreen(false, '#divCollapseMenu',
                            m_divPreScreen);

                    __setTitle("메뉴");
                    __showCommonButton("#liShowMenu", false);
                    __showCommonButton("#liHeaderBack", true);
                });

        $(document).on('click', '#btnHeaderBack', function()
        {
            // console.log('hide-click');
            transScreen.cf_transScreen(true);
            __showCommonButton("#liShowMenu", true);
            __showCommonButton("#liHeaderBack", false);

        });

        $(document).on('click', '#btnHome', function()
        {
            location.href = 'main/main.html'
        });

        $(document).on('click', ".accordion-toggle", function(e){
            var $this = $(this);
            var target = $this.attr('data-target')
                    || e.preventDefault()
                    || (href = $this.attr('href'));
            var option = $(target).data('collapse') ? 'toggle'
                    : $this.data();
            $this[$(target).hasClass('in') ? 'addClass'
                    : 'removeClass']('collapsed');
            $(target).collapse(option);

            $this.parent().toggleClass('on');
        });
        
        $(document).on('click',".item",function(e){
        	
        	cf_removeSessionStorage("pageInfo");        	
    	});

    }




    __createDivMenu();
    __setMenuEventHandler(_colInfo);

    __createDivModal();
}

// $(document).ready( function(){
// //console.log('menu ready');
// df_initCollapseMemu();
// });
window.onload = function()
{
    console.log('menu ready');
    df_initCollapseMemu();
    
    cf_quick_search.createDivQuickSearch();
    cf_quick_search.setQuickSearchEventHandler();

    new ShortCutMenu();

    $('html').spinner("hide");
    //	window.history.forward(1);
    //	oncontextmenu='return false';
}

function inintMenu(){
    console.log('menu ready');
    df_initCollapseMemu();
    
    cf_quick_search.createDivQuickSearch();
    cf_quick_search.setQuickSearchEventHandler();

    new ShortCutMenu();

    $('html').spinner("hide");
}