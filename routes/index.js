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
   console.log('toRemove:', toRemove);
   //newLink.id = Date.now();
   // links.filter(function(el){
   //    return el.id !== req.body.id;
   // });
   //links.splice(links.indexOf(toRemove.id), 1);
   //console.log('links:', links);
   console.log(req.body.id);
   console.log(links);
   links = links.filter(function(el){
      //console.log(el[id]);
      console.log(el.id);
      return el.id !== Number(req.body.id);
   });
   console.log(links);
   res.json(links);
});

module.exports = router;
