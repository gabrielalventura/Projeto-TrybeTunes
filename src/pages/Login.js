import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      newUser: '',
      isDisabled: true,
      load: false,
    };
  }

  validateUser = () => {
    const { newUser } = this.state;
    const validator = 3;
    const returnBool = newUser.length < validator; // if (newUser.length < validator) { //testar logica com constante retornando o booleano
    this.setState(({
      isDisabled: returnBool,
    }));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    return this.setState({
      [name]: value,
    }, () => this.validateUser());
  };

  toRedirect = async () => {
    const { newUser } = this.state;
    const { history } = this.props;
    this.setState(({
      load: true,
    }));
    await createUser({ name: newUser });
    history.push('/search');
  }; // requisito 2 realizado com auxilio da Ligia Bicalho

  render() {
    const {
      newUser,
      load,
      isDisabled,
    } = this.state;

    return (
      <div
        data-testid="page-login"
      >
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              name="newUser"
              data-testid="login-name-input"
              value={ newUser }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.toRedirect }
          >
            Entrar
          </button>
          {load && <Loading />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
