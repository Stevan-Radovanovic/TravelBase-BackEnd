var db = require('../db');
var helpers = require('../helpers.js');

module.exports = function (app) {
  app.get('/getAllArrangements', (req, res) => {
    console.log('Get All Arangements');
    try {
      db
        .getAllArrangements()
        .then((resResponse) => {
          if (resResponse.rowCount < 1) {
            helpers.createResponse(res, 200, 202, 'There are no arrangements');
            return;
          }
          helpers.createResponse(
            res,
            200,
            201,
            'Got all available arrangements successfully',
            resResponse.rows
          );
          return;
        })
        .catch((err) => {
          return Promise.reject(err);
        }),
        (err) => {
          helpers.createResponse(
            res,
            400,
            101,
            'Getting all arrangements - db error!'
          );
        };
    } catch (error) {
      console.log('Error iz arr');
    }
  });

  app.put('/updateArrangement', function (req, res) {
    console.log('Update an arrangement');
    let body = req.body;
    db
      .updateArrangement(body.novi_naziv, body.id_aranzmana)
      .then((resResponse) => {
        if (resResponse.rowCount < 1) {
          helpers.createResponse(
            res,
            200,
            202,
            'There is no arrangement for this id'
          );
          return;
        }
        helpers.createResponse(
          res,
          200,
          201,
          'Arrangement updated',
          resResponse.rows
        );
        return;
      }),
      (err) => {
        helpers.createResponse(
          res,
          400,
          101,
          'Updating arrangement- db error!'
        );
      };
  });
};
