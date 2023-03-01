import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import BackToLoginButton from '../components/BackToLoginBtn';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">
          Tela de Ranking
        </h1>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Voltar ao login
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
