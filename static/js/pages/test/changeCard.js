import { fillQuestionCard } from "./fillQuestionCard.js";

const startTestCard = document.querySelector('.start-test');
const testCardQuestion = document.querySelector('.test-card-question');
const testCardAnswer = document.querySelector('.test-card-answer');
const buttonBackAnswer = document.querySelector('.back-answer');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');


export function startTest(QUESTIONS) {
  startTestCard.classList.add('back');
  testCardQuestion.id = '1';
  let cardId = testCardQuestion.id;
  fillQuestionCard(cardId, QUESTIONS)
  testCardQuestion.classList.add('front');
};

export function shouNextQuestion(QUESTIONS) {
  testCardAnswer.classList.remove('front');
  let cardId = `${Number(testCardQuestion.id) + 1}`;
  testCardQuestion.id = cardId;
  fillQuestionCard(cardId, QUESTIONS)
  testCardQuestion.classList.add('front');
};

export function showPreviousQuestion(QUESTIONS) {
  testCardQuestion.classList.remove('front');
  setTimeout(() => {
    let cardId = `${Number(testCardQuestion.id) - 1}`;
    testCardQuestion.id = cardId;
    fillQuestionCard(cardId, QUESTIONS)
    testCardQuestion.classList.add('front');
  }, 300);
};

export function shouPreviousAnswer(QUESTIONS) {
  testCardAnswer.classList.remove('front');
  let cardId = `${Number(testCardQuestion.id) - 1}`;
  testCardQuestion.id = cardId;
  fillQuestionCard(cardId, QUESTIONS)
  testCardQuestion.classList.add('front');
};

export function shouAnswer(QUESTIONS) {
  testCardQuestion.classList.remove('front');
  testCardAnswer.querySelector('.description-and-answer').innerHTML = ''
  const answers = testCardQuestion.querySelectorAll('input');
  let cardId = testCardQuestion.id;
  if (cardId === '1') {
    buttonBackAnswer.style.display = 'none';
  }
  else {
    buttonBackAnswer.style.display = 'block';
  }

  const trueAnswers = QUESTIONS[cardId].answersList;
  answers.forEach((answer, index) => {
    const result = document.createElement('span');
    result.classList.add('result');
    answer.readOnly = true;
    answer.parentElement.appendChild(result);
    if (answer.value.toLowerCase() !== trueAnswers[index]) {
      if(localStorage.getItem('theme') === 'dark-theme') {
        answer.style.background = '#372626';
        answer.style.border = '#402F2F'
      }
      else {
        answer.style.background = '#F4D0D0';
        answer.style.border = '#E18686';
      }
      
      result.textContent = `верный ответ - ${trueAnswers[index]}`;
    }
    else {
      if(localStorage.getItem('theme') === 'dark-theme') {
        answer.style.background = '#26372A';
        answer.style.border = '#314334';
      }
      else {
        answer.style.background = '#E1F0E1';
        answer.style.border = '#9FCB9F';
      }
      result.textContent = `верный ответ - ${trueAnswers[index]}`;
    }
    testCardAnswer.querySelector('.description-and-answer').appendChild(answer.parentElement);
  });

  testCardAnswer.querySelector('.test-number').textContent = `${cardId}/${Object.keys(QUESTIONS).length}`;
  const imgAnswer = testCardAnswer.querySelector('.picture-sign');
  imgAnswer.src = QUESTIONS[`${testCardQuestion.id}`].picture;
  popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = imgAnswer.src;
  testCardAnswer.classList.add('front');
};