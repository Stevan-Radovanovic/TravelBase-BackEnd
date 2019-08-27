var db = require('../db');
var helpers = require('../helpers.js');
var payloadValidator = require("../helpers/payloadValidator.js");

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


	// app.post('/getUserByUsername', function (req, res) {
	// 	console.log("######### /getUserByUsername");
		
	// 	if (!payloadValidator.validatePayload(req.body, ['username',''])){			
	// 		res.json(helpers.getErrorMessage('Invalid payload format', res));
	// 		return;
	// 	}

	// 	let body = req.body;
	// 	console.log("USERNAMEEEEEE"+req.body.username);
	// 	console.log(body);
		
	// 	db.getUserByUsername(body.username).then(resUsers => {
	// 		if(resUsers.rowCount < 1){
    //             helpers.createResponse(res, 200, 202, "There are no users");
    //             return;   
    //         }
	// 		helpers.createResponse(res, 200, 201, "Got user successfully", resUsers.rows);
	// 		return;
	// 	}), (err) => {
	// 		helpers.createResponse(res, 400, 101, "Getting user- db error!");
	// 	}
	// });

	app.post('/getUserByUsername', function (req, res) {
		console.log("######### /getUserByUsername");
		
		if (!payloadValidator.validatePayload(req.body, ['username',''])){			
			res.json(helpers.getErrorMessage('Invalid payload format', res));
			return;
		}

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

	app.post('/getUserBoolean', function (req, res) {
		console.log("######### /getUserBoolean");
		

		let body = req.body;
		console.log("USERNAMEEEEEE"+req.body.username);
		console.log("USERNAMEEEEEE"+req.body.password);
		console.log(body);
		
		db.getUserBoolean(body.username, body.password).then(resUsers => {
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

	app.post('/getUserId', function (req, res) {
		console.log("######### /getUserId");
		
		let body = req.body;
		console.log("USERNAME ZA TRAZENI ID"+req.body.username);
		console.log(body);
		
		db.getUserId(body.username).then(resUsers => {
			if(resUsers.rowCount < 1){
                helpers.createResponse(res, 200, 202, "There are no users");
                return;   
            }
			helpers.createResponse(res, 200, 201, "Got user ID successfully", resUsers.rows);
			return;
		}), (err) => {
			helpers.createResponse(res, 400, 101, "Getting user ID- db error!");
		}
	});

	app.post('/updateUsersOffer', function (req, res) {
		console.log("######### /updateUsersOffer");

		let body = req.body;
	  console.log('BODY: ',body);
			
			db.updateUsersOffer(body.period, body.username,body.meals).then(response => {
				if (response.rowCount < 1) {
					helpers.createResponse(res, 400, 10027, "Error - 0 row updated !");
					return;
				}
				helpers.createResponse(res, 200, 20024, "Successfully updated users");
				return;
			}, err => {
				if(err.message.includes('mealName')){
					helpers.createResponse(res, 400, 10030, "Error - meal already exists!");
					return;
				}
				console.log(err.message);
				helpers.createResponse(res, 400, 10021, "Unknown error, please try again");
            });
        }
		, err => {
			console.log(err.message);
			helpers.createResponse(res, 400, 10031, "Error!");
		});


		app.post('/setUsersOfferPeriod', function (req, res) {
			console.log("######### /setUsersOfferPeriod");
	
			let body = req.body;
			console.log(req.body);
				db.setUsersOfferPeriod(body.period).then(response => {
					if (response.rowCount < 1) {
						helpers.createResponse(res, 400, 10027, "Users offer period inserted - db error!");
						return;
					}
					helpers.createResponse(res, 200, 20024, "Successfully inserted offers period");
					return;
				}, err => {
					if(err.message.includes('mealName')){
						helpers.createResponse(res, 400, 10030, "Error - meal already exists!");
						return;
					}
					console.log(err.message);
					helpers.createResponse(res, 400, 10021, "Unknown error, please try again");
				});
			}
			, err => {
				console.log(err.message);
				helpers.createResponse(res, 400, 10031, "Error!");
			});
	


			app.post('/saveNewRecommendation', function (req, res) {
				console.log("######### /saveNewRecommendation");
		
				let body = req.body;
				console.log(req.body);
					db.saveNewRecommendation(body.title, body.recommendation, body.numOfLikes, body.supporters).then(response => {
						if (response.rowCount < 1) {
							helpers.createResponse(res, 400, 10027, "Users recommendation inserted - db error!");
							return;
						}
						helpers.createResponse(res, 200, 20024, "Successfully inserted recommendation");
						return;
					}, err => {
						if(err.message.includes('mealName')){
							helpers.createResponse(res, 400, 10030, "Error - meal already exists!");
							return;
						}
						console.log(err.message);
						helpers.createResponse(res, 400, 10021, "Unknown error, please try again");
					});
				}
				, err => {
					console.log(err.message);
					helpers.createResponse(res, 400, 10031, "Error!");
				});

				app.post('/updateRecommendation', function (req, res) {
					console.log("######### /updateRecommendation");
			
					let body = req.body;
				  console.log('BODY: ',body);
				  console.log('rec id', body.recommendationId);
				  console.log('rec likes', body.recLikes);
				  console.log('rec user supports', body.supporters.length);


						db.updateRecommendation(body.recommendationId, body.recLikes, body.supporters).then(response => {
							if (response.rowCount < 1) {
								helpers.createResponse(res, 400, 10027, "Error - 0 row updated !");
								return;
							}
							helpers.createResponse(res, 200, 20024, "Successfully updated recommendation");
							return;
						}, err => {
							if(err.message.includes('mealName')){
								helpers.createResponse(res, 400, 10030, "Error - meal already exists!");
								return;
							}
							console.log(err.message);
							helpers.createResponse(res, 400, 10021, "Unknown error, please try again");
						});
					}
					, err => {
						console.log(err.message);
						helpers.createResponse(res, 400, 10031, "Error!");
					});
			




				app.get('/getAllRecommendations', function (req, res) {
					console.log("######### /getAllRecommendations");
					
					db.getAllRecommendations().then(resUsers => {
						if(resUsers.rowCount < 1){
							helpers.createResponse(res, 200, 202, "There are no recommendations");
							return;   
						}
						helpers.createResponse(res, 200, 201, "Got all available recommendations successfully", resUsers.rows);
						return;
					}), (err) => {
						helpers.createResponse(res, 400, 101, "Getting all recommendations- db error!");
					}
				});

				app.get('/getAllRecommendations', function (req, res) {
					console.log("######### /getAllRecommendations");
					
					db.getAllRecommendations().then(resUsers => {
						if(resUsers.rowCount < 1){
							helpers.createResponse(res, 200, 202, "There are no recommendations");
							return;   
						}
						helpers.createResponse(res, 200, 201, "Got all available recommendations successfully", resUsers.rows);
						return;
					}), (err) => {
						helpers.createResponse(res, 400, 101, "Getting all recommendations- db error!");
					}
				});
	
}