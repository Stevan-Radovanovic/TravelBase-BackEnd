var db = require('../db');
var helpers = require('../helpers.js');

module.exports = function (app) {
  app.get('/getAllReservations', (req, res) => {
    console.log('Get All Reservations');

    db.getAllReservations().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no reservations');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all available reservations successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(
          res,
          400,
          101,
          'Getting all reservations - db error!'
        );
      };
  });

  app.put('/updateReservation', (req, res) => {
    let body = req.body;

    db.updateReservation(body.naziv_aranzmana, body.id_aranzmana)
      .then((resResponse) => {
        console.log(resResponse);
        if (resResponse.rowCount < 1) {
          helpers.createResponse(
            res,
            200,
            202,
            'There is no reservations for this id'
          );
          return;
        }
        helpers.createResponse(
          res,
          200,
          201,
          'Reservation updated',
          resResponse.rows
        );
        return;
      })
      .catch((err) => {
        // console.log('ERROR MESSAGE ', err);
        helpers.createResponse(
          res,
          400,
          401,
          'Ne mozete izmeniti zadatu kolonu!'
        );
        return;
      });
  });

  app.post('/addReservation', (req, res) => {
    console.log('Add Reservation');
    db.getAllReservations()
      .then((resResponse) => {
        const id = resResponse.rowCount + 1;
        return id;
      })
      .then((id) => {
        let body = req.body;
        db.addReservation(
          body.id_aranzmana,
          body.datum,
          body.broj_noci,
          body.prijava,
          body.odjava,
          body.id_korisnika,
          id
        ).then((resResponse) => {
          if (resResponse.rowCount < 1) {
            helpers.createResponse(res, 200, 202, 'Error');
            return;
          }
          helpers.createResponse(
            res,
            200,
            201,
            'Reservation inserted',
            resResponse.rows
          );
          return;
        });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  });

  app.post('/callProcedure', function (req, res) {
    console.log('######### /callProcedure');
    let body = req.body;
    console.log('BODY', body);
    db.callProcedure(body.aranzman_id, body.korisnik_id)
      .then((resResponse) => {
        if (resResponse.rowCount < 1) {
          helpers.createResponse(res, 200, 202, 'Error');
          return;
        }
        helpers.createResponse(
          res,
          200,
          201,
          'PROCEDURE DONE',
          resResponse.rows
        );
        return;
      })
      .catch((err) => {
        helpers.createResponse(res, 200, 202, 'Error');
        return;
      });
  });
};
