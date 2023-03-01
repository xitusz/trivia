import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };
  }

  // // refatoração do código inicial
  startTimer = () => {
    this.setState({ timer: 30 });
    const SET_INTERVAL = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, SET_INTERVAL);
  };

  // const { timer } = this.state;
  // if (timer > 0) {
  //   this.setState((prevState) => ({
  //     timer: prevState.timer - 1,
  //   }));
  //   setTimer(timer);
  // } else {
  //   setTimer(0);
  // }

  componentDidMount = () => {
    this.startTimer(); // inicia o contador
  }

  // atualiza conforme o comportamento do jogador
  componentDidUpdate = () => {
    const { timer } = this.state;
    // informações passadas vidas props no gamebody, onde o timer é renderizado
    const { timeBreaker, getScore, isTimeFinished,
      resetTimer, toggleNextButton, questionOnScreen, isElementRenderized } = this.props;
    // tempo finalizado sem o botao ter sido clicado e tempo parado
    if (timer === 0 && timeBreaker === false && isElementRenderized) {
      clearInterval(this.interval);
      isTimeFinished();
      toggleNextButton();
    // se houver a parada com o clique
    } else if (timeBreaker) {
      clearInterval(this.interval);
      if (questionOnScreen) getScore(timer);
    } else if (resetTimer) this.startTimer();
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <span>{`Tempo restante: ${timer}`}</span>
      </div>
    );
  }
}

Timer.propTypes = {
  timeBreaker: PropTypes.bool.isRequired,
  resetTimer: PropTypes.bool.isRequired,
  toggleNextButton: PropTypes.func.isRequired,
  getScore: PropTypes.string.isRequired,
  isTimeFinished: PropTypes.string.isRequired,
  questionOnScreen: PropTypes.string.isRequired,
  isElementRenderized: PropTypes.string.isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   setTimer: (tempo) => dispatch(setTheTimer(tempo)), // dispara a action para tornar o timerFinish true.
// });

// export default connect(null, mapDispatchToProps)(Timer);

export default Timer;
