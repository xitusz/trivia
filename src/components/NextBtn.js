import React, { Component } from 'react';

class NextBtn extends Component {
  // esse botão só será chamado quando a resposta é feita corretamente
  // chamar em outro ciclo de vida
  // só aparecer se o usário clicar seja errado ou certo
  render() {
    return (
      <div>
        <button
          data-testid="btn-next"
          type="button"
          disabled={ isButtonDisabled }
          onClick={ onButtonClick }
        >
          Próxima
        </button>
      </div>
    );
  }
}

export default NextBtn;
