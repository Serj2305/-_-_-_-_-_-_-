import { fillQuestionCard } from "./fillQuestionCard.js";

const timerContainer = document.querySelector('.timer');
const startTestCard = document.querySelector('.start-test');
const buttonBackReview = document.querySelector('.button-back-review');
const buttonEndReview = document.querySelector('.button-end-review');
const testCardQuestion = document.querySelector('.test-card-question');
const buttonResumeReview = document.querySelector('.button-resume-review');


export function startTest(QUESTIONS, timer, userResposes) {
  localStorage.session = 'true';
  timer.start({ countdown: true, startValues: { minutes: localStorage.min || 10, seconds: localStorage.sec || 0 } });
  timer.addEventListener('secondsUpdated', function (e) {
    timerContainer.textContent = timer.getTimeValues().toString(['minutes', 'seconds']);
    localStorage.min = timer.getTimeValues().minutes;
    localStorage.sec = timer.getTimeValues().seconds;
  });
  timer.addEventListener('targetAchieved', function () {
    finishTest();
  });

  startTestCard.classList.add('back');
  buttonBackReview.style.display = 'none';
  buttonEndReview.style.display = 'none';
  buttonResumeReview.style.display = 'none';
  testCardQuestion.id = localStorage.cardId || '1';
  let cardId = testCardQuestion.id
  fillQuestionCard(cardId, QUESTIONS, userResposes)
  testCardQuestion.classList.add('front');
};


export function shouNextQuestion(QUESTIONS, userResposes, questionsResult) {
  testCardQuestion.classList.remove('front');
  const response = testCardQuestion.querySelectorAll('input');
  const trueResponse = QUESTIONS[Number(testCardQuestion.id)].answersList;
  let flag = true;
  const responses = []
  response.forEach((resp, index) => {
    if (resp.value.toLowerCase() !== trueResponse[index]) {
      flag = false;
    }
    responses[index] = resp.value;
  })
  userResposes[Number(testCardQuestion.id) - 1] = responses;
  if (flag == true) {
    questionsResult[Number(testCardQuestion.id) - 1] = 1;
  }
  else {
    questionsResult[Number(testCardQuestion.id) - 1] = 0;
  }
  localStorage.userResposes = JSON.stringify(userResposes);
  localStorage.questionsResult = JSON.stringify(questionsResult)

  setTimeout(() => {
    testCardQuestion.classList.add('front');
    let cardId = `${Number(testCardQuestion.id) + 1}`;
    localStorage.cardId = cardId;
    testCardQuestion.id = cardId;
    fillQuestionCard(cardId, QUESTIONS, userResposes)
  }, 300);
};

export function showPreviousQuestion(QUESTIONS, userResposes) {
  testCardQuestion.classList.remove('front');
  const response = testCardQuestion.querySelectorAll('input');
  const responses = []
  response.forEach((resp, index) => {
    responses[index] = resp.value;
  })
  userResposes[Number(testCardQuestion.id) - 1] = responses;
  localStorage.userResposes = JSON.stringify(userResposes);
  setTimeout(() => {
    testCardQuestion.classList.add('front');
    let cardId = `${Number(testCardQuestion.id) - 1}`;
    testCardQuestion.id = cardId;
    localStorage.cardId = cardId;
    fillQuestionCard(cardId, QUESTIONS, userResposes)
  }, 300);
};