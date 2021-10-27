const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();

// path를 지정하여 해당 파일을 가리켜준다.
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Curd Application');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
