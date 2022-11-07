import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    check: false,
    loading: false,
  };

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
      loading: true,
    });
  };

  favoriteSong = async () => {
    const { check } = this.state;
    if (!check) {
      const { musicName, previewUrl, trackId } = this.props;
      await addSong({ musicName, previewUrl, trackId });
    }
    this.setState({
      loading: false,
      check: true,
    });
  };

  render() {
    const { musicName, previewUrl, trackId } = this.props;
    const { loading, check } = this.state;
    return (
      <div>
        { loading ? (<Loading />) : (
          <div>
            <h3>
              { musicName }
            </h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
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
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
