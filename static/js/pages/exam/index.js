import { getDataExam } from "./getDataExam.js";
import { startTest, shouNextQuestion, showPreviousQuestion } from "./changeCard.js";
import { finishTest } from "./finish.js";
import { reviewExam } from "./review.js";

const startTestCard = document.querySelector('.start-test');
const startTestButton = startTestCard.querySelector('.start-test-button');
const testCardQuestion = document.querySelector('.test-card-question');
const endTestCard = document.querySelector('.end-test')
const buttonAnswer = document.querySelector('.button-answer');
const buttonBackCard = document.querySelector('.back-card');
const buttonEnd = document.querySelector('.button-end');
const buttonAgain = document.querySelector('.again-button');
const buttonResumeReview = document.querySelector('.button-resume-review');
const buttonBackReview = document.querySelector('.button-back-review');
const buttonEndReview = document.querySelector('.button-end-review');
const buttonReview = document.querySelector('.review-button');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');
const popupImgButtonClose = document.querySelector('.popup-img-button-close');


let QUESTIONS = {};
let userResposes = [];
let questionsResult = [];
if (localStorage.session === 'true') {
  QUESTIONS = JSON.parse(localStorage.QUESTIONS);
  userResposes = JSON.parse(localStorage.userResposes);
  questionsResult = JSON.parse(localStorage.questionsResult);
}
else {
  getDataExam()
    .then(result => QUESTIONS = result)
    .then(() => {
      startTestButton.addEventListener('click', () => startTest(QUESTIONS, timer, userResposes));
      startTestButton.addEventListener('click', createStartTime)
    })
}


popupImgButtonClose.onclick = function () {
  popupEnlargedImg.classList.add('hidden');
}

testCardQuestion.querySelector('img').addEventListener('click', () => {
  popupEnlargedImg.classList.remove('hidden');
});

var timer = new easytimer.Timer();

if (localStorage.session === 'true') {
  startTest(QUESTIONS, timer, userResposes);
}


function createStartTime() {
  let date = new Date();
  localStorage.startTime = date.toLocaleDateString();
}

buttonAnswer.addEventListener('click', () => shouNextQuestion(QUESTIONS, userResposes, questionsResult));


buttonBackCard.addEventListener('click', () => showPreviousQuestion(QUESTIONS, userResposes));


buttonEnd.addEventListener('click', () => finishTest(QUESTIONS, timer, userResposes, questionsResult));
buttonAgain.addEventListener('click', createStartTime)
buttonAgain.addEventListener('click', function () {
  endTestCard.classList.remove('front');
  testCardQuestion.querySelector('.description-and-answer').innerHTML = '';
  questionsResult.length = 0;
  userResposes.length = 0;
  getDataExam()
    .then(result => QUESTIONS = result)
    .then(() => startTest(QUESTIONS, timer, userResposes))
});


buttonReview.addEventListener('click', () => reviewExam('start', QUESTIONS, userResposes));
buttonResumeReview.addEventListener('click', () => reviewExam('resume', QUESTIONS, userResposes));
buttonBackReview.addEventListener('click', () => reviewExam('back', QUESTIONS, userResposes));
buttonEndReview.addEventListener('click', function () {
  testCardQuestion.classList.remove('front');
  endTestCard.classList.add('front')
});
