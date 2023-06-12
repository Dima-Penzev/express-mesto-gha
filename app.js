const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('Database is successfully connected.');
}).catch((err) => {
  console.log(err.message);
});

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6484935b5d302fa15effc3c9',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
