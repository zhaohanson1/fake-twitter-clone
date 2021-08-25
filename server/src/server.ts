// import 'bootstrap/dist/css/bootstrap.css';
export {};
const express = require('express');
const app = express();
app.use(express.static('../../public'));


// const path = require('path');
const indexRouter = require('./routes/index');
const port = process.env.PORT || 3000;

app.get('/api', (_req: any, res: any): void => {
  res.json({message: 'Hello from server!'});
});

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
