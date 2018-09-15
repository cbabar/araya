'use strict';
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');


const app = express();


//View Engine
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Static Folder
app.use(express.static(__dirname))


//Node Mailer 
var transporter = nodemailer.createTransport({
    service: 'gmail',
	auth: {
        type: 'OAuth2',
        user: "noreply.ambekararayas@gmail.com",
        clientId: "598558263111-k48b96gg1strqqje71kha45r0d13icel.apps.googleusercontent.com",
        clientSecret: "hPVCsFiP9U48TD4SgAU5SWaG",
        refreshToken: "1/TIUnv-lOz7wIyR2zpCh1KIOuGpBfS4qY8BUON01yuF0",
    }
});



/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || 3000; // 2. Using process.env.PORT
app.set('port', port);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/contact', function(req, res) {
	var outPut = `
	<p>You have a New Message</p> 
	<h3>Contact Details</h3> 
	<ul>    
		<li>Name :	${req.body.name}</li>     
		<li>Email: ${req.body.email}</li>    
		<li>Subject: ${req.body.subject}</li>    
	</ul>
	<h3>Message</h3> 
	${req.body.message}
	`;
	req.body.subject = req.body.subject === '' ? 'Request Enquiry | Site' : req.body.subject;
	let mailOptions = {
		from: 'noreply@ambekararays@gmail.com', // sender address
		to: 'crb1991@gmail.com', // list of receivers
		subject: req.body.subject, // Subject line
		text: 'New Request', // plain text body
		html: outPut // html body
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		res.send({message: "success"})
	});
});

app.listen(port, () => console.log('Listening on Port ' + port + '  \nServer Started Reallyy !!!!'));