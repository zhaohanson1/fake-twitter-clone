const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Set up environment variables
require('dotenv').config()
// Set up database connection
require('./connectDatabase');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../../public'));


const pageRouter = require('./routes');
const apiRouter = require('./api/apiRouter');

const port = process.env.BACKEND_PORT || 3000;

app.get('/api', (_req: any, res: any): void => {
  res.json({message: 'Hello from server!'});
});

app.use('/', pageRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
