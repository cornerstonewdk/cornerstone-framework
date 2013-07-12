function loadjscssfile(filename, filetype, isDefer, callback) {
    if (filetype == "js") { // if filename is a external JavaScript file
        var fileref = document.createElement('script');
        var loaded = false;
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);

        if (isDefer != undefined && isDefer == true) {
            fileref.setAttribute("defer", "defer");
        }

        if (callback) {
            fileref.onreadystatechange = fileref.onload = function() {
                if (!loaded) {
                    if (callback instanceof Array) {
                        for ( var i = 0, cnt = callback.length; i < cnt; i++) {
                            callback[i]();
                        }
                    } else {
                        callback();
                    }
                }
                loaded = true;
            }
        } 

    } else if (filetype == "css") { // if filename is an external CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}
/*
function loadScreenJs() {
    $('html').spinner("show");  

    var fileName = location.href;
    var pos = fileName.lastIndexOf("/");
    fileName = fileName.substring(pos, fileName.lastIndexOf('.'));
    loadJs = './js' + fileName + '.js';

    loadjscssfile(loadJs, "js",true);
}

function datepicker() {
    //DatePicker
    var callBack = new Array();
    callBack.push(tkey);

    loadjscssfile('lib/cornerstone/lib/datepicker/jquery.ui.core-1.9.2.min.js',       "js");
    loadjscssfile('lib/cornerstone/lib/datepicker/jquery.ui.datepicker-1.9.2.min.js', "js");
    loadjscssfile('lib/cornerstone/lib/datepicker/jquery.ui.monthpicker.js',          "js",false, callBack);
    

}

function cornerStone() {
    //코너스톤
    loadjscssfile('lib/cornerstone/ui/widget-plugins.js', "js", false);
    loadjscssfile('lib/cornerstone/util/transition.js'  , "js", false);
}

function tkey() {
    //T.Key

    loadjscssfile('commonJs/cf_common.js', "js");
    loadjscssfile('commonJs/cf_auth.js', "js");
    loadjscssfile('commonJs/cf_alertmsg.js', "js");
    loadjscssfile('commonJs/cf_date.js', "js");
    loadjscssfile('commonJs/cf_tkey_common.js', "js");
    loadjscssfile('commonJs/cf_AES.js', "js");
    loadjscssfile('commonJs/cf_regularExpression.js', "js");
    loadjscssfile('commonJs/cf_ajax.js', "js");
    loadjscssfile('commonJs/cf_shortCutMenu.js', "js");
    loadjscssfile('quicksearch/js/cf_quick_search.js', "js");
    loadjscssfile('commonJs/cf_makeMenu.js', "js");
    loadjscssfile('commonJs/cf_makeGrid.js', "js");
    loadjscssfile('commonJs/cf_loadPage.js', "js");
    loadjscssfile('commonJs/storage.js', "js");
    loadjscssfile('commonJs/cf_commonUiData.js', "js");
    loadjscssfile('commonJs/hardware_search.js', "js");
    loadjscssfile('commonJs/cf_transScreen.js', "js");
    loadjscssfile('commonJs/cf_TCinput.js', "js");
    loadjscssfile('commonJs/cf_formAPI.js', "js");
    loadjscssfile('commonJs/cf_confirmModal.js', "js");
    loadjscssfile('commonJs/cf_validation.js', "js");
    loadjscssfile('commonJs/cf_datepicker.js', "js", false, loadScreenJs);
}
//-----------------------------------------------------------------------------------------
//삭제대상 ST 
//loadjscssfile("lib/cornerstone/lib/bootstrap/css/bootstrap.css", "css");
//loadjscssfile("lib/cornerstone/lib/bootstrap/css/bootstrap-responsive.css", "css");
//loadjscssfile("lib/cornerstone/ui/theme/wireframe/css/cornerstone.css", "css");
//삭제대상 ED
//-----------------------------------------------------------------------------------------
*/
function initScript() {
    loadjscssfile("lib/cornerstone/lib/datepicker/jquery-ui.custom-1.9.2.min.css","css");
    loadjscssfile("style/layout.css", "css");
/*    
    var callBack = new Array();
	    callBack.push(cornerStone);
	    callBack.push(datepicker);	    

    //jQuery
    loadjscssfile('lib/cornerstone/lib/jquery-1.8.1.min.js', "js",false, callBack);
*/
}
initScript(); 
