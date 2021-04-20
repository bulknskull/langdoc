const React = require('react');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedWords: false,
      words: []
    }
  }

  componentDidMount() {
    console.log('mounting...');
    fetch('/dictionary')
      .then(res => res.json())
      .then((words) => {
        return this.setState({
          words,
          fetchedWords: true
        });
      })
      .catch(err => console.log(err + 'Error upon mount'))
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
      .then((data) => {
        console.log(data);
        return this.setState({
          data,
          fetchedWords: true
        })
      })
  }

  render() {
    if (!this.state.fetchedWords) return (
      <div>
        <h1>Loading page, please wait...</h1>
      </div>
    )

    const { words } = this.state;

    // STRETCH GOAL: turn this into a bona fide table

    const wordLines = words.map((word, i) => {
      return (
        <div className="entry">
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
          <p>Choose an option below:</p>
        </div>
        <div id='buttons'>
          <button>Flash cards</button>
        </div>
        <div id='addWord'>
          <h3>Add a word to your dictionary:</h3>
          <form>
            <label for="english">English:</label>
            <input id="english" name="english" /><br />
            <label for="spanish">Spanish:</label>
            <input id="spanish" name="spanish" /><br />
            <button id="addWordButton" onClick={(e) => {
              e.preventDefault();
              const english = document.querySelector('#english').value;
              const spanish = document.querySelector('#spanish').value;
              console.log(english, spanish);
              this.addWord(english, spanish);
              document.querySelector('form').reset();
            }}>
              Add word
            </button>
          </form>
        </div>
        <div id='display'>
          { wordLines }
        </div>
      </div>
    )
  }
}

// buttons will be within CONTAINER that inherits/is rendered by App

export default App;