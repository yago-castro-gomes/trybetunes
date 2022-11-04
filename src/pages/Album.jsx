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
      arrayTracks: music,
    });
    console.log(music);
  };

  render() {
    const { artistName, arrayTracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <div>
          <br />
          <br />
          <img src={ artistName.artworkUrl100 } alt={ artistName } />
          <p data-testid="album-name">{ artistName.collectionName }</p>
          <h2 data-testid="artist-name">
            { artistName.artistName }
          </h2>
          { arrayTracks.map((music) => (<MusicCard
            key={ music.trackCensoredName }
            musicName={ music.trackCensoredName }
            previewUrl={ music.previewUrl }
          />)) }
        </div>
      </div>
    );
  }
}
