const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3000;

app.use(express.static(__dirname + '/public'));
app.listen(PORT);

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

app.get('/dictionary', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/client/data/dictionary.json'));
});

app.post('/dictionary', (req, res) => {
  // need to add functionality here to actually add data to dictionary
  const words = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/client/data/dictionary.json'), 'UTF-8'));

  words.push({
    _id: words.length,
    english: req.params.english,
    spanish: req.params.spanish,
    part_of_speech: '',
    subcat: '',
  });

  fs.writeFileSync(path.resolve(__dirname + '/client/data/dictionary.json'), JSON.stringify(words));

  res.send(words);

  // res.sendFile(path.resolve(__dirname + '/client/data/dictionary.json'));
});