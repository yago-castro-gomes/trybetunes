import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../Css/Login.css';
import LoginHeader from '../components/LoginHeader';
import logoWhite from '../Css/images/logowhite.png';
import Waves from '../components/Waves';

export default class Login extends Component {
  state = {
    inputValue: '',
    loading: false,
  };

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  changeButton = () => {
    const { inputValue } = this.state;
    const checkInput = inputValue.length <= 2;
    return checkInput;
  };

  btnclick = async () => {
    const { history } = this.props;
    const { inputValue } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputValue });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { inputValue, loading } = this.state;

    return (
      <div data-testid="page-login">
        <LoginHeader />
        { loading ? (<Loading />
        ) : (
          <>
            <div>

              <img className="logotunes" src={ logoWhite } alt="logowhite" />
              <div className="login">
                <h3>Qual seu nome?</h3>
                <form>
                  <label htmlFor="nameInput">
                    <input
                      type="text"
                      name="inputValue"
                      id="nameInput"
                      data-testid="login-name-input"
                      // placeholder="Seu nome"
                      value={ inputValue }
                      onChange={ this.onInputChange }
                    />
                  </label>
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ this.changeButton() }
                    onClick={ this.btnclick }
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>
            <Waves />
          </>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
