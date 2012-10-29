
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path');

var app = express();

var YQL = require('yql');

app.configure(function(){
  app.set('port', process.env.PORT || 8089);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
	fs.readFile('views/index.html', function(err, data){
		if(err){
			res.end(err);
		} else {
			res.end(data);	
		}
	});
});

app.get('/getSktBlogRss', function(req, res){
	new YQL.exec("SELECT * FROM rss where url = 'http://blog.sktworld.co.kr/rss'", function(response) {
	
		if (response.error) {
			console.log("Example #1... Error: " + response.error.description);
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			res.end(response.error.description);
		} 
		else {
			var result = JSON.stringify(response.query.results);
			
			res.writeHead(200, {'Content-Type': 'text/javascript'});
	        res.end(result)
		}
	
	});
});

app.get('/t-dashboard', function(req, res){
	fs.readFile('views/index.html', function(err, data){
		if(err){
			res.end(err);
		} else {
			res.end(data);	
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
