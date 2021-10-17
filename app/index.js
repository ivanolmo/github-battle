import React from 'react';
import ReactDOM from 'react-dom';
import data from './data';
import './index.css';
import Popular from './Components/Popular';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Popular />
      </div>
    );
    // let words = data.split(' ');
    // return (
    //   <ul>
    //     {words.map((word) => (
    //       <li>{word} what</li>
    //     ))}
    //   </ul>
    // );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
