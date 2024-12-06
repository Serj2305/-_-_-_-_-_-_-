const testCardQuestion = document.querySelector('.test-card-question');
const totalQuestions = document.querySelector('.total-questions');
const wordQuetstion = document.querySelector('.word-question');

export async function getDataTest() {
  let QUESTIONS = {}
  await fetch('send_test')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }).then((data) => {
      QUESTIONS = data;
      document.querySelector('.start-test .question-number').textContent = testCardQuestion.querySelector('.test-number').textContent = `0/${Object.keys(QUESTIONS).length}`;
      totalQuestions.textContent = Object.keys(QUESTIONS).length;
      if (Object.keys(QUESTIONS).length % 100 >= 10 && Object.keys(QUESTIONS).length % 100 <= 20) {
        wordQuetstion.textContent = 'вопросов'
      }
      else {
        if (Object.keys(QUESTIONS).length % 10 == 1) {
          wordQuetstion.textContent = 'вопрос'
        }

        else if (Object.keys(QUESTIONS).length % 10 > 1 && Object.keys(QUESTIONS).length % 10 < 5) {
          wordQuetstion.textContent = 'вопроса'
        }

        else {
          wordQuetstion.textContent = 'вопросов'
        }
      }
    }).catch(function (error) {
      alert(error)
    });
  return QUESTIONS
}