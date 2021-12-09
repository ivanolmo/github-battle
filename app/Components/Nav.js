import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

const isActive = ({ isActive }) => ({ color: isActive && 'rgb(187, 46, 31)' });

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className='row space-between'>
          <ul className='row nav'>
            <li>
              <NavLink to='/' style={isActive} className='nav-link'>
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink to='/battle' style={isActive} className='nav-link'>
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            className='btn-clear'
            style={{ fontSize: 30 }}
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🕶' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
