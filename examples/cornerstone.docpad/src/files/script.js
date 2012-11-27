(function() {
  
  var template;
  
  function renderDocuments( data ) {
    
    var rows = [];
    var cols = [];
    
    for ( var i = 0; i < data.length; i++ ) {
      cols.push( data[ i ] );
      if ( cols.length == 3 || i == data.length - 1 ) {
        rows.push( cols );
        cols = [];
      }
    }
    
    $( '#documents' ).html( template( rows ) );
  }
  
  $( function() {
    $.get( 'documents.template', function( data ) {
      
      template = Handlebars.compile( data );
      
      $.get( 'documents.json', function( data ) {
        renderDocuments( data );
      }, 'json' );
    } );
  } );

  $('#searchForm').submit(function() {
    
    $.get( 'documents.json', function( data ) {
      
      var query = $( '.search-query' ).val();
      var searchResult = [];
      
      if ( query )
        for ( var i = 0; i < data.length; i++ ) {
          if ( data[ i ].tags && data[ i ].tags.toUpperCase().indexOf( query.toUpperCase() ) > -1 ) searchResult.push( data[ i ] );
        }
      else
        searchResult = data;
      
      renderDocuments( searchResult );
    }, 'json' );
    return false;
  });

  $('#tag-search').click(function() {
    $('#searchForm').submit();
  });

  $('.search-query').click(function() {
    return $('.search-query').select();
  });
  
  $( '.search-query' ).change( function() {
    $('#searchForm').submit();
  } );

}).call(this);

