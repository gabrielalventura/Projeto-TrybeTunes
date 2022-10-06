import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false,
      // favoritesMusics: false,
      selectedFavorites: [],
    };
  }

  componentDidMount() {
    this.takeFavoriteMusics();
  }

  takeFavoriteMusics = async () => {
    this.setState({
      load: true,
    });
    const list = await getFavoriteSongs();

    this.setState({
      selectedFavorites: list,
      load: false,
    }, () => this.seekFavorite());
  };

  seekFavorite = () => {
    const { music } = this.props;
    const { selectedFavorites } = this.state;

    return selectedFavorites.some((liked) => liked.trackId === music.trackId);
  };

  handleChangeFavorite = async ({ target }) => {
    const { name, checked } = target;
    const { music } = this.props;

    this.setState({
      load: true,
      [name]: checked,
    });

    if (this.seekFavorite()) {
      await removeSong(music);
    } else {
      await addSong(music);
    }

    this.setState({
      load: false,
    });
    this.takeFavoriteMusics();
  }; // função handleChange desenvolviada com auxilio da Maria Luíza Suhadolnik;

  render() {
    const { music } = this.props;
    const {
      load,
      // favoritesMusics,
    } = this.state;

    return (
      !load
        ? (
          <section className="album-music">
            <span>
              {music.trackName}
            </span>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>

            <label
              htmlFor="likedMusics"
            >
              <input
                data-testid={ `checkbox-music-${music.trackId}` } // colocando o data-testid dentro da tag da label não passava nos testes
                name="likedMusics"
                id={ music.trackId }
                type="checkbox"
                checked={ this.seekFavorite() }
                onChange={ this.handleChangeFavorite }
              />
              Favorita
            </label>
          </section>) : <Loading />
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(),
}.isRequired;

export default MusicCard;
