const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;
const { MONGODB_URI } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use('/', routes());
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => console.log('err', error));
