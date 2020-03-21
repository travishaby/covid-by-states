const React = require('react');
const UnorderedList = require('./UnorderedList');

const states = [
  'Washington',
  'California',
  'New York'
];

const getHopkinsCsvs = require('../client')

let csvsList
(async () => {
  csvsList = await getHopkinsCsvs()
})()
console.log('csvsList:', csvsList)

/* the main page for the index route of this app */
const Main = function() {
  return (
    <div>
      <h1>Hello World!</h1>

      <p>This is a starter <a href="http://glitch.com">Glitch</a> app for React!</p>

      <UnorderedList items={states} />

      <p>Look in <code>app/components/</code> for two example components:</p>
    </div>
  );
}

module.exports = Main;