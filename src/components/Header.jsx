import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
    return (
      <div>
        <Link data-testid="link-to-search" to="/search"> Buscar </Link>
        |
        <Link data-testid="link-to-favorites" to="/favorites"> Favoritos </Link>
        |
        <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
        <div data-testid="header-component">Header</div>
        { loading ? (<Loading />
        ) : (
          <div data-testid="header-user-name">
            { user }
          </div>
        )}
      </div>
    );
  }
}
