define( [ 'backbone', 'logging' ], function( Backbone, Logging ) {

    return Backbone.View.extend( {

        initialize: function() {
            Logging.debug( 'validationView init.');
        },

        reset: function() {
            Logging.debug( '유효성 검사전 호출' );
        },

        success: function() {
            Logging.debug( '유효성 검사 성공!!' );
        },

        fail: function( err ) {
            alert( '[ 25 ] ' + err.message || err );
            if ( err.attribute ) this.$( ':input[name=' + err.attribute + ']:first' ).focus();
        }
    } );
} );