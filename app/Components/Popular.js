import React from 'react';

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

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLanguage: 'All',
    };

    this.selectLanguage = this.selectLanguage.bind(this);
  }

  selectLanguage(lang) {
    this.setState({
      currentLanguage: lang,
    });
  }

  render() {
    const { selectedLanguage } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          selected={this.state.currentLanguage}
          onUpdateLanguage={this.selectLanguage}
        />
      </React.Fragment>
    );
  }
}
