import React from 'react';
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
      </header>
    );
  }
}

export default Header;
