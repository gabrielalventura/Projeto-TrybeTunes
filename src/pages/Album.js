import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI'; // a função possui export default, por isso não há necessidade de realizar o import com desestruturação;
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      lP: [],
      lPInfo: {},
    };
  }

  componentDidMount() {
    this.captureMusics();
  } // a função dentro do componentDidMount deve ser chamada antes da sua definição(?)

  captureMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicAlbum = await getMusics(id);
    const musics = musicAlbum.filter((music) => music.kind === 'song'); // Não é possivel utilizar o typeOf, mas o kind sim. A requisição reconhece o kind como song.

    this.setState({
      lP: musics,
      lPInfo: musicAlbum[0],
    });
  };

  render() {
    const { lP,
      lPInfo,
    } = this.state;

    return (
      <div
        data-testid="page-album"
      >
        <Header />
        <div>
          <h1
            data-testid="artist-name"
          >
            {lPInfo.artistName}
          </h1>
          <h3
            data-testid="album-name"
          >
            {`${lPInfo.collectionName} : ${lPInfo.artistName}`}
          </h3>
        </div>
        <div>
          {lP.map((music) => (
            <li
              key={ music.trackId }
            >
              <MusicCard music={ music } />
            </li>
          ))}
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

export default Album;
