import React, { Component } from 'react';
import { faUser, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import logo from '../Css/images/logo.png';
import '../Css/HeadCss.css';
import logoWhite from '../Css/images/logowhite.png';

export default class Header extends Component {
  state = {
    loading: false,
    user: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false });
    this.setState({
      user: user.name,
    });
  }

  render() {
    const { loading, user } = this.state;
    const styles = {
      bmMenu: {
        overflow: 'hidden',
      } };
    return (
      <>
        <Menu width={ 200 } styles={ styles }>
          <Link data-testid="link-to-search" to="/search">
            {' '}
            <FontAwesomeIcon icon={ faSearch } />
            {' '}
            Buscar
            {' '}
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites" className="menuTexts">
            {' '}
            <FontAwesomeIcon icon={ faStar } />
            Favoritos
            {' '}
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            {' '}
            <FontAwesomeIcon icon={ faUser } />
            {' '}
            Perfil
            {' '}
          </Link>
        </Menu>

        <div className="head">
          <img src={ logoWhite } alt="" width="60px" className="tipo" />
          <div data-testid="header-component" />

          <div data-testid="header-user-name">
            <FontAwesomeIcon icon={ faUser } className="iconUser" />
            { user }
          </div>

        </div>
      </>
    );
  }
}
