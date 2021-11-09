import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './Components/Popular';
import Battle from './Components/Battle';

import { ThemeProvider } from './contexts/theme';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light',
        }));
      },
    };
  }
  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className='container'>
            <Popular />
            {/* <Battle /> */}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
