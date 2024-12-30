const express = require('express');
const router = express.Router();
const {registeruser, loginuser, getcurrentuser} = require('../controllers/usercontroller');
const validateToken = require('../middelware/validatetoken');

router.post("/register",registeruser);

router.post("/login", loginuser);
 
router.get("/current", validateToken ,getcurrentuser);

module.exports = router;