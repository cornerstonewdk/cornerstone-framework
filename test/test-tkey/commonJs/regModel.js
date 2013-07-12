define( [ 'backbone','jquery','cf_validation'], function( Backbone,$,cf_Validation) {
    return Backbone.Model.extend( {
        validate: function( attrs ) {
            for(key in attrs){
                //Validation Check
                retVal=cf_Validation.cf_doValidation_element(key, attrs[key]);
                if(retVal != null && retVal.message != undefined){
                    break;
                }
            }
            if(retVal != null && retVal.message != undefined){
                return retVal;
            }
        }
    } );
} );