import { getDataTest } from "./getDataTest.js";
import { startTest, shouAnswer, shouNextQuestion, shouPreviousAnswer, showPreviousQuestion } from "./changeCard.js";


const startTestButton = document.querySelector('.start-test-button');
const testCardQuestion = document.querySelector('.test-card-question');
const buttonAnswer = document.querySelector('.button-answer');
const testCardAnswer = document.querySelector('.test-card-answer');
const buttonResume = document.querySelector('.button-resume');
const buttonBackAnswer = document.querySelector('.back-answer');
const buttonBackCard = document.querySelector('.back-card');
const buttonAgain = document.querySelector('.button-again');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');
const popupImgButtonClose = document.querySelector('.popup-img-button-close');


let QUESTIONS = {};

getDataTest()
  .then((result) => QUESTIONS = result)
  .then(() => {
    startTestButton.addEventListener('click', () => startTest(QUESTIONS));
    buttonAnswer.addEventListener('click', () => shouAnswer(QUESTIONS));
    buttonResume.addEventListener('click', () => shouNextQuestion(QUESTIONS));
    buttonBackCard.addEventListener('click', () => showPreviousQuestion(QUESTIONS));
    buttonBackAnswer.addEventListener('click', () => shouPreviousAnswer(QUESTIONS))
  })


popupImgButtonClose.onclick = function () {
  popupEnlargedImg.classList.add('hidden');
}

testCardQuestion.querySelector('img').addEventListener('click', () => {
  popupEnlargedImg.classList.remove('hidden');
});

testCardAnswer.querySelector('.picture-sign').addEventListener('click', () => {
  popupEnlargedImg.classList.remove('hidden');
});


buttonAgain.addEventListener('click', function () {
  testCardQuestion.querySelector('.description-and-answer').innerHTML = '';
  testCardAnswer.classList.remove('front');
  getDataTest()
    .then((result) => QUESTIONS = result)
    .then(() => startTest(QUESTIONS))
});
