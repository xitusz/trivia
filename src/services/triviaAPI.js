// const requestURL = 'https://opentdb.com/api_token.php?command=request';
const GET_QUESTIONS_URL = 'https://opentdb.com/api.php?amount=5&token=';

// padronização para try catch

export const fetchToken = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchQuestions = async (token) => {
  try {
    const response = await fetch(`${GET_QUESTIONS_URL}${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
