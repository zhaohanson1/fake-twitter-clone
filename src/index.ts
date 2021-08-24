// import 'bootstrap/dist/css/bootstrap.css';

import path from 'path';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (_req: any, res: any): void => {
  res.json({message: 'Hello from server!'});
});

app.get('/', (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../dist/app.js'));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
