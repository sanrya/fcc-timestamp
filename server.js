 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var sugar = require('sugar');
var app = express();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

// app.get('/_api/package.json', function(req, res, next) {
//     console.log('requested');
//     fs.readFile(__dirname + '/package.json', function(err, data) {
//       if(err) return next(err);
//       res.type('txt').send(data.toString());
//     });
//   });
app.get('/:first', function(req,res){
  var input = decodeURIComponent(req.params.first)
  var isnum = /^\d+$/.test(input);
  var dateStr = "";
  if(!(isnum)){
  var theTime = new Date(decodeURIComponent(req.params.first))
  console.log(theTime)
  }
  
  else if(isnum){
  var theTime = new Date(parseInt(input))
  console.log(theTime)
      }
  
  // else if(!(isnum)){
  // var theTime = new Date(decodeURIComponent(req.params.first))
  // console.log(theTime)
  // }
  dateStr = months[theTime.getMonth()] + " " + theTime.getDate() + ", " + theTime.getFullYear() 
  if (theTime != "Invalid Date"){res.send({"unix": theTime.getTime(), "natural": dateStr})}
  else{res.send({"unix": null, "natural": null})}
})
// 1527248302
// January 1, 2016


  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

