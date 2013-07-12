try{
    Storage.prototype.setObject = function(key, value)
    {
        try
        {
            if(key == undefined || key == '')
            {
                //console.error('[dev] Storage의 key 인자값은 필수항목입니다.');
                return;
            }

            this.setItem(key, JSON.stringify(value));
        }
        catch(e)
        {
            if(e ==  QUOTA_EXCEEDED_ERR)
            {    // 저장공간 초과시
                console.error('Storage 저장 공간이 초과되었습니다.');
            }
        }
    }
    
    Storage.prototype.getObject = function(key)
    {
        var retValue = null;
        try
        {
            retValue = this.getItem(key) && JSON.parse(this.getItem(key));
        }
        catch(e)
        {    // setOject로 저장하지 않았거나 브라우저에서 직접 항목을 삽입했을 경우
            if(e.name = 'SyntaxError' && e.message.indexOf('Unexpected token') != -1)
            {
                retValue = this.getItem(key);
            }
            else
            {
    
            }
        }
    
        return retValue;
    }
}catch(e){
    alert('Storage 미지원 Browser 입니다.\n사용이 불가능합니다.\nChrome,Safai,Opera 등을 이용해주세요.');
}


/**
 * cf_availableStorage
 */
function cf_availableStorage()
{
    var retValue = false;
    //if(typeof(localStorage) == 'undefined'){
    if( ('localStorage' in window) && window['localStorage'] !== null) {
        //console.error("현재 브라우저는 WebStorage를 지원합니다");
        retValue = true;
     }
    else
    {
        //console.error("현재 브라우저는 WebStorage를 제한합니다");
    }
    return retValue;
}



function cf_getSessionStorageKeys()
{
    if(cf_availableStorage() == false) return;

    var arrData = new Array();
    var cnt = sessionStorage.length;

    for(var i=0; i<cnt; i++)
    {
        arrData.push(sessionStorage.key(i));

    }
    return arrData;
}

/**
 * cf_setSessionStorage
 * param key
 * param value
 */
function cf_setSessionStorage(key, value)
{
    if(cf_availableStorage() == false) return;

    sessionStorage.setObject(key, value);

}

/**
 * cf_getSessionStorage
 * param key
 * returns
 */
function cf_getSessionStorage(key)
{
    if(cf_availableStorage() == false) return;

    return sessionStorage.getObject(key);
}

/**
 * cf_removeSessionStorage
 * param key
 */
function cf_removeSessionStorage(key)
{
    if(cf_availableStorage() == false) return;

    sessionStorage.removeItem(key);
}


/**
 * cf_clearSessionStorage
 */
function cf_clearSessionStorage()
{
    if(cf_availableStorage() == false) return;

    sessionStorage.clear();
}



function cf_getLocalStorageKeys()
{
    if(cf_availableStorage() == false) return;

    var arrData = new Array();
    var cnt = localStorage.length;

    for(var i=0; i<cnt; i++)
    {
        arrData.push(localStorage.key(i));

    }
    return arrData;
}


/**
 * cf_setLocalStorage
 * param key
 * param value
 */
function cf_setLocalStorage(key, value)
{
    alert('cf_setLocalStorage');
    if(cf_availableStorage() == false) return;

    localStorage.setObject(key, value);

}

/**
 * cf_getLocalStorage
 * param key
 * returns
 */
function cf_getLocalStorage(key)
{
    if(cf_availableStorage() == false) return;

    return localStorage.getObject(key);
}

/**
 * cf_removeLocalStorage
 * param key
 */
function cf_removeLocalStorage(key)
{
    if(cf_availableStorage() == false) return;

    localStorage.removeItem(key);
}

/**
 * cf_clearLocalStorage
 */
function cf_clearLocalStorage()
{
    if(cf_availableStorage() == false) return;

    localStorage.clear();
}

/**
* session Storage Store
*/
function cf_setPageParam(param)
{
    cf_setSessionStorage("pageParam", param);
}
/**
* session Storage get , remove
*/
function cf_getPageParam()
{
    var retValue = cf_getSessionStorage("pageParam");
    cf_removeSessionStorage("pageParam");
    return retValue;
}
