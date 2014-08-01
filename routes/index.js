var express = require('express');
var router = express.Router();

/* GET Webapp. */
router.get('/', function(req, res) {
	res.sendfile('../public/index.html'); // load our public/views/index.html file
});
module.exports = router;