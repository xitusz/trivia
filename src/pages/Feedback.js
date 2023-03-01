import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BackToLoginButton from '../components/BackToLoginBtn';
import GoToRanking from '../components/GoToRankingBn';
import Header from '../components/Header';

class Feedback extends Component {
  verifyTextCorrect = () => {
    const { assertions } = this.props;
    const GOOD_ASSERTIONS = 3;
    let msg = '';
    if (assertions >= GOOD_ASSERTIONS) {
      msg = 'Well Done!';
    } else {
      msg = 'Could be better...';
    }
    return <p data-testid="feedback-text">{ msg }</p>;
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          Feedbacks
        </h1>
        <p data-testid="feedback-total-score">
          { score }
        </p>
        <p data-testid="feedback-total-question">
          { assertions }
          { ' ' }
          { this.verifyTextCorrect() }
        </p>
        <Link to="/">
          <BackToLoginButton />
        </Link>
        <Link to="/ranking">
          <GoToRanking />
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
