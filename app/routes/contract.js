var db = require('../db');
var helpers = require('../helpers.js');

module.exports = function (app) {
  app.get('/getAllRegularContracts', (req, res) => {
    console.log('Get All Regular Contracts');

    db.getAllRegular().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no regular contracts');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all regular contracts successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(
          res,
          400,
          101,
          'Getting all contracts - db error!'
        );
      };
  });

  app.get('/getAllVipContracts', (req, res) => {
    console.log('Get All Vip Contracts');

    db.getAllVip().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no vip contracts');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all vip contracts successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(
          res,
          400,
          101,
          'Getting all contracts - db error!'
        );
      };
  });

  app.post('/addNewContract', (req, res) => {
    console.log('Add new contract');

    db.getAllRegular()
      .then((resResponse) => {
        const id = resResponse.rowCount + 1;
        return id;
      })
      .then((id) => {
        let body = req.body;
        db
          .addNewContract(
            id + 74,
            body.napomena,
            body.datum,
            body.id_popusta,
            body.id_korisnika,
            body.id_zaposlenog,
            body.id_rezervacije,
            body.id_aranzmana
          )
          .then((resResponse) => {
            helpers.createResponse(
              res,
              200,
              201,
              'Contract added',
              resResponse.rows
            );
            return;
          }),
          (err) => {
            helpers.createResponse(res, 400, 101, 'Adding user - db error!');
          };
      });
  });
};
