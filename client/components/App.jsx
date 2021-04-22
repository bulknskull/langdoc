const React = require('react');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedWords: false,
      words: [],
      flashCard: null,
      flashCardDisplay: 'Click below to get a flash card!',
      searchedWord: {}
    }
  }

  componentDidMount() {
    console.log('mounting...');
    console.log(this.state.searchedWord);
    fetch('/dictionary')
      .then(res => res.json())
      .then((words) => {
        return this.setState({
          words,
          fetchedWords: true,
          // flashCard: null,
          // flashCardDisplay: 'Click below to get a flash card!'
        });
      })
      .catch(err => console.log(err + 'Error upon mount'))
  }

  componentDidUpdate() {
    console.log(this.state.searchedWord);
  }

  lookupWord(english, spanish) {
    console.log({ eng: english, esp: spanish });
    // empty input boxes show up as empty strings
    if (english !== '') {
      for (let word of this.state.words) {
        if (word.english === english) {
          return this.setState({
            searchedWord: word
          })
        }
      }
    }
    if (spanish !== '') {
      for (let word of this.state.words) {
        if (word.spanish === spanish) {
          return this.setState({
            searchedWord: word
          })
        }
      }
    }
    return this.setState({
      searchedWord: { english: 'Sorry!', spanish: 'We couldn\'t find that word.' }
    })
  }

  addWord(english, spanish) {
    // make POST request to add new entry to dictionary
    console.log('egg');
    const data = {
      english,
      spanish,
      part_of_speech: '',
      subcat: ''
    }
    console.log(data);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/dictionary', requestOptions)
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        return this.setState({
          words: response,
          // fetchedWords: true,
          // flashCard: this.state.flashCard,
          // flashCardDisplay: this.state.flashCardDisplay
        })
      })
      .catch(err => console.log(err));
  }

  deleteWord(id) {
    console.log(id);
    const data = { id };
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/dictionary', requestOptions)
      .then(res => res.json())
      .then((response) => {
        console.log('Data fetched!');
        console.log(response);
        return this.setState({
          words: response,
          // fetchedWords: true,
          // flashCard: this.state.flashCard,
          // flashCardDisplay: this.state.flashCardDisplay
        })
      })
      .catch(err => console.log(err));
  }

  getFlashCard() {
    console.log('Clicked to get a new flash card');
    const dictSize = this.state.words.length;
    const index = Math.floor(Math.random() * dictSize);
    const newWord = this.state.words[index];

    if (this.state.flashCard === null || newWord._id !== this.state.flashCard._id) {
      return this.setState({
        // words: this.state.words,
        // fetchedWords: true,
        flashCard: newWord,
        flashCardDisplay: newWord.english
      })
    } else {
      console.log('Oops -- nearly gave you the same word! Let\'s try again...');
      this.getFlashCard();
    }    
  }

  translate() {
    console.log('Flash card flipped!');
    if (this.state.flashCardDisplay === 'Click below to get a flash card!') return;
    for (let word of this.state.words) {
      console.log(word);
      if (word._id === this.state.flashCard._id) {
        console.log('id located!')
        if (word.english === this.state.flashCardDisplay) {
          console.log('current display is English: ' + this.state.flashCardDisplay);
          return this.setState({
            // words: this.state.words,
            // fetchedWords: true,
            flashCard: word,
            flashCardDisplay: word.spanish
          });
        } else {
          console.log('current display is not English: ' + this.state.flashCardDisplay);
          return this.setState({
            // words: this.state.words,
            // fetchedWords: true,
            flashCard: word,
            flashCardDisplay: word.english
          });
        }
      }
    }
  }

  render() {
    if (!this.state.fetchedWords) return (
      <div>
        <h1>Loading page, please wait...</h1>
      </div>
    )

    const { words } = this.state;

    // STRETCH GOAL: turn this into a bona fide table

    const wordLines = words.sort((a, b) => {
      if (a.spanish < b.spanish) return -1;
      if (a.spanish > b.spanish) return 1;
    })
    .map((word, i) => {
      const id = word._id;
      return (
        <div className="entry">
          <button className="deleteButton" id={ id } onClick={() => this.deleteWord(id)}><img height="30px" width="30px" src="https://www.freeiconspng.com/uploads/clear-delete-remove-icon-png-0.png" /></button>
          <span><strong>Spanish:</strong> {word.spanish}</span>
          <span><strong>English:</strong> {word.english}</span>
        </div>
      )
    });

    return (
      <div id='body'>
        <div id='hello'>
          <h1>Welcome to Langdoc!</h1>
          <p>Langdoc is a language-learning app that helps you study better.</p>
          <p>Click the <strong>Get new flash card</strong> button below to get started, or keep scrolling to start building your dictionary!</p>
        </div>
        <div id='flashCardsContainer'>
          <div id='flashCardBox' onClick={() => this.translate()}>
            { this.state.flashCardDisplay }
          </div>
          <button class="normalButton" id="flashCardButton" onClick={() => this.getFlashCard()}>Get new flash card</button>
        </div>
        <div class='miniBox' id='lookupWord'>
          <h3>Look up a specific word in your dictionary:</h3>
          <form id='lookupForm'>
            <label for="lookupEnglish">English:</label>
            <input id="lookupEnglish" name="lookupEnglish" /><br />
            <label for="lookupSpanish">Spanish:</label>
            <input id="lookupSpanish" name="lookupSpanish" /><br />
            <button class="normalButton" id="lookupButton" onClick={(e) => {
              e.preventDefault();
              const english = document.querySelector('#lookupEnglish').value;
              const spanish = document.querySelector('#lookupSpanish').value;
              console.log(english, spanish);
              this.lookupWord(english, spanish);
              document.getElementById('lookupForm').reset();
            }}>
              Look up word
            </button>
            <div id='lookupResults'>
              <p id='resultsTitle'>Search results</p>
              <p><strong>English: </strong>{ this.state.searchedWord.english }</p>
              <p><strong>Spanish: </strong>{ this.state.searchedWord.spanish }</p>
            </div>
          </form>
        </div>
        <div class='miniBox' id='addWord'>
          <h3>Add a word to your dictionary:</h3>
          <form id='addForm'>
            <label for="addEnglish">English:</label>
            <input id="addEnglish" name="addEnglish" /><br />
            <label for="addSpanish">Spanish:</label>
            <input id="addSpanish" name="addSpanish" /><br />
            <button class="normalButton" id="addWordButton" onClick={(e) => {
              e.preventDefault();
              const english = document.querySelector('#addEnglish').value;
              const spanish = document.querySelector('#addSpanish').value;
              console.log(english, spanish);
              this.addWord(english, spanish);
              document.getElementById('addForm').reset();
            }}>
              Add word
            </button>
          </form>
        </div>
        <div id='display'>
          <h3 id='dictHeader'>My Spanish dictionary</h3>
          <p id='tip'><strong>Tip:</strong> Don't want to study a word anymore? Hit the "X" icon next to any word to delete it from your dictionary!</p>
          { wordLines }
        </div>
      </div>
    )
  }
}

// buttons will be within CONTAINER that inherits/is rendered by App

export default App;