var db = require('../db');
var helpers = require('../helpers.js');

module.exports = function(app) {
    app.post('/saveWeeklyOffer', function (req, res) {
		console.log("######### /saveWeeklyOffer");


		let body = req.body;
					
			db.saveWeeklyOffer(body.period, body.monday, body.tuesday, body.wednesday, body.thursday, body.friday).then(response => {
				if (response.rowCount < 1) {
					helpers.createResponse(res, 400, 10027, "Weekly offer insert - db error!");
					return;
				}
				helpers.createResponse(res, 200, 20024, "Successfully added weekly offer");
				return;
			}, err => {
				/* if(err.message.includes('period')){
					helpers.createResponse(res, 400, 10030, "Error - weekly offer already exists!");
					return;
				} */
                console.log(err.message);
                console.log(err);
                
				helpers.createResponse(res, 400, 10021, "Unknown error, please try again");
            });
        }
		, err => {
			console.log(err.message);
			helpers.createResponse(res, 400, 10031, "Error!");
		});



		app.get('/getWeeklyOffer', function (req, res) {
			console.log("######### /getWeeklyOffer");
			
			
			db.getWeeklyOffer().then(resOffers => {
				if(resOffers.rowCount < 1){
					helpers.createResponse(res, 200, 202, "There are no offers");
					return;   
				}
				helpers.createResponse(res, 200, 201, "Got weekly offer successfully", resOffers.rows);
				return;
			}), (err) => {
				helpers.createResponse(res, 400, 101, "Getting weekly offer- db error!");
			}
		});

		app.get('/getAllPeriods', function (req, res) {
			console.log("######### /getAllPeriods");
			
			
			db.getAllPeriods().then(resOffers => {
				if(resOffers.rowCount < 1){
					helpers.createResponse(res, 200, 202, "There are no periods");
					return;   
				}
				helpers.createResponse(res, 200, 201, "Got all periods offer successfully", resOffers.rows);
				return;
			}), (err) => {
				helpers.createResponse(res, 400, 101, "Getting periods offer- db error!");
			}
		});

		app.get('/getPreviousWeeklyOffer', function (req, res) {
			console.log("######### /getPreviousWeeklyOffer");
			
			
			db.getWeeklyOffer().then(resOffers => {
				if(resOffers.rowCount < 1){
					helpers.createResponse(res, 200, 202, "There are no offers");
					return;   
				}
				helpers.createResponse(res, 200, 201, "Got previous weekly offer successfully", resOffers.rows);
				return;
			}), (err) => {
				helpers.createResponse(res, 400, 101, "Getting previous weekly offer- db error!");
			}
		});

		app.post('/updateWeeklyOffer', function (req, res) {
			console.log("######### /updateWeeklyOffer");
	
			let body = req.body;
		  console.log('BODY: ',body);
				
				db.updateWeeklyOffer(body.period, body.monday, body.tuesday, body.wednesday, body.thursday, body.friday).then(response => {
					if (response.rowCount < 1) {
						helpers.createResponse(res, 400, 10027, "Error - 0 row updated !");
						return;
					}
					helpers.createResponse(res, 200, 20024, "Successfully updated weekly offer");
					return;
				}, err => {
					if(err.message.includes('mealName')){
						helpers.createResponse(res, 400, 10030, "Error - offer already exists!");
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
	
  
}