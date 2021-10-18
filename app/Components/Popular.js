import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa';
import Card from './Card';

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

function ReposGrid({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;
        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              name={login}
              href={html_url}
            >
              <ul className='card-list'>
                <li>
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
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
        {error && <p className='center-text error'>Error</p>}
        {repos[currentLanguage] && <ReposGrid repos={repos[currentLanguage]} />}
      </React.Fragment>
    );
  }
}
