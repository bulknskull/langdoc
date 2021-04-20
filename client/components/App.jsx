const React = require('react');

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Langdoc is a language-learning app that lets you design your own curriculum.</p>
        <p>Choose an option to get started:</p>
        <div>
          <button>View dictionary</button>
          <button>Add a word</button>
          <button>Remove a word</button>
          <button>Update a word</button>
          <button>Get a flash card</button>
        </div>
      </div>
    )
  }
}

export default App;