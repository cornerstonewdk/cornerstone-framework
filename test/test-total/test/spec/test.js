describe( '종합 테스트', function() {

    

    beforeEach( function() {
    } );

    afterEach( function() {
    } );

    
    it( '로깅 모듈 확인', function(done) {
        require(['widget-tooltip'],function(ToolTip){
            console.log(ToolTip)
            done();
        });

    } );

});
