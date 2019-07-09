var dbConfig = require('../dbConfig.json');

const {
    Pool
} = require('pg')

const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
})


///////////////////////////////USERS/////////////////////////
var getAllUsers = async function() {
    const query = {
        text: 'SELECT * FROM public."user" ORDER BY user_id ASC '
    };
    return pool.query(query);
};

var getUserByUsername = async function(username) {
    const query = {
        text: 'SELECT * FROM "user" WHERE username = $1',
        values: [username]
    }
    return pool.query(query);
};





///////////////////////////////MEALS/////////////////////////

var addNewMeal = async function(mealCategory, mealDays, mealName, mealType) {
    const query = {
        text: 'INSERT INTO "meal"("mealCategory", "mealDays", "mealName", "mealType") VALUES($1, $2, $3, $4)',
        values: [mealCategory, mealDays, mealName, mealType]
    }
    return pool.query(query);
};

var getAllMeals = async function() {
    const query = {
        text: 'SELECT * FROM public."meal" ORDER BY meal_id ASC '
    };
    return pool.query(query);
};

var deleteMeal = async function(meal_id) {
    console.log(meal_id);
    const query = {
        text: 'DELETE FROM "meal" where "meal_id"=$1',
        values: [meal_id]
    };
    return pool.query(query);
};




///////////////////////////////OFFER/////////////////////////




var saveWeeklyOffer = async function(period, monday, tuesday, wednesday, thursday, friday) {
    const query = {
        text: 'INSERT INTO "weekly_offer"("period", "monday", "tuesday", "wednesday","thursday","friday") VALUES($1, $2, $3, $4,$5,$6)',
        values: [period, monday, tuesday, wednesday,thursday,friday]
    }
    return pool.query(query);
};

var getWeeklyOffer = async function(period) {
    const query = {
        text: 'SELECT * FROM "weekly_offer" WHERE period = $1',
        values: [period]
    }
    return pool.query(query);
};


// DELETE FROM "meal" where "meal_id"=67

exports.getAllUsers = getAllUsers;
exports.getUserByUsername=getUserByUsername;
exports.addNewMeal=addNewMeal;
exports.getAllMeals=getAllMeals;
exports.saveWeeklyOffer=saveWeeklyOffer;
exports.getWeeklyOffer=getWeeklyOffer;
exports.deleteMeal=deleteMeal;