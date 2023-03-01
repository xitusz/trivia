import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getScoreAction } from '../actions/index';
import Header from './Header';
import Timer from './Timer';
import '../App.css';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isAnswered: false,
      isActive: false,
      assertions: 0,
      number: 0,
      options: [],
      timeBreaker: false,
      resetTimer: false,
      difficultyLevel: '',
      questionOnScreen: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    if (prevProps.questions !== questions) this.shuffledAnswer();
  }

  goToNextQuestion = () => {
    this.setState((prevState) => ({
      number: prevState.number + 1,
      isActive: false,
      timeBreaker: false,
      resetTimer: true,
      isElementRenderized: false,
    }), () => {
      this.shuffledAnswer();
    });
  };

  isGameFinished = () => {
    // commit para destravar o avaliador
    const { history } = this.props;
    history.push('/feedback');
  }

  isTimeFinished = () => {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');
    this.setState({ isActive: true, isAnswered: true });
    this.toggleNextButton();
    wrongAnswers.forEach((answer) => {
      answer.style.border = '3px solid rgb(255, 0, 0)';
    });
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    this.setState({ timeBreaker: true, isActive: true, isAnswered: true });
  };

  changeStyle = (event) => {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');
    this.setState({ isActive: true, isAnswered: true });
    this.toggleNextButton();
    wrongAnswers.forEach((answer) => {
      answer.style.border = '3px solid rgb(255, 0, 0)';
    });
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    if (event.target === correctAnswer) {
      this.setState({
        timeBreaker: true,
        questionOnScreen: true,
        isActive: true,
        isAnswered: true });
      this.setState((prev) => ({
        assertions: prev.assertions + 1,
      }));
    }
  };

  getScore = (timer) => {
    const { difficultyLevel, assertions } = this.state;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const dez = 10;
    const { score, changeScore } = this.props;
    let difficultyQuestion;
    switch (difficultyLevel) {
    case 'hard':
      difficultyQuestion = hard;
      break;
    case 'medium':
      difficultyQuestion = medium;
      break;
    case 'easy':
      difficultyQuestion = easy;
      break;
    default:
      break;
    }
    const newScore = dez + (timer * difficultyQuestion);
    const finalScore = newScore + score;
    changeScore(Number(finalScore), Number(assertions));
    this.setState({ questionOnScreen: false });
  };

  toggleNextButton = () => {
    const { isActive } = this.state;
    if (isActive === false) {
      this.setState({
        isActive: true,
      });
    }
  };

  shuffledAnswer = () => {
    const { questions } = this.props;
    const { number: questionsIndex } = this.state;
    const number = 0.5;
    let answersList = [];
    if (questions.length > 0) {
      const correctQuestion = questions[questionsIndex].correct_answer
        && questions[questionsIndex].difficulty;
      answersList = [
        questions[questionsIndex].correct_answer,
        ...questions[questionsIndex].incorrect_answers,
      ];
      this.setState(({
        options: answersList.sort(() => number - Math.random()),
        resetTimer: false,
        isElementRenderized: true,
        difficultyLevel: correctQuestion,
      }));
    }
  };

  render() {
    const { questions } = this.props;
    const { isActive, number, options,
      timeBreaker, resetTimer, isElementRenderized,
      questionOnScreen, isAnswered } = this.state;
    return (
      <div>
        <Header />
        <Timer
          changeStyle={ this.changeStyle }
          toggleNextButton={ this.toggleNextButton }
          getScore={ this.getScore }
          isTimeFinished={ this.isTimeFinished }
          timeBreaker={ timeBreaker }
          resetTimer={ resetTimer }
          isElementRenderized={ isElementRenderized }
          questionOnScreen={ questionOnScreen }
        />
        {questions.length && (
          <div>
            <div>
              <h4>Category</h4>
              <span data-testid="question-category">
                { questions[number].category }
              </span>
            </div>
            <div>
              <h2>Question</h2>
              <span data-testid="question-text">
                { questions[number].question }
              </span>
            </div>
            <div data-testid="answer-options">
              { isElementRenderized && options.map((question, index) => {
                let testid;
                let change;
                if (question === questions[number].correct_answer) {
                  change = true;
                  testid = 'correct-answer';
                } else {
                  change = false;
                  testid = `wrong-answer-${index}`;
                }
                return (
                  <button
                    key={ index }
                    className={ change === true ? 'correct-answer' : 'wrong-answer' }
                    disabled={ isActive }
                    type="button"
                    data-testid={ testid }
                    onClick={ this.changeStyle }
                  >
                    { question }
                  </button>);
              }) }
            </div>
          </div>
        ) }
        { isAnswered === true ? (
          <div>
            <button
              // className={ isActive ? '' : 'hidden' }
              type="button"
              data-testid="btn-next"
              onClick={ () => (
                number === questions.length - 1
                  ? this.isGameFinished()
                  : this.goToNextQuestion()
              ) }
            >
              Next
            </button>
          </div>
        ) : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer,
  score: state.player.score,
  questions: state.questions,
  history: state.history,
});

const mapDispatchToProps = (dispatch) => ({
  changeScore: (score, assertions) => dispatch(getScoreAction(score, assertions)),
});

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      question: PropTypes.string,
      difficulty: PropTypes.string,
    }),
  ).isRequired,
  changeScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
