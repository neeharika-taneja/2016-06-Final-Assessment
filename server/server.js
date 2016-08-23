var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ForgeOauth2 = require('forge-oauth2');
var app = express();
var request = require('request');
const fs = require('fs');



app.use(cookieParser('shhhh, my secret'));
app.use(session({
    secret: 'shhhhhh'
}));
// connect to mongo database named "shortly"
mongoose.connect('mongodb://localhost/shortly');

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
require('./maps/mapModel');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  next();
});

//Gets ths trending gifs 
app.get('/map/results', function(req, res, next) {
  console.log('in /map/results...', typeof(req), req.query);
  console.log('parameters ',req.params )
  var options = req.query;
  var query = '';
  for (var key in options) {
    query += key + "=" + options[key] + "&";
  }
  query = query.substring(0, query.length - 1);

  var options = {
    method: 'GET',
    url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC'
    //url: 'https://maps.googleapis.com/maps/api/geocode/json?' + query
  };
  console.log('Options: ', options)

  request.get(options, function(err, data, body) {
    if (err) {
      return res.send('error');
    }
    console.log('response results: ', body);
    res.send(body);
    });
});

//gets the translated gif and saves the resulting JSON object  to a file on the server.
app.get('/map/translate', function(req, res, next) {
    console.log('in /map/translate...', typeof(req), req.query);
    console.log('parameters ',req.params )
    var options = req.query;
    var query = '';
    for (var key in options) {
        query += key + "=" + options[key] + "&";
    }
    //query = query.substring(0, query.length - 1);

    // two leg oauth
    var options = {
        method: 'GET',
        url: 'http://api.giphy.com/v1/gifs/translate?'+query+'api_key=dc6zaTOxFJmzC'
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?' + query
    };
    console.log('Options: ', options)

    request.get(options, function(err, data, body) {
        if (err) {
            return res.send('error');
        }
        console.log('response results: ', body);
        var strTranslatedObj=JSON.stringify(body);
        fs.writeFile('translatedword_file' ,strTranslatedObj, function (err) {
          if (err) 
          return console.log(err);
          console.log("Translated file written");
        });
        res.send(body);
    });
});

// start listening to requests on port 8000
app.listen(8000);

// export our app for testing and flexibility, required by index.js
module.exports = app;
