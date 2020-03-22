const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const Main = require('./components/Main');
const {DataContextProvider} = require('./DataContext')

ReactDOM.render(<DataContextProvider><Main/></DataContextProvider>, document.getElementById('main'));