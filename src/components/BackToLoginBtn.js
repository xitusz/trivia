import React, { Component } from 'react';

// vai aparecer na tela do ranking
class BackToLoginButton extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

export default BackToLoginButton;
