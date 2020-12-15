var db = require('../db');
var helpers = require('../helpers.js');

module.exports = function (app) {
  app.get('/getAllUsers', (req, res) => {
    console.log('Get All Users');

    db.getAllUsers().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no users');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all users successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(res, 400, 101, 'Getting all users - db error!');
      };
  });

  app.get('/getAllUsersFromView', (req, res) => {
    console.log('Get All Users From View');

    db.getAllUsersFromView().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no users');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all users successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(res, 400, 101, 'Getting all users - db error!');
      };
  });

  app.put('/updateUser', (req, res) => {
    console.log('Update User');
    let body = req.body;
    db.updateUser(body.novo_ime, body.id_korisnika).then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no users for this id');
        return;
      }
      helpers.createResponse(res, 200, 201, 'User updated', resResponse.rows);
      return;
    }),
      (err) => {
        helpers.createResponse(res, 400, 101, 'Updating user - db error!');
      };
  });

  app.put('/updateUserFromView', (req, res) => {
    console.log('Update User From View');
    let body = req.body;
    db
      .updateUserFromView(
        body.id_korisnika,
        body.ime_korisnika,
        body.prezime_korisnika,
        body.broj_telefona
      )
      .then((resResponse) => {
        if (resResponse.rowCount < 1) {
          helpers.createResponse(
            res,
            200,
            202,
            'There are no users for this id'
          );
          return;
        }
        helpers.createResponse(
          res,
          200,
          201,
          'User from view updated',
          resResponse.rows
        );
        return;
      }),
      (err) => {
        helpers.createResponse(
          res,
          400,
          101,
          'Updating user from view - db error!'
        );
      };
  });

  app.get('/getAllPaymentCards', (req, res) => {
    console.log('Get All Payment Cards');

    db.getAllPaymentCards().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no payment cards');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all payment cards successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(
          res,
          400,
          101,
          'Getting all payment cards - db error!'
        );
      };
  });

  app.post('/addUserToUserView', (req, res) => {
    console.log('Add user to User View');

    db.getAllUsers()
      .then((resResponse) => {
        const id = resResponse.rowCount + 1;
        return id;
      })
      .then((id) => {
        let body = req.body;
        db
          .addUserToUserView(
            body.ime,
            body.prezime,
            body.broj_telefona,
            body.email,
            body.adresa_id,
            body.grad_id,
            id
          )
          .then((resResponse) => {
            if (resResponse.rowCount < 1) {
              helpers.createResponse(
                res,
                200,
                202,
                'There is no user for this id'
              );
              return;
            }
            helpers.createResponse(
              res,
              200,
              201,
              'User added',
              resResponse.rows
            );
            return;
          }),
          (err) => {
            helpers.createResponse(res, 400, 101, 'Adding user - db error!');
          };
      });
  });

  app.get('/getAllPaymentCardTypes', (req, res) => {
    console.log('Get All Payment Card Types');

    db.getAllPaymentCardTypes().then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(
          res,
          200,
          202,
          'There are no payment card types'
        );
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all payment cards types successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(
          res,
          400,
          101,
          'Getting all payment cards - db error!'
        );
      };
  });

  app.put('/updatePaymentCard', (req, res) => {
    console.log('Update Payment Card');
    let body = req.body;

    db.updatePaymentCard(body.id_platne_kartice, body.ime)
      .then((resResponse) => {
        if (resResponse.rowCount < 1) {
          helpers.createResponse(
            res,
            200,
            202,
            'There are no payment cards for this id'
          );
          return;
        }
        helpers.createResponse(
          res,
          200,
          201,
          'Payment card updated',
          resResponse.rows
        );
        return;
      })
      .catch((err) => {
        helpers.createResponse(
          res,
          400,
          401,
          'Ne mozete izmeniti zadatu kolonu!'
        );
        return;
      });
  });

  app.post('/addPaymentCard', (req, res) => {
    console.log('Add Payment Card');
    let body = req.body;

    db.getAllPaymentCards()
      .then((resResponse) => {
        const id = resResponse.rowCount + 1;
        return id;
      })
      .then((id) => {
        db.addPaymentCard(
          body.broj_kartice,
          body.id_tipa_platne_kartice,
          body.id_korisnika,
          body.datum_isteka,
          id
        )
          .then((resResponse) => {
            if (resResponse.rowCount < 1) {
              helpers.createResponse(res, 200, 202, 'Error');
              return;
            }
            helpers.createResponse(
              res,
              200,
              201,
              'Payment card inserted inserted',
              resResponse.rows
            );
            return;
          })
          .catch((err) => {
            //helpers.createResponse(res, 200, 202, 'Error');
            console.log(err);
            return;
          });
      });
  });

  app.post('/addPaymentCardType', (req, res) => {
    console.log('Add Payment Card Type');
    db.getAllPaymentCardTypes()
      .then((resResponse) => {
        const id = resResponse.rowCount + 2;
        return id;
      })
      .then((id) => {
        let body = req.body;
        console.log('BODY', body);
        db.addPaymentCardType(body.new_payment_card, id).then((resResponse) => {
          if (resResponse.rowCount < 1) {
            helpers.createResponse(res, 200, 202, 'Error');
            return;
          }
          helpers.createResponse(
            res,
            200,
            201,
            'ADDED payment card type',
            resResponse.rows
          );
          return;
        }),
          (err) => {
            helpers.createResponse(
              res,
              400,
              101,
              'Add payment card type-db error!'
            );
          };
      });
  });

  app.post('/getUser', function (req, res) {
    console.log('######### /getUser');
    let body = req.body;
    console.log('BODY', body);
    db.getUser(body.korisnicko_ime).then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no users');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got user successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(res, 400, 101, 'Getting user - db error!');
      };
  });

  app.post('/getPaymentCardsForUser', function (req, res) {
    console.log('######### /getPaymentCardsForUser');
    let body = req.body;
    console.log('BODY', body);
    db.getPaymentCardsForUser(body.ime).then((resResponse) => {
      if (resResponse.rowCount < 1) {
        helpers.createResponse(res, 200, 202, 'There are no payment cards');
        return;
      }
      helpers.createResponse(
        res,
        200,
        201,
        'Got all payment cards successfully',
        resResponse.rows
      );
      return;
    }),
      (err) => {
        helpers.createResponse(
          res,
          400,
          101,
          'Getting all payment cards - db error!'
        );
      };
  });

  app.post('/addPayment', function (req, res) {
    console.log('######### /addPayment');
    let body = req.body;
    console.log('BODY', body);
    db
      .addPayment(body.platna_kartica_id, body.aranzman_id, body.korisnik_id)
      .then((resResponse) => {
        if (resResponse.rowCount < 1) {
          helpers.createResponse(res, 200, 202, 'Error');
          return;
        }
        helpers.createResponse(
          res,
          200,
          201,
          'ADDED payment',
          resResponse.rows
        );
        return;
      }),
      (err) => {
        helpers.createResponse(res, 400, 101, 'Add payment-db error!');
      };
  });
};
