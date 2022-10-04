import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import MusicCard from '../components/MusicCard';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      choosedArtist: '',
      isDisabled: true,
      load: false,
      savedArtist: '',
      researchedInfo: [],
      response: false,
    };
  }

  validateArtist = () => {
    const { choosedArtist } = this.state;
    const validator = 2;
    const returnBool = choosedArtist.length < validator;

    this.setState({
      isDisabled: returnBool,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    return this.setState({
      [name]: value,
    }, () => this.validateArtist());
  };

  withClick = async () => {
    const { choosedArtist } = this.state;

    this.setState({
      load: true,
    });

    const searched = await searchAlbumsAPI(choosedArtist);

    this.setState({
      savedArtist: choosedArtist, // recebe o choosedArtist para poder limpar o choosedArtist
      choosedArtist: '',
      researchedInfo: searched,
      response: true,
      load: false,
    });
  };

  render() {
    const {
      choosedArtist,
      isDisabled,
      load,
      savedArtist,
      researchedInfo,
      response,
    } = this.state;

    return (
      <div
        data-testid="page-search"
      >
        <div>
          <Header />
        </div>
        {load
          ? <Loading />
          : (
            <div>
              <form>
                <label htmlFor="search">
                  Search:
                  <input
                    id="artist"
                    name="choosedArtist"
                    data-testid="search-artist-input"
                    value={ choosedArtist }
                    placeholder="O que você quer ouvir?"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ isDisabled }
                  onClick={ this.withClick }
                >
                  Pesquisar
                </button>
              </form>

              {response && (
                <div>
                  <div>
                    <h2>
                      Resultado de álbuns de:
                      {' '}
                      {savedArtist}
                    </h2>
                  </div>
                  {(researchedInfo.length > 0)
                    ? <MusicCard searched={ researchedInfo } />
                    : <span> Nenhum álbum foi encontrado </span>}
                </div>
              )}
            </div>)}
      </div>
    );
  }
}

// para espaçamento usar aspas simples se não o lint reclama;

// orientação durante a mentoria de que se crie um component para MusicCard para facilitar a execução de manejos dentro dos cards que possam ser solicitados em outros requisitos;

export default Search;
