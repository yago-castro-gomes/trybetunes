import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    inputValue: '',
    loading: '',
    albuns: [],
    textSearch: '',
    setBusca: [],
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

  //  this.setState(() => ({

  //    textSearch: `Resultado de álbuns de: ${inputValue}`,
  //    setBusca: albuns.filter((album) => album.artistName.includes(inputValue)),
  //  }));

  searchAlbum = async () => {
    const { inputValue } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(inputValue);
    this.setState(() => ({
      albuns: response,
      loading: false,
      textSearch: `Resultado de álbuns de: ${inputValue}`,
      inputValue: '',
    }));
  };

  render() {
    const { inputValue, loading, albuns, textSearch, setBusca } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        { loading ? (<Loading />) : (
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
              onClick={ this.searchAlbum }
            >
              Pesquisar
            </button>

          </form>
        )}
        { albuns.length < 1 ? ('Nenhum álbum foi encontrado') : (
          <div>
            <p>
              { textSearch }
            </p>
            { albuns.map((busca) => (
              <div key={ busca.artistId }>
                <h2>{ busca.artistName }</h2>
                <p>
                  Data de lançamento:
                  {' '}
                  {' '}
                  { busca.releaseDate }
                </p>
                <p>{ busca.collectionName }</p>
                <img src={ busca.artworkUrl100 } alt={ busca.collectionName } />
                <p>
                  {' '}
                  { busca.collectionPrice }
                </p>
                <div>
                  <Link
                    to={ `/album/${busca.collectionId}` }
                    data-testid={ `link-to-album-${busca.collectionId}` }
                  >
                    Acesse
                  </Link>
                </div>
              </div>))}
          </div>)}
      </div>
    );
  }
}
