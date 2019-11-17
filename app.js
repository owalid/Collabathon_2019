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

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

app.get('/', function(req, res) {
    res.render(path.join(__dirname + '/dist/index.html'));
});


let server = app.listen(process.env.PORT || 5000, function() {
  let port = server.address().port;
  console.log("App now running on port", port);
});