const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
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
  const lastWord = words[words.length - 1];
  const lastWordId = lastWord['_id'];

  words.push({
    _id: lastWordId + 1,
    english: req.body.english,
    spanish: req.body.spanish,
    part_of_speech: '',
    subcat: '',
  });

  fs.writeFileSync(path.resolve(__dirname + '/client/data/dictionary.json'), JSON.stringify(words));

  res.send(words);
});