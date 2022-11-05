import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    artistName: [],
    arrayTracks: [],
  };

  componentDidMount() {
    this.takeMusic();
  }

  takeMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const music = await getMusics(id);
    this.setState({
      artistName: music[0],
      arrayTracks: music.slice(1),
    });
  };

  render() {
    const { artistName, arrayTracks } = this.state;
    return (
      <div>
        <div data-testid="page-album">
          <Header />
          Album
          <div>
            <img src={ artistName.artworkUrl100 } alt={ artistName.artistName } />
            <p data-testid="album-name">{ artistName.collectionName }</p>
            <h2 data-testid="artist-name">
              { artistName.artistName }
            </h2>
            { arrayTracks.map((music) => (<MusicCard
              data-testid="audio-component"
              key={ music.trackCensoredName }
              musicName={ music.trackName }
              previewUrl={ music.previewUrl }
            />)) }
          </div>
        </div>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
