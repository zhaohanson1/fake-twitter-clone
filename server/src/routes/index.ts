const express = require('express');
const router = new express.Router();

router.get('/', function(req: any, res: { sendFile: (arg0: any) => void; }) {
  res.sendFile('/index.html');
});

module.exports = router;
