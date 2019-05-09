
var express = require('express');
var app = express();
var fs = require('fs');
var server = app.listen(8888,function(){
  console.log('Express on 8888: OK');
});



var bp = require('body-parser');

app.use( bp.urlencoded({extended:true}));

/*var db =new loki('user.json');
var user = db.addCollection('user');
user.insert({name:'Alex'});*/

var loadUser = function(){
  return new Promise(function(res,rej){
    fs.readFile('user.json', function(err,data){
      if(err)rej();
      else res();
    }
  );
});
}

var findUser = function(user, username, password) {
  return new Promise( function(res,rej) {
    for ( let i in user.user){
      if ( user.user[i].name == username){
        if(  user.user[i].pwd == password){
          res();
        }
      }
    }
    rej();
  });
}

app.use( function( request,response,next) {
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Methods','GET, DELETE, POST, PUT');
  next();
});


app.post('/user', function(req,res){
  var username = req.body.u;
  console.log( username );
  loadUser()
  .then( function(user){
    return findUser(user, username);
  })
  .then(function(){
    res.end('OK');
})
.catch( function(){
   saveUser(user)
   .then(function(){
     res.end('User angelegt');
   })

})

})
