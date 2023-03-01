import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userInfoAction, requestTokenThunk, theHistory } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      player: {
        name: '',
        email: '',
      },
      disabled: true,
    };
  }

  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  validateEmail = (email) => String(email).toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  validateButton = () => {
    const { player: { email, name } } = this.state;
    const min = 2;
    if (this.validateEmail(email) && name.length >= min) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState((prevState) => ({
      player: {
        ...prevState.player,
        [name]: value,
      },
    }), () => {
      this.validateButton();
    });
  };

  handleClick = ({ target: { value } }) => {
    const { player } = this.state;
    const { fetchToken, history, getUserInfos, myHystory } = this.props;
    fetchToken();
    getUserInfos(player);
    myHystory(history);
    if (value === 'play') {
      history.push('/main');
    } else {
      history.push('/settings');
    }
  }

  render() {
    const { player: { email, name }, disabled } = this.state;

    return (
      <div>
        <form>
          <h1>Login</h1>
          <div>
            <label htmlFor="name">
              <input
                type="text"
                data-testid="input-player-name"
                id="name"
                name="name"
                placeholder="Seu nome"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              <input
                type="email"
                data-testid="input-gravatar-email"
                id="email"
                name="email"
                placeholder="Seu Email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ disabled }
            value="play"
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="submit"
            data-testid="btn-settings"
            value="settings"
            onClick={ this.handleClick }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   token: state.token,
// });

const mapDispatchToProps = (dispatch) => ({
  getUserInfos: (player) => dispatch(userInfoAction(player)),
  fetchToken: () => dispatch(requestTokenThunk()),
  myHystory: (history) => dispatch(theHistory(history)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchToken: PropTypes.func.isRequired,
  getUserInfos: PropTypes.func.isRequired,
  myHystory: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
