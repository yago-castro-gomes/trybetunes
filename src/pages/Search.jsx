import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../Css/Search.css';

export default class Search extends Component {
  state = {
    inputValue: '',
    loading: '',
    albuns: [],
    textSearch: '',
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
    console.log(response );
  };

  render() {
    const { inputValue, loading, albuns, textSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? (<Loading />) : (
          <div className="search">
            <p>Pesquise por sua banda favorita:</p>
            <form>
              <input
                type="text "
                data-testid="search-artist-input"
                value={ inputValue }
                onChange={ this.onInputChange }
                name="inputValue"
                className="searchInput"
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
          </div>
        )}
        { albuns.length < 2 ? (' ') : (
          <>
            <p id="results">
              { textSearch }
            </p>
            <div className="albunsContainer">
              { albuns.map((busca) => (
                <div
                  key={ `${busca.artistId} ${busca.collectionId} ${busca.collectionName}` }
                  className="cardAlbum"
                >
                  <div className="albumItems">
                    <Link
                      to={ `/album/${busca.collectionId}` }
                      data-testid={ `link-to-album-${busca.collectionId}` }
                    >
                      <img
                        src={ busca.artworkUrl100 }
                        alt={ busca.collectionName }
                        id="albumImage"
                      />
                      <h2>{ busca.artistName }</h2>
                      <p>{ busca.collectionName }</p>
                      <FontAwesomeIcon icon={ faCirclePlay } className="iconPlay" />
                    </Link>
                  </div>
                </div>))}
            </div>
          </>)}
      </div>
    );
  }
}
