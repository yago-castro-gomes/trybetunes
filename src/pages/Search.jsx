import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    inputValue: '',
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
    const checkInput = inputValue.length <= 1;
    return checkInput;
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <form>
          <input
            type="text "
            data-testid="search-artist-input"
            value={ inputValue }
            onChange={ this.onInputChange }
            name="inputValue"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ this.changeButton() }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
