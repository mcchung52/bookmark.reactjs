var express = require('express');
var router = express.Router();

router.get('/express', function(req, res, next) {
  res.render('index', { title: 'React' });
});

var links = [];

router.get('/api/links', function(req, res, next) {
   res.json({ links: links });
});

router.post('/api/links', function(req, res, next) {
   var newLink = req.body;
   newLink.id = Date.now();
   links.push(newLink);
   console.log('inside post api/links - newLink:', newLink);
   console.log('inside post api/links - links:', links);
   res.json(newLink);
});

router.post('/api/links/remove', function(req, res, next) {
   var toRemove = req.body;
   links = links.filter(function(el){
      //console.log(el[id]); //only if id is a string
      return el.id !== Number(toRemove.id);
   });
   res.json(links);
});

router.post('/api/links/like', function(req, res, next) {
   var toLike = req.body;
   var ip = req.headers;
   console.log('req.headers:###################',ip);
   console.log('req.connection#######################',req.connection);
   // links = links.filter(function(el){
   //    //console.log(el[id]); //only if id is a string
   //    return el.id !== Number(toRemove.id);
   // });
   // res.json(links);
});

module.exports = router;
