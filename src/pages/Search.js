import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      choosedArtist: '',
      isDisabled: true,
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

  render() {
    const {
      choosedArtist,
      isDisabled,
    } = this.state;

    return (
      <div
        data-testid="page-search"
      >
        <div>
          <Header />
        </div>
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
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
