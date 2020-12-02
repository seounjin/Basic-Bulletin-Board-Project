const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { CreateKeys } = require("./utils/createKeys");
const cors = require('cors');
const port = 5000;


CreateKeys();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/user', require('./routes/users'));

app.use('/api/board', require('./routes/board'));

app.use('/api/comment', require('./routes/comment'));

app.use('/api/report', require('./routes/report'));

app.use('/api/mypage', require('./routes/mypage'));

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));