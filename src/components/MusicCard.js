import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { searched } = this.props;

    return (
      <section>
        <ul>
          {searched.map((info) => (
            <li
              key={ info.collectionId }
            >
              Artista:
              { info.artistName }
              <Link
                to={ `/album/${info.collectionId}` }
                data-testid={ `link-to-album-${info.collectionId}` }
              >
                Album:
                { info.collectionName }
                <img src={ info.artworkUrl100 } alt={ info.artistName } />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

MusicCard.propTypes = {
  searched: PropTypes.arrayOf,
}.isRequired; // lint não deixou utilizar um objeto com forma especifica fazendo PropTypes.shape, dessa forma, optei pelo arrayOf sem especificar o tipo básico pois há number e string no objeto

export default MusicCard;
