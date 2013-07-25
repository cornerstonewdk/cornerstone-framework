describe( 'Cornerstone event extend test case', function() {

    beforeEach( function() {
    } );

    afterEach( function() {
        // $( '#mocha-fixture' ).html( '' );
    } );

    describe( 'widget-button', function () {
        it( '싱글 토글 버튼에 toggleOn, toggleOff 이벤트', function () {
            var buttonHTML = '<button type="button" class="btn btn-primary" data-toggle="button">Single toggle</button>';
            var button = $( buttonHTML ).button();
            
            $( '#mocha-fixture' ).append( button );
            
            button.on( 'toggleOn.cs.button', function ( e ) {
                console.log( 'toggleOn 발생' );
                e.preventDefault();
                expect(e).to.be.an('object');
            } ).on( 'toggleOff.cs.button', function ( e ) {
                console.log( 'toggleOff 발생' );
                e.preventDefault();
                expect(e).to.be.an('object');
            } ).trigger( 'click' ).trigger( 'click' );
        } );

        it( '라디오 버튼 그룹의 toggleOn 이벤트', function () {
            var radioHTML = '<div class="btn-group" data-toggle="buttons">'
                + '<label class="btn btn-primary">'
                + '<input type="radio" name="options" id="option1"> Option 1'
                + '</label>'
                + '<label class="btn btn-primary">'
                + '<input type="radio" name="options" id="option2"> Option 2'
                + '</label>'
                + '<label class="btn btn-primary">'
                + '<input type="radio" name="options" id="option3"> Option 3'
                + '</label>'
                + '</div>';
            var radio = $( radioHTML ).button();
            
            $( '#mocha-fixture' ).append( radio );

            radio.on( 'toggleOn.cs.button', function ( e ) {
                console.log( 'toggleOn 발생' );
                e.preventDefault();
                expect(e).to.be.an('object');
            } ).on( 'toggleOff.cs.button', function ( e ) {
                console.log( 'toggleOff 발생' );
                e.preventDefault();
                expect(e).to.be.an('object');
            } );


            
        } );
    } );

    // describe( 'carousel', function () {
    //     it( '' )
    // } );
} );
