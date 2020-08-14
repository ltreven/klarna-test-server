const express = require('express');
const router  = express.Router();

/* GET home page */
router.post('/', (req, res, next) => {
  console.log(req.body)
  res.json({message: "place order method being called"})
});

module.exports = router;
