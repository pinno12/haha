module.exports = function(passport){
  var bkfd2Password = require("pbkdf2-password");
  var hasher = bkfd2Password();
  var conn = require('../../config/mysql/db')();  
  var route = require('express').Router();
  route.post(
    '/login',
    passport.authenticate(
      'local',
      {
        successRedirect: '/pin',
        failureRedirect: '/auth/login',
        failureFlash: false
      }
    )
  );
  


// route.post('/register', function(req, res){
//   hasher({password:req.body.password}, function(err, pass, salt, hash){
//     var user = {
//       authId:'local:'+req.body.username,
//       username:req.body.username,
//       password:hash,
//       salt:salt,
//        displayName:req.body.displayName
//      };
//      var sql = 'INSERT INTO users SET ?';
//      conn.query(sql, user,function(err, results){
//        if(err){
//          console.log(err);
//          res.status(500);
//        } else{
//           req.login(user, function(err){
//           req.session.save(function(){
//           res.redirect('/pin');
//         });
//       });
//       }
//     });
//   });
// });
// route.get('/register', function(req, res){
//   var sql = 'SELECT id, name FROM pin';
//   res.render('auth/register');
// });


route.get('/login', (req,res)=>{
    res.render('auth/login', {user:req.user, title: "로그인해요"})
  });
  

  route.get('/logout', function(req, res){
    req.logout();
    req.session.save(function(){
    res.redirect('/auth/login', {user:req.user, title: "로그인해요"});
    });
  });
  
return route;

} 