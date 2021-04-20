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

  getDictionary() {
    // make GET request for entirety of dictionary file, processed accordingly
    console.log('egg');
    fetch('/dictionary')
      .then(res => res.json())
      .then((words) => {
        console.log(words[0]['subcat']);
      })
      .catch(err => console.log('There was an error'));
  }

  render() {
    return (
      <div id='body'>
        <div id='hello'>
          <h1>Welcome to Langdoc!</h1>
          <p>Langdoc is a language-learning app that lets you design your own curriculum.</p>
          <p>Choose an option below:</p>
        </div>
        <div id='buttons'>
          <button onClick={this.getDictionary}>View dictionary</button>
        </div>
        <div id='display'>

        </div>
      </div>
    )
  }
}

// buttons will be within CONTAINER that inherits/is rendered by App

export default App;