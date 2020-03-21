const React = require("react");
const UnorderedList = require("./UnorderedList");

const states = ["Washington", "California", "New York"];

const getHopkinsCsvs = require("../client");

/* the main page for the index route of this app */
class Main extends React.Component {
  state = {
    states: []
  };

  componentDidMount() {
    getHopkinsCsvs()
      .then(response => {
      this.setState({ csvLocations: response });
    });
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>

        <p>
          This is a starter <a href="http://glitch.com">Glitch</a> app for
          React!
        </p>

        <UnorderedList items={states} />

        <p>
          Look in <code>app/components/</code> for two example components:
        </p>
      </div>
    );
  }
}

module.exports = Main;
