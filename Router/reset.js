const express = require('express');
const routered = express.Router();
require('../model/db');
const userModel = require('../model/schema');


// var api_key = 'e321c42083b7f8a450ac647d7d0f7f6b-100b5c8d-cdde3d55';
// var domain = 'sandboxf0933cf46f9f4f689f3f764b823354a4.mailgun.org';
// var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
// routered.get('/email',(req,res)=>{
//     res.render('forgotpage');
//     var data = {
//         from: '<shriniwash.bay20@gmail.com>',
//         to: 'shriniwash.bay20@gmail.com',
//         subject: 'Hello there',
//         text: 'Testing some Mailgun awesomeness!'
//       };
       
//       mailgun.messages().send(data, function (error, body) {
//         console.log(body);
//       });
      

// })
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const async = require('hbs/lib/async');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '738c73412029eee29d1f62fc0fa13d90-100b5c8d-e2e35a60'});


routered.post('/reset',(req,res)=>{
  userModel.findOne({username:req.body.email},(err,data)=>{
      if(err){
          console.log(err);
      }else{
          mg.messages.create('sandboxe079bbcfd9044590aa4a9939ab462305.mailgun.org', {
            from: "<smps03620@gmail.com>",
            to: 'smps03620@gmail.com',
            subject: "Hello there",
            text: `http://localhost:3000/reset/${data.id}`,
            html: "<h1>`http://localhost:3000/reset/${ids}`</h1>"
          })
          .then(msg => console.log(msg))
          .catch(err => console.log(err));
      }
  })
})




module.exports = routered;