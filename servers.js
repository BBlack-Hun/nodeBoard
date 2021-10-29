const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connect');

const app = express();

// path를 지정하여 해당 파일을 가리켜준다.
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-psrser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine (사용할 형식을 기입 : ejs)
app.set('view engine', 'ejs');
// 위와 동일한 의미
//app.set('views', path.resolve(__dirname, 'views/ejs'));

// load routers
app.use('/', require('./server/routes/router'));

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
