import { fetchToken, fetchQuestions } from '../services/triviaAPI';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_INFOS = 'GET_INFOS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_SCORE = 'GET_SCORE';
export const SETTIMER = 'SETTIMER';
export const GET_HISTORY = 'GET_HISTORY';

export const userInfoAction = (player) => ({
  type: GET_INFOS,
  player,
});

const requestTokenAction = (token) => ({
  type: REQUEST_TOKEN,
  token,
});

const getQuestionsAction = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const getScoreAction = (score, assertions) => ({
  type: GET_SCORE,
  score,
  assertions,
});

export const theHistory = (history) => ({
  type: GET_HISTORY,
  history,
});

export const setTheTimer = (timer) => ({
  type: SETTIMER,
  timer,
});

const url = 'https://opentdb.com/api_token.php?command=request';

export const requestQuestionsThunk = (token) => async (dispatch) => {
  const codeControl = 3;
  const data = await fetchQuestions(token);
  if (data.response_code === codeControl) {
    // se for igual a 3 => expirou e faz uma nova requisição
    const newRequest = await fetchToken(url);
    // pega o token da nova requisição => avaliar se desestrutura também
    const newData = await fetchQuestions(newRequest.token);
    // dispara o getQuestions com as novas perguntas
    dispatch(getQuestionsAction(newData.results));
  } else {
    // dispara o getQuestions com as perguntas originais, do token nao expirado
    dispatch(getQuestionsAction(data.results));
  }
};

export const requestTokenThunk = () => async (dispatch) => {
  const data = await fetchToken(url);
  // o problema estava aqui: data é um objeto, e token é ele desestruturado!
  // const { token } = data;
  localStorage.setItem('token', data.token);
  dispatch(requestTokenAction(data.token));
  dispatch(requestQuestionsThunk(data.token));
};
