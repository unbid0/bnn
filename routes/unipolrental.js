var express = require('express');
var router = express.Router();
const multer = require('multer');
const dao = require('../models/notizie_dao');

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
  dao.getAllUR().then((offerte) =>{
    res.render('unipolrental', { title: 'Bonini assicurazioni - UnipolRental', offerte});
  });
});

router.post('/cercaOfferta', function (req, res){
  const marca = req.body.marca;
  dao.cercaOfferta(marca).then((offerte) =>{
   console.log({offerte});
  });
});

module.exports = router;
