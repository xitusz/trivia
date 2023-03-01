import {
  GET_INFOS,
  REQUEST_TOKEN,
  GET_QUESTIONS,
  SETTIMER,
  GET_SCORE,
  GET_HISTORY,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    email: '',
    score: 0,
    assertions: 0,
  },
  token: '',
  questions: [],
  timer: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  case GET_INFOS:
    return {
      ...state,
      player: {
        ...state.player,
        ...action.player,
      },
    };
  case SETTIMER:
    return {
      ...state,
      timer: action.timer,
    };
  case GET_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.score,
        assertions: action.assertions,
      },
    };
  case GET_HISTORY:
    return {
      ...state,
      history: action.history,
    };
  default:
    return state;
  }
};

export default reducer;
