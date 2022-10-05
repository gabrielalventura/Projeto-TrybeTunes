import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false,
      favouritesMusics: false,
    };
  }

  handleChangeFavourite = async ({ target }) => {
    const { name, checked } = target;
    const { music } = this.props;

    this.setState({
      load: true,
    });

    await addSong(music);

    this.setState({
      load: false,
      [name]: checked,
    });
  }; // função handleChange desenvolviada com auxilio da Maria Luíza Suhadolnik;

  render() {
    const { music } = this.props;
    const {
      load,
      favouritesMusics,
    } = this.state;

    return (
      <section className="album-music">
        <span>
          { music.trackName }
        </span>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        {load && <Loading />}
        <label
          htmlFor="favouritesMusics"
        >
          <input
            data-testid={ `checkbox-music-${music.trackId}` } // colocando o data-testid dentro da tag da label não passava nos testes
            name="favouritesMusics"
            id={ music.trackId }
            type="checkbox"
            checked={ favouritesMusics }
            onChange={ this.handleChangeFavourite }
          />
          Favorita
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(),
}.isRequired;

export default MusicCard;
