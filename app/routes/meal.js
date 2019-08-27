var db = require('../db');
var helpers = require('../helpers.js');

module.exports = function(app) {

	app.post('/addNewMeal', function (req, res) {
		console.log("######### /addNewMeal");

		let body = req.body;
			
			db.addNewMeal(body.mealCategory, body.mealDays, body.mealName, body.mealType).then(response => {
				if (response.rowCount < 1) {
					helpers.createResponse(res, 400, 10027, "Meal insert - db error!");
					return;
				}
				helpers.createResponse(res, 200, 20024, "Successfully added meal");
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


		app.get('/getAllMeals', function (req, res) {
			console.log("######### /getAllMeals");
			
			db.getAllMeals().then(resMeals => {
				if(resMeals.rowCount < 1){
					helpers.createResponse(res, 200, 202, "There are no meals");
					return;   
				}
				helpers.createResponse(res, 200, 201, "Got all available meals successfully", resMeals.rows);
				return;
			}), (err) => {
				helpers.createResponse(res, 400, 101, "Getting all meals - db error!");
			}
		});

		app.get('/getOrderedMeals', function (req, res) {
			console.log("######### /getOrderedMeals");
			
			db.getOrderedMeals().then(resMeals => {
				if(resMeals.rowCount < 1){
					helpers.createResponse(res, 200, 202, "There are no ordered meals");
					return;   
				}
				helpers.createResponse(res, 200, 201, "Got all available ordered meals successfully", resMeals.rows);
				return;
			}), (err) => {
				helpers.createResponse(res, 400, 101, "Getting all ordered meals - db error!");
			}
		});

		app.get('/getAllMealsInUse', function (req, res) {
			console.log("######### /getAllMealsInUse");
			
			db.getAllMealsInUse().then(resMeals => {
				if(resMeals.rowCount < 1){
					helpers.createResponse(res, 200, 202, "There are no meals");
					return;   
				}
				helpers.createResponse(res, 200, 201, "Got all available meals successfully", resMeals.rows);
				return;
			}), (err) => {
				helpers.createResponse(res, 400, 101, "Getting all meals ERROR - db error!");
			}
		});

		app.post('/deleteMeal', function (req, res) {
			console.log("######### /deleteMeal");
			let meal_id = req.body.meal_id;

			console.log("BODY : "+meal_id);
	
			db.deleteMeal(req.body.meal_id).then(response => {
				if (response.rowCount < 1) {
					helpers.createResponse(res, 400, 10028, "Meal delete - db error!");
					return;
				}
				helpers.createResponse(res, 200, 20025, "Successfully deleted meal");
				return;
			}, err => {
				helpers.createResponse(res, 400, 10028, "Meal delete - db error!");
			});
		});


		app.post('/updateMeal', function (req, res) {
			console.log("######### /updateMeal");
			console.log('BODY BEFORE DESTRUCTURING: ', req.body);
			
			let meal_id = req.body.meal_id;
			let mealName = req.body.mealName;
			let mealDays = req.body.mealDays;
			let mealCategory = req.body.mealCategory;
			let mealType = req.body.mealType;

			console.log("BODY : ",meal_id, ' ', mealName);
	
			db.updateMeal(meal_id, mealName, mealCategory, mealType, mealDays).then(response => {
				if (response.rowCount < 1) {
					helpers.createResponse(res, 400, 10028, "Meal not updated - db error");
					return;
				}
				helpers.createResponse(res, 200, 20025, "Successfully updated meal");
				return;
			}, err => {
				helpers.createResponse(res, 400, 10028, "Meal not updated - db error");
			});
		});

		app.get('/getLatestOrder', function (req, res) {
			console.log("######### /getLatestOrder");
			
			db.getLatestOrder().then(resMeals => {
				if(resMeals.rowCount < 1){
					helpers.createResponse(res, 200, 202, "There are no orders");
					return;   
				}
				helpers.createResponse(res, 200, 201, "Got latest order successfully", resMeals.rows);
				return;
			}), (err) => {
				helpers.createResponse(res, 400, 101, "Getting latest order ERROR - db error!");
			}
		});

}