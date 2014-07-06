var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index');
});

router.get('/:name', function(req, res){
	res.render('pages/' + req.params.name);
})

router.get('/partials/:name', function(req, res){
	res.render('partials/' + req.params.name);
});





/** serve jade enabled partials */
/*
router.partials = function(req, res) {
    res.render('partials/' + req.params.name);
};
*/
module.exports = router;
