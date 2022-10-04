import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  async componentDidMount() {
    this.setState({
      username: await getUser(),
    });
  }

  render() {
    const {
      username,
    } = this.state;

    return (
      <header
        data-testid="header-component"
      >
        {username === '' ? (
          <Loading />
        ) : (
          <h2 data-testid="header-user-name">
            {username.name}
          </h2>
        )}

        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Search
        </Link>

        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Liked
        </Link>

        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
