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

requirejs.config( {
    baseUrl: '/screen/commonJs/',
    paths  : {
         'jquery'                :'/screen/lib/cornerstone/lib/jquery-1.8.1.min'
        ,'widget-plugins'        :'/screen/lib/cornerstone/ui/widget-plugins'
        ,'transition'            :'/screen/lib/cornerstone/util/transition'
        ,'jquery.ui.core'        :'/screen/lib/cornerstone/lib/datepicker/jquery.ui.core-1.9.2.min'
        ,'jquery.ui.datepicker'  :'/screen/lib/cornerstone/lib/datepicker/jquery.ui.datepicker-1.9.2.min'
        ,'jquery.ui.monthpicker' :'/screen/lib/cornerstone/lib/datepicker/jquery.ui.monthpicker'     
        ,'cf_common'             :'cf_common'
        ,'cf_auth'               :'cf_auth'
        ,'cf_alertmsg'           :'cf_alertmsg'
        ,'cf_date'               :'cf_date'
        ,'cf_tkey_common'        :'cf_tkey_common'
        ,'cf_AES'                :'cf_AES'
        ,'cf_regularExpression'  :'cf_regularExpression'
        ,'cf_ajax'               :'cf_ajax'
        ,'cf_shortCutMenu'       :'cf_shortCutMenu'
        ,'cf_quick_search'       :'/screen/quicksearch/js/cf_quick_search'
        ,'cf_makeMenu'           :'cf_makeMenu'
        ,'cf_makeGrid'           :'cf_makeGrid'
        ,'cf_loadPage'           :'cf_loadPage'
        ,'storage'               :'storage'
        ,'cf_commonUiData'       :'cf_commonUiData'
        ,'hardware_search'       :'hardware_search'
        ,'cf_transScreen'        :'cf_transScreen'
        ,'cf_TCinput'            :'cf_TCinput'
        ,'cf_formAPI'            :'cf_formAPI'
        ,'cf_confirmModal'       :'cf_confirmModal'
        ,'cf_validation'         :'cf_validation'
        ,'cf_datepicker'         :'cf_datepicker'
        ,'mTkeyCommon'           :'mTkeyCommon'
    },
    shim: {
        'jquery': {
            exports: 'jQuery',
            init: function() {
                return this.jQuery.noConflict( true );
            }
        }
        ,'widget-plugins'        : {deps: ['jquery']}
        ,'transition'            : {deps: ['jquery']}
        ,'jquery.ui.core'        : {deps: ['jquery']}
        ,'jquery.ui.datepicker'  : {deps: ['jquery','jquery.ui.core']}
        ,'jquery.ui.monthpicker' : {deps: ['jquery','jquery.ui.core']}
        ,'cf_common'             : {deps: ['jquery','cf_auth','cf_alertmsg','cf_date','cf_tkey_common','cf_AES','widget-plugins', 'cf_transScreen']}
        ,'cf_datepicker'         : {deps: ['cf_common','jquery.ui.datepicker','jquery.ui.monthpicker',,'jquery.ui.core','jquery']}
        ,'cf_validation'         : {deps: ['jquery','cf_common','cf_regularExpression','cf_datepicker','cf_commonUiData','cf_TCinput']}
        ,'cf_ajax'               : {deps: ['jquery','cf_common','storage']}
        ,'cf_makeMenu'           : {deps: ['jquery','cf_ajax']}
        ,'cf_makeGrid'           : {deps: ['jquery','cf_ajax']}
        ,'cf_loadPage'           : {deps: ['jquery']}
        ,'cf_commonUiData'       : {deps: ['jquery','cf_ajax','cf_tkey_common']}
        ,'hardware_search'       : {deps: ['jquery','transition','cf_transScreen']}
        ,'cf_quick_search'       : {deps: ['jquery','transition','cf_transScreen']}
        ,'cf_confirmModal'       : {deps: ['jquery']}
        ,'cf_shortCutMenu'       : {deps: ['jquery']}
        ,'cf_formAPI'            : {deps: ['jquery','cf_ajax']}
    }
});


require( [ 'cf_validation'
          ,'cf_makeMenu'
          ,'cf_makeGrid'
          ,'cf_loadPage'
          ,'hardware_search'
          ,'cf_quick_search'
          ,'cf_formAPI'
          ,'cf_confirmModal' 
          ,'cf_shortCutMenu'], function() {    
    
    inintMenu();
    
    var fileName = location.href;
    var pos = fileName.lastIndexOf("/");
    fileName = fileName.substring(pos, fileName.lastIndexOf('.'));
    loadJs = './js' + fileName + '.js';
    
    //loadjscssfile("/screen/commonJs/cf_alertmsg.js", "js",true);
    
    loadjscssfile(loadJs, "js",true);
} );

