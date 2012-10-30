(function() {

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

  $('#tag-search').click(function() {
    var articles, matchStr, showCnt;
    matchStr = new RegExp($('#searchForm input').val());
    articles = $('article div[tags]');
    articles.hide();
    showCnt = 0;
    $.each(articles, function(idx, at) {
      var flag, str;
      str = $(articles[idx]).attr('tags');
      flag = matchStr.test(str);
      if (flag) {
        $(articles[idx]).show();
        return showCnt++;
      }
    });
    return false;
  });

}).call(this);
