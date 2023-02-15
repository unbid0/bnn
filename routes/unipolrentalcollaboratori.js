var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require("fs");
const path = require("path");
const dao = require('../models/notizie_dao');
const Offerta = require('./../offerta');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "public/images/URimages");
  },
  filename: (req, file, cb) =>{
    cb(null, file.originalname);
  }
});

const upload = multer({storage: fileStorageEngine});

router.get('/', function(req, res, next) {
  if(req.isAuthenticated() && req.user.tipo == "U"){
  dao.getAllUR().then((offerte) =>{
    res.render('unipolrentalcollaboratori', { title: 'Bonini assicurazioni - UnipolRentalCollaboratori', offerte});
  });
    }
  else
  res.redirect('/');
});

router.post('/addUR', upload.single('image'), (req, res) =>{
  let cartella = "\\images\\URimages\\" + req.file.originalname;
  const offerta = new Offerta(req.body.marca, cartella);
  dao.addUR(offerta).then((urID) =>{
    res.status(201).json({'urId' : urID});
  }).catch((err) =>{
    res.status(500).json({
      'errors': [{'param': 'Request', 'msg': err}],
    });
  })
});


router.delete('/deleteUR', (req, res) =>{

  dao.deleteUR();

  const directory = "public/images/URimages";

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

});


module.exports = router;