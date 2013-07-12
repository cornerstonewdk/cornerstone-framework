var g_popParam = null;
FormAPI = function(_pageMode,_formView ,_regModel,_regView) {

    if(_formView != undefined){
        console.error('코너스톤 정리하시오!!');
    }

    var m_pageMode  = _pageMode;
    var m_debug     = false;

    var m_title     = null;
    var m_pageParam = null;

    var m_flag      = null;  //div|modal|form
    var m_formId    = '';
    var m_divId     = '';
    var m_screenView  = null;
    var m_formView    = null;


    var m_objFormView = _formView;
    var m_objRegModel = _regModel;
    var m_objRegView  = _regView;



    if(cf_isLogin()==false) return;
    m_pageParam = cf_getPageParam();


    /**
     * 파일명 가져오기
     */
    var __getFileName = function(){
        var filePath = location.pathname;
        var fileName = filePath.substring(filePath.lastIndexOf('/') + 1,filePath.lastIndexOf("."));
        return fileName;
    }

    var __getFormOrDivId = function(){

        var retValue = null;

        if(m_flag == 'div' || m_flag == 'modal'){
            retValue = '#' + m_divId;
        }else{
            retValue = '#' + m_formId;
        }
        return retValue;
    }

    this.setFormView = function(objData){

    	if(m_flag == 'div') return null;
        if(objData == undefined) objData = {};

        m_formView = new m_objFormView({ el: __getFormString()
                                        , model               : new m_objRegModel(objData)
                                        , validationViewClass : m_objRegView
                                        } );

    }

    this.isValid = function(){
        return cf_doValidation(__getFormOrDivId());
    }

    /**
     * 권한설정
     */
    var __chkNewAuth = function(_newAarrAttr){
        cf_pageNewAuth();

        //신권한 적용
        var doAuthObj = new Object();
            doAuthObj.chkTarget = __getFormOrDivId();

            if(_newAarrAttr == undefined){
                doAuthObj.attri = "all";
            }else{
                doAuthObj.attri = _newAarrAttr;
            }

        cf_doAuthCheck(doAuthObj);
    }

    this.chkOldAuth = function(_oldArrAttr, _isBack){
    	
        if(_oldArrAttr == undefined || _oldArrAttr == ''){
            return true;
        }
        var retValue = false;
        //구권한
        var OldAuthObj = new Object();
            OldAuthObj.AUTHID = _oldArrAttr;

        retValue = cf_pageOldAuth(OldAuthObj);

        if(retValue == false){

            var ErrObj=new Object();
                ErrObj.MODE = "dialog";
                ErrObj.errMsg="페이지 권한이 없습니다.<BR>관리자에게 문의하세요";

            if(_isBack != undefined && _isBack == true){
                ErrObj.historyGo=-1;
                ErrObj.CALLBACK="cf_go2TopPage";
            }
            cf_setErrorMsg(ErrObj);
        }

        return retValue;
    }


    /**
     * 현재 Document의 FormId 가져오기
     * @return FormId 문자열 반환
     */
    this.getFormString = function(){
        return __getFormString();
    }

    this.getForm = function(){
        return $(__getFormString());
    }
    /**
     * 현재 Document의 FormId 가져오기
     */
    var __getFormString = function(){

        if(m_formId == '') return '';
        return '#'+ m_formId;
    }

    /**
     * 웹스토리지로부터 페이지파라미터 가져오기
     * @return 웹스토리지에서 읽은 페이지파라미터를 해쉬 오브젝트 반환
     */
    this.getPageParam = function(){
        //if(m_pageParam == undefined) m_pageParam = {};
        return m_pageParam;
    }

    /**
     * 웹스토리지 페이지파라미터 설정하기
     * @param _params 해쉬값 페이지 파라미터
     */
    this.setPageParam = function(_params){

        cf_setPageParam(_params);
    }

    this.setPopParam = function(_param){
        g_popParam = _param;
    }

    this.getPopParam = function(){
        return g_popParam;
    }

    /**
     * 지정한 ElementId를 formId + 지정한 Element id의 jQuery Selector 문자열 가져오기
     * @param jQuery Selector 문자열로 반환할 ElementId 인자값
     * @return 지정한 앨리먼트가 하나 일 경우 문자열을 2개이상일 경우 배열로 반환
     * @used getStrElementId('elementA', 'elementB', 'elementC');
     */
    this.getStrElementId =function(){

        return __getStrElementId(arguments);
    }

    var __getStrElementId =function(){

        var retValue = null;
        var arguments = arguments[0];
        var cntArgs = arguments.length;

        var typeOf = typeof arguments;
        if(typeOf == 'string'){
            cntArgs = 1;
        }
        else if(typeOf == 'object'){
            arguments = arguments[0];
            typeOf = typeof arguments;
            if(typeOf == 'string'){
                cntArgs = 1;
            }
            else{
                cntArgs =arguments.length;
            }
        }


        if(cntArgs == 1){
            retValue = __getFormOrDivId() + ' ' + '#' +  arguments;
        }
        else{
            retValue = '';
            var arrElementId = new Array();
            for(var i=0; i < cntArgs; i++){
                arrElementId.push('#' + arguments[i]);
            }
            retValue = __getFormOrDivId() + ' ' +  arrElementId.join(",");

        }
        return retValue;
    }


    this.getElementId =function(){
        return __getElementId(arguments);
    }

    var __getElementId =function(){

        var arguments = arguments[0];
        var cntArgs = arguments.length;

        var typeOf = typeof arguments;
        if(typeOf == 'string'){
            cntArgs = 1;
        }
        else if(typeOf == 'object'){
            arguments = arguments[0];
            cntArgs =arguments.length;
        }

        var elementStr = __getStrElementId(arguments);
        retValue = $(elementStr);

        return retValue;
    }

    /**
     * 지정한 ElementId를 formId + 지정한 Element Name의 jQuery Selector 문자열 가져오기
     * @param jQuery Selector 문자열로 반환할 Element Name 인자값
     * @return 지정한 앨리먼트가 하나 일 경우 문자열을 2개이상일 경우 배열로 반환
     * @used getStrElementNm('elementA', 'elementB', 'elementC');
     */
    this.getStrElementNm =function(){

      return __getStrElementNm(arguments);
    }

    var __getStrElementNm =function(){

        var retValue = null;

        var arguments = arguments[0];
        var cntArgs = arguments.length;

        var typeOf = typeof arguments;
        if(typeOf == 'string'){
            cntArgs = 1;
        }
        else if(typeOf == 'object'){
            arguments = arguments[0];
            typeOf = typeof arguments;
            if(typeOf == 'string'){
                cntArgs = 1;
            }
            else{
                cntArgs =arguments.length;
            }
        }

        if(cntArgs == 1){
            retValue = __getFormOrDivId() + ' ' + ':input[name=' + arguments +']';

        }
        else{
            retValue = '';
            var arrElementId = new Array();
            for(var i=0; i < cntArgs; i++){
                arrElementId.push(':input[name=' + arguments[i] +']');
            }
            retValue = __getFormOrDivId() + ' ' +  arrElementId.join(",");
        }
        return retValue;
    }


    /**
     * 지정한 ElementId를 formId + 지정한 Element id의 jQuery Selector 객체 가져오기
     * @param jQuery Selector 객체로 반환할 Element Name 인자값
     * @return 지정한 앨리먼트가 하나 일 경우 하나의 앨리먼트 객체, 2개이상일 경우 배열로 반환
     */
    this.getElementNm =function(){

        return __getElementNm(arguments);

    }

    var __getElementNm =function(){

        var arguments = arguments[0];
        var cntArgs = arguments.length;

        if(cntArgs == 1){
            var typeOf = typeof arguments;
            if(typeOf == 'string'){
                cntArgs = 1;
            }
            else if(typeOf == 'object'){
                arguments = arguments[0];
                cntArgs =arguments.length;
            }
        }

        var elementStr = __getStrElementNm(arguments);
        retValue = $(elementStr);

        return retValue;
    }


    /**
     * 해당 Form 데이터를 서버로 보낼 데이터를 해쉬화하여 가져오기
     * @return Form 내 :input 앨리먼트들의 데이터를 해쉬화하여 반환
     */
    this.getFormData = function(){
        return cf_serializeArray(__getFormString());
        //return $(__getFormString()).serializeArray();
    }

    this.getDivData = function(_divElement){
        var divElements = null;

        if(_divElement == undefined){
            divElements = $('#' + m_divId + ' :input').not('[type=button]');
        }else{
            divElements = $('#' + _divElement + ' :input').not('[type=button]');
        }

        var retValue = {};
        for(var i=0, cnt = divElements.length; i < cnt; i++ ){
            retValue[divElements[i].name] = __getValue(divElements[i].name);
        }
        return retValue;
    }

    /**
     * HTML의 FormId 내 지정한 selector로 조회된 Element 객체 가져오기
     * @param _selector jQuery Selector
     * @return selector한 앨리먼트 객체 반환
     */
    this.querySelector= function(_selector){

        return __querySelector(_selector);
    }

    var __querySelector= function(_selector){

        var rtnval = null;

        //if(__getFormString() == _selector)
        if(__getFormOrDivId() == _selector){
            rtnval = $(_selector);
        }else{
            //rtnval = $(__getFormString() + ' ' + _selector);
            rtnval = $(__getFormOrDivId() + ' ' + _selector);
        }
        return rtnval;
    }

    /**
     * HTML의 FormId + 입력한 selector 조합 문자열 반환
     * @param _selector jQuery Selector
     * @return FormId + 입력한 selector 문자열 반환
     */
    this.querySelectorStr = function(_selector){

        return __querySelectorStr(_selector);
    }

    var __querySelectorStr= function(_selector){

        var rtnval = null;

        //if(__getFormString() == _selector)
        if(__getFormOrDivId() == _selector)
        {
            rtnval = _selector;
        }
        else
        {
            //rtnval = __getFormString() + ' ' + _selector;
            rtnval = __getFormOrDivId() + ' ' + _selector;

        }

        return rtnval;
    }

    /**
     * 지정한 Element 숨기기
     * @param argument
     */
    this.hide = function(){

        var elements = null;

        if(arguments.length == 0){
            elements = __querySelector(":input");
        }else{
            elements = __querySelector(arguments)
        }

        if(arguments == undefined) return;

        elements.hide();
    }



    var __getElement2Attr = function(){

        if(arguments == undefined) return;
        arguments = arguments[0];

        var elements = new Array();
        var cntArg = arguments.length;

        if(cntArg == 1){
            if(typeof arguments == 'boolean'){
                elements = __querySelector(":input");
            }
        }else{
            var arrElement = new Array();
            for(var i=0,cnt =arguments.length ; i < cnt - 1; i++ ){
                arrElement.push(__getElement(arguments[i]));
            }
            elements = arrElement;
        }

        return elements;
    }
    /**
     * 지정한 Element 보이기
     * @param argument
     */
    this.show = function(){
        if(arguments == undefined) return;

        var elements = __getElement2Attr(arguments);

        var cntArg = arguments.length;
        var isShow = false;
        if(cntArg == 1){
            if(typeof arguments[0] == 'boolean'){
                isShow = arguments[0];
            }
        }else{
            isShow = arguments[cntArg-1];
        }

        if(elements instanceof Array){
            for(var i=0, cnt=elements.length; i<cnt; i++){
                if(isShow == true){
                    elements[i].show();
                }else{
                    elements[i].hide();
                }
            }
        }else{
            if(isShow == true){
                elements.show();
            }else{
                elements.hide();
            }
        }
    }

    /**
     * 지정한 Element 보이기
     * @param argument
     */
    this.showGroup = function(){

        if(arguments == undefined) return;

        var elements = __getElement2Attr(arguments);

        var isShow = false;
        var cntArg = arguments.length;
        if(cntArg == 1){
            if(typeof arguments[0] == 'boolean'){
                isShow = arguments[0];
            }
        }else{
            isShow = arguments[cntArg-1];
        }
        if(elements instanceof Array){
            for(var i=0, cnt=elements.length; i<cnt; i++){
                if(isShow == true){
                    elements[i].closest('.control-group').show();
                }else{
                    elements[i].closest('.control-group').hide();
                }
            }
        }else{
            if(isShow == true){
                elements.closest('.control-group').show();
            }else{
                elements.closest('.control-group').hide();
            }
        }
    }

    /**
     * 지정한 Element 보이기
     * @param argument
     */
    this.readonly = function(){

        if(arguments == undefined) return;

        var elements = __getElement2Attr(arguments);

        var isReadOnly = false;
        var cntArg = arguments.length;
        if(cntArg == 1){
            if(typeof arguments[0] == 'boolean'){
                isReadOnly = arguments[0];
            }
        }else{
            isReadOnly = arguments[cntArg-1];
        }
        if(elements instanceof Array){
            for(var i=0, cnt=elements.length; i<cnt; i++){

                elements[i].prop("readonly", isReadOnly);

            }
        }else{
            elements.prop("readonly", isReadOnly);
        }
    }

    /**
     * [arguments] 지정한 ElementId 또는 Name을 disabled
     * @param disabled 하고자 하는 Element
     * @param disabled 여부
     */
    this.disabled = function(){

        if(arguments == undefined) return;

        var elements = __getElement2Attr(arguments);

        var isDisabled = false;
        var cntArg = arguments.length;
        if(cntArg == 1){
            if(typeof arguments[0] == 'boolean'){
                isDisabled = arguments[0];
            }
        }else{
            isDisabled = arguments[cntArg-1];
        }
        if(elements instanceof Array){
            for(var i=0, cnt=elements.length; i<cnt; i++){
            	
            	var element = elements[i]; 
            		element.prop("disabled", isDisabled);
            		
            	__disabledCheckRadio(element, isDisabled)
            	
                var dtpicker = element.data('dtpicker');
                if(dtpicker != undefined){ //데이터피커일 경우
                    var dtElements = element.siblings();
                    for(var j = 0, cntIdx = dtElements.length; j < cntIdx; j++){
                    	
                        $(dtElements[j]).prop("disabled", isDisabled);
                    }

                }
            }
        }else{
            elements.prop("disabled", isDisabled);
        
            __disabledCheckRadio(elements, isDisabled)
            
            var dtpicker = elements.data('dtpicker');
            if(dtpicker != undefined){//데이터피커일 경우
                var dtElements = elements[i].siblings();
                for(var i = 0, cnt = dtElements.length; i < cnt; i++){
                    $(dtElements[i]).prop("disabled", isDisabled);
                }
            }
        }
    }

    var __disabledCheckRadio = function(element, isDisabled){
    	
    	var spnControl = null;    	
    	var type       = element.attr('type');
    	
    	if(type != 'checkbox' && type != 'radio') return;
    	
    	if(type == 'checkbox')   spnControl = element.siblings('span.inp-check').eq(0);
    	else if(type == 'radio') spnControl = element.siblings('span.inp-radio').eq(0);
    	
    	if(isDisabled == true) spnControl.addClass('disabled');
    	else spnControl.addClass('remove');            	

    }

    this.getElement = function(_element){
        return __getElement(_element);
    }


    var __getElement = function(_element){

        var retValue = null;

        var typeOf = typeof _element;

        if(typeOf == 'string'){
            retValue = __getElementId(_element);
            if(retValue.length < 1){
                retValue = __getElementNm(_element);
            }
        }else{
            if(_element instanceof Element){
                retValue = $(_element);
            }else{
                retValue = _element;
            }

        }

        var cntElement = retValue.length;
        if(typeOf == 'string' && cntElement == 0){
            retValue = __getElementNm(_element);
        }

        return retValue;
    }

    /**
     * 지정한 Element 값 설정하기
     * @param _element 값 설정할 ElementId 또는 Element Name
     */
    this.setValue = function(_element, _value){

        __setValue(_element, _value);
    }

    var __setValue = function(_element, _value){

        var elements    = __getElement(_element);
        var tagName     = elements.prop('tagName');
        var elementType = elements.prop('type');

        switch(tagName)
        {
        case 'INPUT':
            {
                switch(elementType)
                {
                case 'text':
                case 'hidden':
                case 'password':
                case 'tel':
                case 'number':
                    elements.val(_value);
                    break;

                case 'checkbox':
                case 'radio':

                    for(var i=0, cnt=elements.length; i< cnt; i++){
                        var element = $(elements[i]);
                        if(element.val() == _value){
                            element.prop("checked", true);
                        }else{
                            element.prop("checked", false);
                        }
                    }
                    break;

                default:
                    break;

                }
            }
            break;

        case 'TEXTAREA':
            elements.val(_value);
            break;


        case 'SELECT':
            elements.val(_value);
            break;

        case 'SPAN':
            elements.text(_value);
            break;

        default:
            console.log('[DEV] %s 지정한 테그일 경우 추가 작업이 필요할 수 있습니다..', tagName);
            break;
        }
    }

    var __getValue = function(_element){

        var retValue = null;

        var elements    = __getElement(_element);
        var tagName     = elements.prop('tagName');
        var elementType = elements.prop('type');

        switch(tagName)
        {
        case 'INPUT':
            {
                switch(elementType)
                {
                case 'text':
                case 'hidden':
                case 'password':
                case 'tel':
                case 'number':                	
                    retValue = elements.val();
                    break;

                case 'checkbox':
                case 'radio':
                    var arrValue = new Array();

                    for(var i=0, cnt=elements.length; i< cnt; i++){
                        var element = $(elements[i]);
                        if(element.prop("checked") == true){
                            arrValue.push(element.val());
                            if(elementType == 'radio') break;
                        }
                    }
                    var cntVal = arrValue.length;
                    if(cntVal == 0){
                        retValue = "";
                    }else if(cntVal == 1){
                        retValue = arrValue[0];
                    }else{
                        retValue = arrValue;
                    }
                    break;

                default:
                    break;
                }
            }
            break;

        case 'TEXTAREA':
            retValue = elements.val();
            break;


        case 'SELECT':
            retValue = elements.val();
            break;

        default:
            console.error('[DEV] 지정한  테그일 경우 추가 작업이 필요할 수 있습니다..');
            break;
        }
        return retValue;
    }
    /**
     * 지정한 Element 값 가져오기
     * @param _element 값 가져올 Element id 또는 name
     */
    this.getValue = function(_element){

        return __getValue(_element);
    }

    /**
     * 지정한 Element 값 초기화
     * @param _element 값 가져올 Element id 또는 name
     */
    this.clear = function(){

        for(var i=0,cnt = arguments.length; i< cnt; i++){

            var elements    = __getElement(arguments[i]);
            var tagName     = elements.prop('tagName');
            var elementType = elements.prop('type');

            switch(tagName)
            {
            case 'INPUT':
                {
                    switch(elementType)
                    {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'tel':
                    case 'number':
                        elements.val('');
                        break;

                    case 'checkbox':
                    case 'radio':
                        elements.checked = elements.defaultChecked;
                        for(var i=0, cnt=elements.length; i< cnt; i++){
                            var element = $(elements[i]);
                            if(element.prop("defaultChecked") == true){
                                element.prop("checked", true);
                            }else{
                                element.prop("checked", false);
                            }
                        }
                        break;

                    default:
                        break;
                    }
                }
                break;

            case 'TEXTAREA':
                element.val('');
                break;


            case 'SELECT':
                elements.selectedIndex = 0;
                break;

            default:
                console.log('[DEV] 지정한 테그일 경우 추가 작업이 필요할 수 있습니다..');
                break;
            }
        }

    }

    /**
     * Element에 동적 이벤트 설정하기
     * @param _element 값 가져올 Element id 또는 name
     */
    this.setEvent = function(_args){

        for(var i=0, cnt=_args.length; i < cnt; i++){

            //console.log('%s, %s,%s,%s',_args[i][1], _args[i][2], _args[i][3]);
            var elements =  __querySelector(_args[i][0]);
//            elements.on(_args[i][1], function(event){
//                _args[i][2];
//                event.preventDefault();
//            });
            if(_args[i][3] == undefined || _args[i][3] == false){
                elements.on(_args[i][1], _args[i][2]);
            }else{
            	
                $(document).off(_args[i][1], __querySelectorStr(_args[i][0])).on( _args[i][1] , __querySelectorStr(_args[i][0]) , _args[i][2]);
            }

            //$(document).on(_args[i][1], elements, _args[i][2]);
        }
    }

    /**
     * 공통 SelectBox 데이터 설정하기
     * @param _arrOptData 공통설정 배열
     */
    this.initOptionData = function(_arrOptData){
        if(_arrOptData == undefined){
            if(_arrOptData.length != 5){
                console.error("initOptionData('펑션타입', '그려질 위치', '동기화방식',  '보낼데이터', '콜백');");
            }
        }
        for(var i=0, cnt = _arrOptData.length; i < cnt;i++ ){
            cf_initOptionData(_arrOptData[i][0], __querySelectorStr(_arrOptData[i][1]), _arrOptData[i][2],  _arrOptData[i][3], _arrOptData[i][4]);
        }
    }

    /**
     * 일자세팅 : 오늘 기준으로 몇일
     * @author Toby Kim
     * @param ElementID : 일자표시
     * @param Diff      : 오늘로 부터 차이 (d+1,d-1,m+1,m-1,y+1,y-1....)
     * @since 2013-02-25
     */
    this.setDate = function(_elementId, _diff){

        //var elementId = __getFormString() + ' ' + '#' + _elementId;
        var elementId = __getFormOrDivId() + ' ' + '#' + _elementId;

        cf_setDate(elementId,_diff);
    }

    this.setThisMonth = function(_elementId){
        //var elementId = __getFormString() + ' ' + '#' + _elementId;
        var elementId = __getFormOrDivId() + ' ' + '#' + _elementId;
        cf_setThisMonth(elementId);
    }

    /**
     * Select 태그에 option 추가
     * @param _element Select ElementId
     * @param _key option의 value 값
     * @param _value option의 text 값
     * @param _index 지정한 index에 추가, 생략시 마지막 항목으로 추가
     */
    this.insertOption = function(_element, _key, _value, _index){

        var element = document.getElementById(_element);
        var option  = document.createElement( "OPTION" );
            option.value = _key;
            option.text  = _value;

        if( _index == null || _index == 'undefined' )
        {
            element.options.add( option );
        }
        else
        {
            element.options.add( option, _index);
        }
    }

    this.setTitle = function(_title){
        m_title = _title;
        __setTitle(_title);
    }

    this.modal = function(_modelElemet, _callBack){

        if(_modelElemet.indexOf(' ') != -1){
            console.error('공통 #divModal에 모달을 적용하기 위해 앞에 오는 앨리먼트는 생략하시오');
        }

        var divCurScreen = $("#"+$("div[data-page=Y].current").attr("id"));
        
        var modal = $('#divModal' + ' ' + _modelElemet).modal("toggle");

        $('#divModal' + ' ' + _modelElemet).addClass("in2");

        if(_callBack != undefined){
            modal.on('shown', function(){
            						divCurScreen.hide(); 
            						_callBack();
            	   			  })
                 .on('hidden', function(){
                	 divCurScreen.show();
                     $('#divModal' + ' ' + _modelElemet).removeClass("in2");
                     
                     $('#divModal').html('');
                     
            });
        }
    }

    this.loadPage = function(_file, _back, _front, _callBackFn){

        cf_loadPage(_file, _back, _front, _callBackFn);
    }

    /**
     * 히스토리 영역그리기
     */
    var __drawHistoryArea = function(){

        var divPreScreen   = "#"+$("div[data-page=Y].current").attr("id");
        var divHistoryBack = "<div id='divHistoryBack' data-page='Y'></div>";

        if($('#divHistoryBack').length > 0) return;

        $(divPreScreen).parent().prepend(divHistoryBack);
    }

    this.showBtnMenu = function(_isSHow){

        __showCommonButton("#liShowMenu"  ,  _isSHow);
        __showCommonButton("#liHeaderBack", !_isSHow);
    }


    this.showBtnBack = function(_isSHow){

        __showCommonButton("#liHeaderBack", _isSHow);
    }

    this.showBtnHome = function(_isSHow){

        __showCommonButton("#liHome", _isSHow);
        __showCommonButton("#liHeaderBack", !_isSHow);
    }

    this.showBtnQuickSearch = function(_isSHow){

        __showCommonButton("#liQuickSearch", _isSHow);
        __showCommonButton("#liHeaderBack", !_isSHow);
    }

    this.formMapper = function(_jsonData){

        if(_jsonData == undefined || _jsonData == '') return;

        if(_jsonData instanceof Array){
            $.each(_jsonData, function( index , entry ){

                $.each(entry,function(key,val){

                    __setValue(key,val);
                });
            });
        }else{
            $.each(_jsonData,function(key,val){

                __setValue(key,val);
            });
        }

    }

    var __drawHeader = function(){

        if($('div.navbar .toptitle').length != 0) return;

        var html = '';
            html += '<div class="navbar-inner">';
            html += '    <div id="PAGE_TITLE" class="toptitle">';
            html += '        <h1></h1>';
            html += '    </div>';
            html += '    <ul>';
            html += '        <li id="liHeaderBack" class="menu-btn btn-back">';
            html += '           <div><span></span></div>';
            html += '           <input type="button" id="btnHeaderBack" value="뒤로" />';
            html += '        </li>';
            html += '        <li id="liShowMenu" class="menu-btn" >';
            html += '            <input type="button" class="btn ico-menu" id="btnShowMenu" />';
            html += '        </li>';
            html += '        <li id="liHome" class="home">';
            html += '            <input type="button" id="btnHome" class="btn ico-home" />';
            html += '        </li>';
            
            if(cf_specialAuth()>0){
                html += '        <li id="liQuickSearch" class="pull-right">';
                html += '           <input type="button" id="btnQuickSearch" class="btn ico-search" />';
                html += '        </li>';
            }
            html += '    </ul>';
            html += '</div>';

        $('div.navbar').html(html);
    }

    var __drawFooter = function(){

        var html = '<p>Copyright (c) 2013, <span>Tkey</span> All rights reserved.</p>';
        $('div.footer').html(html);
    }

    var __initFunc = function(){

        var objCurPage = $("div[data-page=Y].current");
        var objForm    = objCurPage.find("form");
        var cntForms   = objForm.length;

        var objModal   = $('div .modal.in2');
        var cntModal   = objModal.length;

        if(cntModal > 0){
            m_divId = objModal.attr("id");
            //if(cntForms > 0) m_formId = objForm[cntForms-1].id;
            cntForms   = objModal.find('form').length;
            if(cntForms > 0) m_formId = objModal.find('form').attr('id');
            m_flag = 'modal';
            console.info("해당 화면에 Form이 존재하지 않아 %s 앨리먼트를 Form을 대체합니다.", m_divId)
        }else{

            if(cntForms > 0){
                m_formId = objForm[cntForms-1].id;
                m_flag = 'form';
            }else{
                m_divId = $("div[data-page=Y].current").attr("id");
                m_flag = 'div';
                console.info("해당 화면에 Form이 존재하지 않아 %s 앨리먼트를 Form을 대체합니다.", m_divId)
            }
            __drawHistoryArea();

            __drawHeader();
            __drawFooter();
            __chkNewAuth();
        }

        //if(m_flag != 'form') return;
        //var formId = __getFormString();

        cf_MobilePageInit(__getFormOrDivId(),m_pageMode);
    }

    /***********************************************************************/
    __initFunc()
}


function __setTitle(_title){

    m_title = _title;
    //$('#header-title','.page-header').text(m_title);
    $('#PAGE_TITLE h1').text(m_title);
    $('title').text(m_title);
}


function __getTitle(){
    return $('#PAGE_TITLE h1').text();
}

function __showCommonButton(){
    if(arguments == undefined) return;
    var cntArg = arguments.length;
    var elements = new Array();
    for(var i = 0; i < cntArg - 1 ; i++){
        elements.push(arguments[i]);
    }
    var isShow = arguments[cntArg-1];
    for(var i=0, cnt=elements.length; i < cnt; i++){
        if(isShow == true){
            $(elements[i]).show();
        }else{
            $(elements[i]).hide();
        }
    }
}
