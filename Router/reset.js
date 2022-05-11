const express = require('express');
const routered = express.Router();


var api_key = 'e321c42083b7f8a450ac647d7d0f7f6b-100b5c8d-cdde3d55';
var domain = 'sandboxf0933cf46f9f4f689f3f764b823354a4.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
routered.get('/email',(req,res)=>{
    res.render('forgotpage');
    var data = {
        from: '<shriniwash.bay20@gmail.com>',
        to: 'shriniwash.bay20@gmail.com',
        subject: 'Hello there',
        text: 'Testing some Mailgun awesomeness!'
      };
       
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
      

})


module.exports = routered;