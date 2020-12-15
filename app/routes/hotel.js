var db = require('../db');
var helpers = require('../helpers.js');

module.exports = function (app) {
  app.get('/getHotels', (req, res) => {
    console.log('Get All Hotels');

    db.getHotels().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no hotels');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all hotels successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(res, 400, 101, 'Getting all hotels - db error!');
      };
  });

  app.get('/getCities', (req, res) => {
    console.log('Get All Cities');

    db.getCities().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no cities');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all cities successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(res, 400, 101, 'Getting all cities - db error!');
      };
  });

  app.post('/addHotel', (req, res) => {
    console.log('Add New Hotel');

    db.getHotels()
      .then((resResponse) => {
        const id = resResponse.rowCount + 1;
        return id;
      })
      .then((id) => {
        let body = req.body;
        db
          .addNewHotel(id + 2, body.ime_hotela, body.zvezdice, body.id_grada)
          .then((resResponse) => {
            helpers.createResponse(
              res,
              200,
              201,
              'Hotel added',
              resResponse.rows
            );
            return;
          }),
          (err) => {
            helpers.createResponse(res, 400, 101, 'Adding hotel - db error!');
          };
      });
  });
};
