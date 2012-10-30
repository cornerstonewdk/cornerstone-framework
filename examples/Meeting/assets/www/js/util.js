// Date format 함수
Date.prototype.format = function( f ) {
    if ( !this.valueOf() ) return " ";
 
    var weekName = [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ];
    var d = this;
     
    return f.replace( /(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function( $1 ) {
        switch ( $1 ) {
            case "yyyy": 	return d.getFullYear();
            case "yy": 		return ( d.getFullYear() % 1000 ).zf( 2 );
            case "MM": 		return ( d.getMonth() + 1 ).zf( 2 );
            case "dd": 		return d.getDate().zf( 2 );
            case "E": 		return weekName[ d.getDay() ];
            case "HH": 		return d.getHours().zf( 2 );
            case "hh": 		return ( (h = d.getHours() % 12 ) ? h : 12).zf( 2 );
            case "mm": 		return d.getMinutes().zf( 2 );
            case "ss": 		return d.getSeconds().zf( 2 );
            case "a/p": 	return d.getHours() < 12 ? "오전" : "오후";
            default: 		return $1;
        }
    });
};
 
String.prototype.string = function( len ){var s = '', i = 0; while ( i++ < len ) { s += this; } return s; };
String.prototype.zf = function( len ){ return "0".string( len - this.length ) + this; };
Number.prototype.zf = function( len ){ return this.toString().zf( len ); };

// UUID 생성 함수
function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor( d/16 );
        return (c=='x' ? r : ( r&0x7|0x8 ) ).toString( 16 );
    } );
    return uuid;
};

// String Split 함수
function stringSplit(strData, strIndex){ 
	 var stringList = new Array(); 
	 while(strData.indexOf(strIndex) != -1){
	  stringList[stringList.length] = strData.substring(0, strData.indexOf(strIndex)); 
	  strData = strData.substring(strData.indexOf(strIndex)+(strIndex.length), strData.length); 
	 } 
	 stringList[stringList.length] = strData; 
	 return stringList; 
}

/**
* 문자를 대체한다.
* @param {Object} str-원문자열
* @param {Object} baseStr-바꿀문자
* @param {Object} repStr-대체할문자
*/
function replaceAll(str, baseStr, repStr) {
   var index;
   while (str.search(baseStr) != -1) {
     str = str.replace(baseStr, repStr);
   }
   return str;
}