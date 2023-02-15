'use strict';

const db = require('../db.js');
const bcrypt = require('bcrypt');

exports.getUserById = function(id) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM tCollaboratori WHERE id = ?';
      db.get(sql, [id], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
              const user = {id: row.id, username: row.username, tipo: row.tipo}
              resolve(user);
          }
      });
  });
};

exports.getUser = function(username, password) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM tCollaboratori WHERE username = ?';
      db.get(sql, [username], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
            const user = {id: row.id, username: row.username, tipo: row.tipo};
            let check = false;
            
            if(bcrypt.compareSync(password, row.password))
              check = true;

            resolve({user, check});
          }
      });
  });
};