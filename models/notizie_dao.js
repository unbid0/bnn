'use strict';

const db = require('../db.js');

exports.getAllNotizie = function() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM tNotizia';
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
  
        const notizie = rows.map((e) => ({titolo: e.titolo, testo: e.testo, data: e.data,}));
        resolve(notizie);
      });
    });
  };

exports.addNotizia = function(notizia){
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tNotizia (titolo,testo, data) VALUES( ?, ?, DATETIME(?))';
        db.run(sql,[notizia.titolo, notizia.testo, notizia.data],function (err) {
            if (err)
            {
                reject(err)
            } 
            else 
            {
                resolve(this.lastID);
            }
        });
    });
};

exports.eliminaNotizia = function(titolo){
  const sql = 'DELETE FROM tNotizia WHERE titolo=?';
  db.run(sql,[titolo],(err) => {
    if (err) throw err});
}

exports.deleteNotizie = function(){
  const sql = 'DELETE FROM tNotizia';
  db.run(sql,(err) => {
    if (err) throw err});
}


exports.addUR = function(offerta){
  return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO tRental (marca, immagine) VALUES( ?, ?)';
      db.run(sql,[offerta.marca, offerta.path],function (err) {
          if (err)
          {
              reject(err)
          } 
          else 
          {
              resolve(this.lastID);
          }
      });
  });
};

exports.getAllUR = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tRental';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const offerte = rows.map((e) => ({marca: e.marca, immagine: e.immagine,}));
      resolve(offerte);
    });
  });
};


exports.cercaOfferta = function(marca) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tRental WHERE marca = ?';
    db.all(sql, [marca], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const offerte = rows.map((e) => ({marca: e.marca, immagine: e.immagine,}));
      resolve(offerte);
    });
  });
};


exports.deleteUR = function(){
  const sql = 'DELETE FROM tRental';
  db.run(sql,(err) => {
    if (err) throw err});
}
