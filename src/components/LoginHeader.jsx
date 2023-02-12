import React, { Component } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../Css/images/logo.png';
import './IntroLg.css';

export default class Header extends Component {
  state = {
    user: 'Usuário',
  };

  render() {
    const { user } = this.state;
    return (
      <div className="head">
        <img src={ logo } alt="" width="60px" className="logo" />
        <div>
          <a href="/">
            <FontAwesomeIcon icon={ faUser } className="iconUser" />
            { user }
          </a>
        </div>
      </div>
    );
  }
}
