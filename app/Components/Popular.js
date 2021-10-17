import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLanguage: 'All',
      repos: {},
      error: null,
    };

    this.selectLanguage = this.selectLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.selectLanguage(this.state.currentLanguage);
  }

  selectLanguage(currentLanguage) {
    this.setState({
      currentLanguage,
      error: null,
    });

    if (!this.state.repos[currentLanguage]) {
      fetchPopularRepos(currentLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [currentLanguage]: data,
            },
          }));
        })
        .catch((error) => {
          console.warn('Error fetching repos: ', error);

          this.setState({
            error: 'There was an error fetching the repositories.',
          });
        });
    }
  }

  isLoading() {
    const { currentLanguage, repos, error } = this.state;

    return !repos[currentLanguage] && error === null;
  }

  render() {
    const { currentLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selected={currentLanguage}
          onUpdateLanguage={this.selectLanguage}
        />

        {this.isLoading() && <p>Loading</p>}
        {error && <p>Error</p>}
        {repos[currentLanguage] && (
          <pre>{JSON.stringify(repos[currentLanguage], null, 2)}</pre>
        )}
      </React.Fragment>
    );
  }
}
