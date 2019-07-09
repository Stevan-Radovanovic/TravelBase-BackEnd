var db = require('../db');
var helpers = require('../helpers.js');

module.exports = function(app) {

    app.get('/getAllUsers', function (req, res) {
        console.log("######### /getAllUsers");
        
		db.getAllUsers().then(resUsers => {
			if(resUsers.rowCount < 1){
                helpers.createResponse(res, 200, 202, "There are no users");
                return;   
            }
			helpers.createResponse(res, 200, 201, "Got all available users successfully", resUsers.rows);
			return;
		}), (err) => {
			helpers.createResponse(res, 400, 101, "Getting all users - db error!");
		}
	});


	app.post('/getUserByUsername', function (req, res) {
		console.log("######### /getUserByUsername");
		
		let body = req.body;
		console.log("USERNAMEEEEEE"+req.body.username);
		console.log(body);
		
		db.getUserByUsername(body.username).then(resUsers => {
			if(resUsers.rowCount < 1){
                helpers.createResponse(res, 200, 202, "There are no users");
                return;   
            }
			helpers.createResponse(res, 200, 201, "Got user successfully", resUsers.rows);
			return;
		}), (err) => {
			helpers.createResponse(res, 400, 101, "Getting user- db error!");
		}
	});

	
}