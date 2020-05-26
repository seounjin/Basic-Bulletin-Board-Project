const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');


const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users', require('./routes/users'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));