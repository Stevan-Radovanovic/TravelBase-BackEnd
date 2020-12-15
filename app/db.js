var dbConfig = require('../dbConfig.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

let getAllArrangements = async () => {
  const query = {
    text:
      'select * from aranzman a inner join hotel h on a.id_hotela=h.id_hotela',
  };
  return pool.query(query);
};

let updateArrangement = async (novi_naziv, id_aranzmana) => {
  const query = {
    text: `update aranzman set "naziv_aranzmana" = '${novi_naziv}' where id_aranzmana = ${id_aranzmana};`,
  };

  return pool.query(query);
};

let getAllReservations = async () => {
  const query = {
    text:
      'select * from rezervacija r inner join aranzman a on r.id_aranzmana=a.id_aranzmana inner join korisnik ko on r.id_korisnika=ko.id_korisnika inner join hotel h on h.id_hotela = a.id_hotela',
  };
  return pool.query(query);
};

let updateReservation = async (novi_naziv, id_aranzmana) => {
  try {
    const query = {
      text: `update rezervacija set "naziv_aranzmana" = '${novi_naziv}' where aranzman_id = ${id_aranzmana};`,
    };

    return pool.query(query);
  } catch (error) {
    console.log('ERRROR  iz metode');
  }
};

let addReservation = async (
  id_aranzmana,
  datum,
  broj_noci,
  prijava,
  odjava,
  id_korisnika,
  id_rezervacije
) => {
  const query = {
    text:
      'INSERT INTO "rezervacija"("id_aranzmana", "datum", "broj_noci", "id_rezervacije", "id_korisnika","prijava","odjava") VALUES($1, $2, $3, $4, $5,$6,$7)',
    values: [
      id_aranzmana,
      datum,
      broj_noci,
      id_rezervacije,
      id_korisnika,
      prijava,
      odjava,
    ],
  };
  return pool.query(query);
};

let getAllUsers = async () => {
  const query = {
    text: 'select * from korisnik',
  };
  return pool.query(query);
};

let getAllUsersFromView = async () => {
  const query = {
    text: 'select * from korisnik_view kv',
  };
  return pool.query(query);
};

let addUserToUserView = async (
  ime,
  prezime,
  broj_telefona,
  email,
  adresa_id,
  grad_id,
  id_korisnika
) => {
  const query = {
    text:
      'INSERT INTO "korisnik_view"("ime_korisnika","prezime_korisnika","broj_telefona","email","id_adrese","id_grada","id_korisnika") VALUES($1, $2, $3, $4,$5,$6,$7)',
    values: [
      ime,
      prezime,
      broj_telefona,
      email,
      adresa_id,
      grad_id,
      id_korisnika,
    ],
  };
  return pool.query(query);
};

let updateUser = async (novo_ime, id_korisnika) => {
  try {
    const query = {
      text: `update korisnik set "ime_korisnika" = '${novo_ime}' where id_korisnika = ${id_korisnika};`,
    };

    return pool.query(query);
  } catch (error) {
    console.log('ERRROR  iz metode');
  }
};

let updateUserFromView = async function (
  id_korisnika,
  ime_korisnika,
  prezime_korisnika,
  broj_telefona
) {
  const query = {
    text: `update korisnik_view set "prezime_korisnika" = '${prezime_korisnika}', "ime_korisnika" = '${ime_korisnika}', "broj_telefona"='${broj_telefona}' where id_korisnika = ${id_korisnika};`,
  };

  return pool.query(query);
};

let getAllPaymentCards = async function () {
  const query = {
    text:
      'select * from platna_kartica pk inner join tip_platne_kartice tpk on pk.id_tipa_platne_kartice=tpk.id_tipa_platne_kartice',
  };
  return pool.query(query);
};

let getAllPaymentCardTypes = async function () {
  const query = {
    text: 'select * from tip_platne_kartice',
  };
  return pool.query(query);
};

let addPaymentCard = async function (
  broj_kartice,
  tip_platne_kartice_id,
  turista_id,
  datum_isteka,
  id
) {
  const query = {
    text:
      'INSERT INTO "platna_kartica"("id_platne_kartice", "broj_kartice", "id_tipa_platne_kartice", "id_korisnika", "datum_isteka") VALUES($5, $1, $2, $3, $4)',
    values: [broj_kartice, tip_platne_kartice_id, turista_id, datum_isteka, id],
  };
  return pool.query(query);
};

let updatePaymentCard = async function (platna_kartica_id, ime) {
  try {
    const query = {
      text: `update platna_kartica set "ime_korisnika" = '${ime}' where platna_kartica_id = ${platna_kartica_id};`,
    };
    return pool.query(query);
  } catch (error) {
    console.log('ERRROR  iz metode');
  }
};

let addPaymentCardType = async function (new_payment_card, id) {
  console.log('NEW PAYMENT CARD TYPE  ', new_payment_card);
  let naziv = new_payment_card.naziv;
  let vrsta_tipa = new_payment_card.vrsta_tipa;
  let naziv_platne_kartice = '(' + naziv + ',' + vrsta_tipa + ')';

  const query = {
    text:
      'insert into tip_platne_kartice("id_tipa_platne_kartice","naziv_tipa_platne_kartice") values ($2,$1)',
    values: [naziv_platne_kartice, id],
  };
  return pool.query(query);
};

let getAllRegular = async function () {
  const query = {
    text:
      'select * from regular_ugovor ru inner join popust p on ru.id_popusta=p.id_popusta',
  };
  return pool.query(query);
};

let getAllVip = async function () {
  const query = {
    text:
      'select * from vip_ugovor ru inner join popust p on ru.id_popusta=p.id_popusta',
  };
  return pool.query(query);
};

let addNewContract = async function (
  id,
  napomena,
  datum,
  id_popusta,
  id_korisnika,
  id_zaposlenog,
  id_rezervacije,
  id_aranzmana
) {
  const query = {
    text:
      'INSERT INTO "ugovor"("id_ugovora", "datum", "napomena", "id_popusta", "id_korisnika", "id_zaposlenog", "id_rezervacije", "id_aranzmana") VALUES($1, $3, $2, $4, $5, $6, $7, $8)',
    values: [
      id,
      napomena,
      datum,
      id_popusta,
      id_korisnika,
      id_zaposlenog,
      id_rezervacije,
      id_aranzmana,
    ],
  };
  return pool.query(query);
};

let getHotels = async function () {
  const query = {
    text: 'select * from hotel',
  };
  return pool.query(query);
};

let getCities = async function () {
  const query = {
    text: 'select * from grad',
  };
  return pool.query(query);
};

let addNewHotel = async function (id, ime_hotela, zvezdice, id_grada) {
  const query = {
    text:
      'INSERT INTO "hotel"("id_hotela", "ime_hotela", "zvezdice", "id_grada") VALUES($1, $2, $3, $4)',
    values: [id, ime_hotela, zvezdice, id_grada],
  };
  return pool.query(query);
};

exports.getAllArrangements = getAllArrangements;
exports.updateArrangement = updateArrangement;
exports.getAllReservations = getAllReservations;
exports.updateReservation = updateReservation;
exports.addReservation = addReservation;
exports.getAllUsers = getAllUsers;
exports.getAllUsersFromView = getAllUsersFromView;
exports.updateUserFromView = updateUserFromView;
exports.updateUser = updateUser;
exports.getAllPaymentCards = getAllPaymentCards;
exports.addUserToUserView = addUserToUserView;
exports.getAllPaymentCardTypes = getAllPaymentCardTypes;
exports.addPaymentCard = addPaymentCard;
exports.updatePaymentCard = updatePaymentCard;
exports.getAllRegular = getAllRegular;
exports.getAllVip = getAllVip;
exports.addPaymentCardType = addPaymentCardType;
exports.addNewContract = addNewContract;
exports.getHotels = getHotels;
exports.getCities = getCities;
exports.addNewHotel = addNewHotel;
