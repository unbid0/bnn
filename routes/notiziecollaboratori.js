var express = require('express');
var router = express.Router();
const dao = require('../models/notizie_dao');
const Notizia = require('./../notizia');

router.get('/', function(req, res) {
    if(req.isAuthenticated() && req.user.tipo == "N"){
        dao.getAllNotizie().then((notizie) =>{
            res.render('notiziecollaboratori', {title: 'Bonini assicurazioni - NotizieCollaboratori', notizie});
        });
    }
    else res.redirect('/');
});
      

router.post('/addNotizia/', function(req, res) {
  const notizia = new Notizia(req.body.titolo,req.body.testo,req.body.data);
  dao.addNotizia(notizia).then((notiziaID) =>{
    res.status(201).json({'notiziaId' : notiziaID});
  }).catch((err) =>{
    res.status(500).json({
      'errors': [{'param': 'Request', 'msg': err}],
    });
  })
});

router.delete('/eliminaNotizia', (req, res) =>{
  dao.eliminaNotizia(req.body.titolo);
});

router.delete('/deleteNotizie', (req, res) =>{
  dao.deleteNotizie();
});

module.exports = router;