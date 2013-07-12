//Page별 동적 스크립트 가져오기
//function cf_getScript(PageName,CallBackFn){
//    
//    console.error('cf_loadPage 함수는 cf_loadPage 함수로 대체되었으며 cf_loadPage.js 파일명 변경 예정');
//    
//    switch (PageName)
//    {
//        case "pop_regIncome_kyopum":
//            $.getScript('/screen/income/js/pop_regIncome_kyopum.js',function(){
//                if(CallBackFn != ''){
//                    __doFunction(CallBackFn);
//                }
//            });
//            break;
//        case "sk_income_moreView":
//            $.getScript('/screen/income/js/sk_income_moreView.js',function(){
//                if(CallBackFn != ''){
//                    __doFunction(CallBackFn);
//                }
//            });
//            break;
//        case "menu":
//            $.getScript('/screen/menu/js/menu.js',function(){
//                if(CallBackFn != ''){
//                    __doFunction(CallBackFn);
//                }
//            });
//            break;
//        case "sk_income_search":
//            $.getScript('/screen/income/js/sk_income_search.js',function(){
//                if(CallBackFn != ''){
//                    __doFunction(CallBackFn);
//                }
//            });
//            break;
//        case "sk_income_delReason":
//            $.getScript('/screen/income/js/sk_income_delReason.js',function(){
//                if(CallBackFn != ''){
//                    __doFunction(CallBackFn);
//                }
//            });
//            break;
//        case "sk_income_list_pre":
//            $.getScript('/screen/income/js/sk_income_list_pre.js',function(){
//                if(CallBackFn != ''){
//                    __doFunction(CallBackFn);
//                }
//            });
//            break;
//        default :
//            break;
//    }
//}

/**
 * script/html 동적 로딩
 * @param fileName 파일명
 * @param loadDivElement 그려질 div element
 * @param targetElement 화면전환할 html의 div영역
 * @param callBackFn 콜백함수
 */
function cf_loadPage(fileName, loadDivElement, targetElement, callBackFn)
{
    
    var screen   = null;
    var loadJs   = null;
    var loadHtml = null;
    
    if(fileName.indexOf("/") != -1){
        
        var pos =  fileName.lastIndexOf("/")
        var filePath = fileName.substring(0,pos);
        fileName = fileName.substring(pos);
        screen = "/screen";
        loadJs        = screen + filePath + '/js' + fileName + '.js';
        loadHtml      = screen + filePath + fileName + '.html' + ' ' + targetElement;        
        console.log('loadJs:%s, loadHtml:%s',loadJs,loadHtml);
    }else{
        
        screen = location.pathname.substring(0,location.pathname.lastIndexOf("/")) + "/";
        loadJs        = screen + 'js/' + fileName + '.js';
        loadHtml      = screen + '' + fileName + '.html' + ' ' + targetElement;
        console.log('loadJs:%s, loadHtml:%s',loadJs,loadHtml);
    }
        
    var loadDivTarget = loadDivElement;
    var callBackFn    = callBackFn;

    $.getScript(loadJs,function(){
        $(loadDivTarget).load(loadHtml , function(){
//                console.log('callBackFn : ' +  callBackFn);
            if(callBackFn != undefined){
                __doFunction(callBackFn);
            }
        });
    });    
}

/**
 * 동적 로딩할 key에 대한 scirpt / html 경로 (삭제 예정)

function __getPagePath(type)
{
    var arrPath = {};
    var screen = '/screen';


    switch(type)
    {
    case "pop_regIncome_kyopum":
        arrPath.script = screen + '/income/js/pop_regIncome_kyopum.js';
        arrPath.html   = screen + '/income/pop_regIncome_kyopum.html #divPopRegIncomeKyopum';
        break;

    case "pop_sk_income_list_moreView":
        arrPath.script = screen + '/stock/js/pop_sk_income_list_moreView.js';
        arrPath.html   = '';
        break;

    case "menu":
        arrPath.script = screen + '/menu/js/menu.js';
        arrPath.html   = '';
        break;

    case "sk_income_moreView":
        arrPath.script = screen + '/income/js/sk_income_moreView.js';
        arrPath.html   = screen + '/income/sk_income_moreView.html #divSkIncomeMoreView';
        break;

    case "sk_income_delReason":
        arrPath.script = screen + '/income/js/sk_income_delReason.js';
        arrPath.html   = screen + '/income/sk_income_delReason.html #divSkIncomeDelReason';
        break;

    case "sk_income_exchange":
        arrPath.script = screen + '/income/js/sk_income_exchange.js';
        arrPath.html   = screen + '/income/sk_income_exchange.html #divSkIncomeExchange';
        break;

    case "income_search":
        arrPath.script = screen + '/income/js/income_search.js';
        arrPath.html   = screen + '/income/income_search.html #divBody';
        break;

    case "incomelog_search":
        arrPath.script = screen + '/income/js/incomelog_search.js';
        arrPath.html   = screen + '/income/incomelog_search.html #divBody';
        break;

    case "kyopum_search":
        arrPath.script = screen + '/income/js/kyopum_search.js';
        arrPath.html   = screen + '/income/kyopum_search.html #divBody';
        break;


    case "stock_research_manager_search":
        arrPath.script = screen + '/income/js/stock_research_manager_search.js';
        arrPath.html   = screen + '/income/stock_research_manager_search.html #divBody';
        break;


    case "predeal_search":
        arrPath.script = screen + '/deal/js/predeal_search.js';
        arrPath.html   = screen + '/deal/predeal_search.html #divBody';
        break;


    case "machine_search":
        arrPath.script = screen + '/deal/js/machine_search.js';
        arrPath.html   = screen + '/deal/machine_search.html #divBody';
        break;

    case "re_predeal_search":
        arrPath.script = screen + '/dealsub/js/re_predeal_search.js';
        arrPath.html   = screen + '/dealsub/re_predeal_search.html #divBody';
        break;

    case "hd_hardware_search":
        arrPath.script = screen + '/dealsub/js/hd_hardware_search.js';
        arrPath.html   = screen + '/dealsub/hd_hardware_search.html #divBody';
        break;

    case "u_sk_income_search":
        arrPath.script = screen + '/ustock/js/u_sk_income_search.js';
        arrPath.html   = screen + '/ustock/u_sk_income_search.html #divBody';
        break;
    case "sk_income_delReasonDtl":{
        console.log('sk_income_delReasonDtl');
        arrPath.script = screen + '/income/js/sk_income_delReasonDtl.js';
        arrPath.html   = screen + '/income/sk_income_delReasonDtl.html #divSkIncomeDelReasonDtl';
        break;
    }
    case "sk_income_list_pre":{
        arrPath.script = screen + '/income/js/sk_income_list_pre.js';
        arrPath.html   = screen + '/income/sk_income_list_pre.html #divSkIncomeListPre';
        break;
    }
    case "sk_income_search":{
        arrPath.script = screen + '/income/js/sk_income_search.js';
        arrPath.html   = screen + '/income/sk_income_search.html #divSkIncomeSearch';
        break;
    }
    case "regpredeal":{
        arrPath.script = screen + '/deal/js/regpredeal.js';
        arrPath.html   = screen + '/deal/regpredeal.html #divRegpredeal';
        break;
    }
    default :
        break;
    }
    return arrPath;
}
 */