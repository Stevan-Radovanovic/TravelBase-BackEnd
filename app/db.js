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
var getAllUsers = async function () {
    const query = {
        text: 'SELECT * FROM public."user" ORDER BY user_id ASC '
    };
    return pool.query(query);
};

var getUserByUsername = async function (username) {
    const query = {
        text: 'SELECT * FROM "user" WHERE username = $1',
        values: [username]
    }
    return pool.query(query);
};

var updateUsersOffer = async function (period, username, meals) {
    console.log('usao sam u');
    console.log('PERIOD: ', period);
    console.log('MEALSE: ', meals);

    const mealsArray = meals.map(a => '{' + a + '}');
    console.log('#############################');


    console.log(`UPDATE "users_offer" SET ${username}=\'{${mealsArray.toString()}}\' WHERE "period"='${period}'`);


    const query = {
        //text: 'UPDATE "users_offer" SET kaca='{{"0","0","0","0"},{"3","3","3","3"}}' WHERE "period"= ' 11- 13';'
        //text: 'UPDATE "users_offer" SET '+username+'=\'{$1}\' WHERE "period"=$2',
        text: `UPDATE "users_offer" SET ${username}=\'{${mealsArray.toString()}}\' WHERE "period"='${period}'`
        //values: [mealsArray.toString(), period ]
    }

    return pool.query(query);
};

var setUsersOfferPeriod = async function (period) {
    console.log('SET OFFER DB')
    const query = {
        text: 'INSERT INTO "users_offer" ("period") values ($1)',
        values: [period]
    }
    return pool.query(query);
};

var saveNewRecommendation = async function (title, recommendation, numOfLikes, supporters) {
    console.log('Inserting new recommendation', numOfLikes)

    const query = {
        text: `INSERT INTO "new_recommendation" ("title","recommendation","num_of_likes","supporters") values ('${title}','${recommendation}','${numOfLikes}','{${supporters}}')`,
        // values: [title, recommendation]
    }
    console.log(query.text)
    return pool.query(query);
};

var getAllRecommendations = async function () {
    const query = {
        text: 'SELECT * FROM "new_recommendation" order by "num_of_likes" desc',
    }
    return pool.query(query);
};


var updateRecommendation = async function (recommendationId, recLikes, supporters) {

    console.log('Recommendation id: ', recommendationId);
    console.log('Recommendation likes: ', recLikes);
    let recomendationLikes = recLikes;
    console.log('################UPDATE RECOMMENDATIONS#############');
    const query = {

        text: `update new_recommendation set "num_of_likes" = '${recomendationLikes}', "supporters"='{${supporters}}' where recommendation_id = ${recommendationId};`,
    }

    return pool.query(query);
};

var getUserId = async function (username) {
    const query = {
        text: `select user_id from "user" where "username"='${username}'`
    };
    return pool.query(query);
}

var getUserBoolean = async function (username, password) {
    const query = {
        text: `select username, user_id, role from "user" where "username"='${username}' AND "password"='${password}'`
    };
    return pool.query(query);
}

///////////////////////////////MEALS/////////////////////////

var addNewMeal = async function (mealCategory, mealDays, mealName, mealType) {
    const query = {
        text: 'INSERT INTO "meal"("mealCategory", "mealDays", "mealName", "mealType") VALUES($1, $2, $3, $4)',
        values: [mealCategory, mealDays, mealName, mealType]
    }
    return pool.query(query);
};

var getAllMeals = async function () {
    const query = {
        text: 'SELECT * FROM public."meal" ORDER BY meal_id ASC '
    };
    return pool.query(query);
};

var deleteMeal = async function (meal_id) {
    console.log(meal_id);
    const query = {
        text: 'DELETE FROM "meal" where "meal_id"=$1',
        values: [meal_id]
    };
    return pool.query(query);
};

var getOrderedMeals = async function () {
    const query = {
        text: 'select * from "users_offer" order by users_offer_id desc limit 1 offset 1'
    };
    return pool.query(query);
};

var getAllMealsInUse = async function () {
    const query = {
        text: 'select wo.monday, wo.tuesday, wo.wednesday, wo.thursday, wo.friday from weekly_offer wo order by weekly_offer_id desc limit 1;'
    };
    return pool.query(query);
}

var updateMeal = async function (meal_id, mealName, mealCategory, mealType, mealDays) {
    console.log(meal_id, mealName, mealCategory, mealType, mealDays);
    const query = {
        text: `update meal set "mealName" = '${mealName}', "mealCategory" = '${mealCategory}', "mealDays" = '{${mealDays}}', "mealType" = '${mealType}' where meal_id = ${meal_id};`,
    };
    console.log('QUERY: ', query.text);

    return pool.query(query);
};


var getLatestOrder = async function () {
    console.log('usao u metodu backend');
    const query = {
        text: 'select * from "users_offer" order by users_offer_id desc limit 1'
    };
    return pool.query(query);
};




///////////////////////////////OFFER/////////////////////////




var saveWeeklyOffer = async function (period, monday, tuesday, wednesday, thursday, friday) {
    const query = {
        text: 'INSERT INTO "weekly_offer"("period", "monday", "tuesday", "wednesday","thursday","friday") VALUES($1, $2, $3, $4,$5,$6)',
        values: [period, monday, tuesday, wednesday, thursday, friday]
    }
    return pool.query(query);
};

var updateWeeklyOffer = async function (period, monday, tuesday, wednesday, thursday, friday) {
 
    const query = {
        text: `update weekly_offer set "monday" = '{${monday}}', "tuesday" = '{${tuesday}}', "wednesday" = '{${wednesday}}', "thursday" = '{${thursday}}',"friday" = '{${friday}}' where "period" = '${period}';`,
    };
    console.log('QUERY: ', query.text);

    return pool.query(query);
};

var getWeeklyOffer = async function () {
    const query = {
        text: 'SELECT * FROM "weekly_offer" order by weekly_offer_id desc limit 1',
    }
    return pool.query(query);
};
var getPreviousWeeklyOffer = async function () {
    const query = {
        text: 'SELECT * FROM "weekly_offer" order by weekly_offer_id desc limit 1 offset 1',
    }
    return pool.query(query);
};
var getAllPeriods = async function () {
    const query = {
        text: 'SELECT period FROM "weekly_offer"',
    }
    return pool.query(query);
};




// DELETE FROM "meal" where "meal_id"=67

exports.getAllUsers = getAllUsers;
exports.getUserId=getUserId;
exports.getUserByUsername = getUserByUsername;
exports.addNewMeal = addNewMeal;
exports.getAllMeals = getAllMeals;
exports.saveWeeklyOffer = saveWeeklyOffer;
exports.getWeeklyOffer = getWeeklyOffer;
exports.deleteMeal = deleteMeal;
exports.updateUsersOffer = updateUsersOffer;
exports.setUsersOfferPeriod = setUsersOfferPeriod;
exports.getOrderedMeals = getOrderedMeals;
exports.getAllMealsInUse = getAllMealsInUse;
exports.updateMeal = updateMeal;
exports.updateWeeklyOffer=updateWeeklyOffer;
exports.saveNewRecommendation = saveNewRecommendation;
exports.updateRecommendation = updateRecommendation;
exports.getAllRecommendations = getAllRecommendations;
exports.getLatestOrder = getLatestOrder;
exports.getPreviousWeeklyOffer = getPreviousWeeklyOffer;
exports.getAllPeriods=getAllPeriods;
exports.getUserBoolean=getUserBoolean;