import express from 'express';
import bodyParser from 'body-parser';
import { apiRouter } from './router/index';
import { connectDb } from './config/database';
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDb();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
