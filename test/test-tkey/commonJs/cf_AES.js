/**
 * 복호화 통신함수(공통함수)(cf_ajax.js)를 사용하지 않음..
 * (공통함수(cf_ajax.js)에서 cf_getDecrypt를 호출함으로 무한루프에 빠짐)
 * @author Toby Kim
 * @param getObj : 복호화 대상 Object
 * @since 2013-02-25
 */
function cf_getDecrypt(getObj){
    var ret=new Object();
    $.ajax({
        type:"POST",
        url: '/PHP/common/doAES.decrypt.php',
        cache: false,
        async: false,
        dataType:"json",
        data: getObj,
        error: function(data){
           alert('서버와 통신이원할하지않습니다.');
           console.error(data.responseText);
           return;
        },
        success : function(jsonS) {
            $.each(jsonS, function( key , val ) {
                ret[key]=val;
            });
        }
    });
    return ret;
}
    