var express = require('express');
var router = express.Router();

router.get('/express', function(req, res, next) {
  res.render('index', { title: 'React' });
});

var links = [];
var likeList = {};

router.get('/api/links', function(req, res, next) {
   res.json({ links: links });
});

router.post('/api/links', function(req, res, next) {
   var newLink = req.body;
   newLink.id = Date.now();
   newLink.like = false;
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

//return all links with T or F on it for like for that user
router.post('/api/links/like', function(req, res, next) {
   var toLike = req.body;
   var ip = req.connection.remoteAddress;//req.headers;
   // console.log('req.headers:###################',ip);
   // console.log('req.connection#######################',req.connection);
   console.log('toLike id', toLike.id);

   console.log('links(before):', links);
   console.log('likeList(before):', likeList);
   if (likeList[ip]) {
      likeList[ip].forEach(function(linkId){
         //if req.body.id is in there, then delete and like=false
         var index = likeList[ip].indexOf(toLike.id);
         console.log('index',index);
         if (index != -1) {
            likeList[ip].splice(index,1);
            if (likeList[ip].length==0) {
               delete likeList[ip]; 
            }
            for (var i=0;i<links.length;i++) {
               if(links[i].id == toLike.id) {
                  links[i].like = false;
                  break;
               }
            }
         }
         //if req.body.id not in there, add and like=true
         else {
            likeList[ip].push(toLike.id);
            for (var i=0;i<links.length;i++) {
               if(links[i].id == toLike.id) {
                  links[i].like = true;
                  break;
               }
            }
         }
      });
   } else {
      likeList[ip] = [];
      likeList[ip].push(toLike.id);
      //update to T in links
      for (var i=0;i<links.length;i++) {
         if(links[i].id == toLike.id) {
            links[i].like = true;
            break;
         }
      }
   }
   console.log('links(after):', links);
   console.log('likeList(after):', likeList);
   res.json(links);
});

module.exports = router;
