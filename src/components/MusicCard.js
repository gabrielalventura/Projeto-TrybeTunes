import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music } = this.props;

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
        <label
          htmlFor={ music.trackName }
          data-testid={ `checkbox-music-${music.trackId}` }
        >
          <input
            name="liked"
            id={ music.trackName }
            type="checkbox"
          />
          Favorita
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.object,
}.isRequired;

export default MusicCard;
