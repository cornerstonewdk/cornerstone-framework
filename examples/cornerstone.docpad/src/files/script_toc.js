(function() {
  /*
  $('#searchForm').submit(function() {
    var articles, matchStr;
    matchStr = new RegExp($('#searchForm input').val());
    articles = $('article div[tags]');
    articles.hide();
    $.each(articles, function(idx, at) {
      var flag, str;
      str = $(articles[idx]).attr('tags');
      flag = matchStr.test(str);
      if (flag) {
        return $(articles[idx]).show();
      }
    });
    return false;
  });
  */

  $('#searchForm').submit(function() {
    var articles, matchStr, showCnt;
    matchStr = new RegExp($('#searchForm input').val());
    articles = $('article div[tags]');
    articles.hide();
    $('#nothing').hide();
    showCnt = 0;
    $.each(articles, function(idx, at) {
      var flag, str;
      str = $(articles[idx]).attr('tags');
      flag = false;
      if (str !== "" && str !== void 0) {
        flag = matchStr.test(str);
      }
      if (flag) {
        $(articles[idx]).show();
        return showCnt++;
      }
    });
    if (showCnt === 0) {
      $('#nothing').show();
    }
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
