
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.watchRoom = function(req, res){
	res.render('watchRoom', {});
};
