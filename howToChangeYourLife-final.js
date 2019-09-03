var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7296);
app.use(express.static('public'));
app.use(express.urlencoded())

app.get('/',function(req,res){
/*
	var context = {};
	request('http://api.paperquotes.com/apiv1/quotes/?tags=inspirational&limit=1',
	handleGet);
	
	function handleGet(err, response, body){
		if(!err && response.statusCode < 400){
			context.quote = body;
			res.render('homepage', context);
		}
	}
*/
	res.render('homepage');
});

app.get('/have-an-idea',function(req,res){
	res.render('haveAnIdea');
});

app.get('/make-a-plan',function(req,res){
	res.render('makeAPlan');
});

app.get('/make-it-happen',function(req,res){
	var context = {};

	if(!req.session.name){
		context.name = "Unknown";
		context.text1 = "No input.";
		context.text2 = "No input.";
		context.text3 = "No input.";
		res.render('makeItHappen', context);
		return;
	}
	
	context.name = req.session.name;
	context.text1 = req.session.text1;
	context.text2 = req.session.text2;
	context.text3 = req.session.text3;
	res.render('makeItHappen', context);
});


app.post('/make-it-happen',function(req,res){
	var context = {};
	
	if(req.body['New-Plan']){
		req.session.name = req.body.name;
		req.session.text1 = req.body.text1;
		req.session.text2 = req.body.text2;
		req.session.text3 = req.body.text3;
	}
	
	if(!req.session.name){
		context.name = "Unknown";
		context.text1 = "No input.";
		context.text2 = "No input.";
		context.text3 = "No input.";
		res.render('makeItHappen', context);
		return;
	}
	
	context.name = req.session.name;
	context.text1 = req.session.text1;
	context.text2 = req.session.text2;
	context.text3 = req.session.text3;
	res.render('makeItHappen', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});