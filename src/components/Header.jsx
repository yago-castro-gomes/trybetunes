import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
