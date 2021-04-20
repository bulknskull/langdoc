const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(__dirname + '/public'));
app.listen(PORT);

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});