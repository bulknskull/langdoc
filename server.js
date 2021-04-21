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

app.delete('/dictionary', (req, res) => {
  const words = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/client/data/dictionary.json'), 'UTF-8'));

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    if (word._id === req.body.id) words.splice(i, 1);
  }

  fs.writeFileSync(path.resolve(__dirname + '/client/data/dictionary.json'), JSON.stringify(words));

  res.send(words);
})

app.post('/flashcards', (req, res) => {
  console.log('POST request received by server');
  const words = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/client/data/dictionary.json'), 'UTF-8'));

  res.send(words);
});