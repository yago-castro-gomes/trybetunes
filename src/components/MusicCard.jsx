import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../Css/MusicCard.css';

export default class MusicCard extends Component {
  state = {
    check: false,
    loading: false,
  };

  componentDidMount() {
    this.returnFavs();
  }

  favoriteSong = async () => {
    const { check } = this.state;
    const { musicName, previewUrl, trackId } = this.props;
    if (!check) {
      await addSong({ musicName, previewUrl, trackId });
      this.setState({
        loading: false,
        check: true,
      });
    }
    if (check) {
      await removeSong({ musicName, previewUrl, trackId });
      this.setState({
        loading: false,
        check: false,
      });
    }
  };

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
      loading: true,
    });
  };

  returnFavs = async () => {
    const { trackId } = this.props;
    const getFav = await getFavoriteSongs();
    getFav.forEach((idTrack) => {
      if (trackId === idTrack.trackId) {
        this.setState(({
          check: true,
        }));
      }
    });
  };

  render() {
    const { musicName, previewUrl, trackId } = this.props;
    const { loading, check } = this.state;
    return (
      <div>
        <div>
          { loading ? (<Loading />) : (
            <div className='itensMusic'>
              <h5>
                { musicName }
              </h5>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <span>
                <label htmlFor={ trackId }>
                  <input
                    type="checkbox"
                    name="favorita"
                    id={ trackId }
                    checked={ check }
                    onChange={ this.onInputChange }
                    data-testid={ `checkbox-music-${trackId}` }
                    onClick={ this.favoriteSong }
                  />
                  Favorita
                </label>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
