define( [ 'backbone' ], function( Backbone ) {

    return Backbone.View.extend( {

        initialize: function() {
            console.log( 'validationView init.');
        },

        reset: function() {
            console.log( '유효성 검사전 호출' );
        },

        success: function() {
            console.log( '유효성 검사 성공!!' );
        },

        fail: function( err ) {
            alert( '[ 25 ] ' + err.message || err );
            if ( err.attribute ) this.$( ':input[name=' + err.attribute + ']:first' ).focus();
        }
    } );
} );