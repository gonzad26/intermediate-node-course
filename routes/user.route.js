const express = require("express");
const router = express.Router();
const user_Controller = require("../controllers/User.Controller");

router.get('/:id',user_Controller.details);
router.post('',user_Controller.create);
router.put('/:id',user_Controller.update);
router.delete('/:id',user_Controller.delete);
module.exports = router;