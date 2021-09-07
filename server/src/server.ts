// import 'bootstrap/dist/css/bootstrap.css';

import express from 'express';
const app = express();
app.use(express.static('../../public'));


// const path = require('path');
const pageRouter = require('./routes.js');
const port = process.env.PORT || 3000;

app.get('/api', (_req: any, res: any): void => {
  res.json({message: 'Hello from server!'});
});

app.use('/*', pageRouter);
console.log(__dirname);
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
