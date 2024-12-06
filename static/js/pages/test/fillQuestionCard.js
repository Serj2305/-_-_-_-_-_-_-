const complexity = document.querySelectorAll('.complexity');
const complexityColor = document.querySelectorAll('.complexity-color');
const buttonBackCard = document.querySelector('.back-card');
const buttonResume = document.querySelector('.button-resume');
const buttonAgain = document.querySelector('.button-again');
const testCardQuestion = document.querySelector('.test-card-question');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');

const COMPLEXITY = {
  A: '#9FCB9F',
  B: '#F1D385',
  C: '#F38686'
}

export function fillQuestionCard(cardId, QUESTIONS) {
  if (cardId === '1') {
    buttonBackCard.style.display = 'none';
  }
  else {
    buttonBackCard.style.display = 'block';
  }
  if (cardId === `${Object.keys(QUESTIONS).length}`) {
    buttonResume.style.display = 'none';
    buttonAgain.style.display = 'block'
  }
  else {
    buttonResume.style.display = 'block'
    buttonAgain.style.display = 'none'
  }
  complexity.forEach((item) => {
    item.textContent = QUESTIONS[cardId].complexity;
  })
  complexityColor.forEach((item) => {
    item.style.backgroundColor = COMPLEXITY[QUESTIONS[cardId].complexity]
  })
  const questionImg = testCardQuestion.querySelector('img');
  questionImg.src = QUESTIONS[cardId].picture;
  popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = questionImg.src;
  testCardQuestion.querySelector('.test-number').textContent = `${cardId}/${Object.keys(QUESTIONS).length}`;
  const fragment = document.createDocumentFragment();
  QUESTIONS[cardId].textQuestions.forEach((question) => {
    const elem = document.createElement('p');
    elem.classList.add('text-question')
    elem.textContent = question;
    const inputAnswer = document.createElement('input');
    inputAnswer.placeholder = 'Введите ответ';
    const container = document.createElement('div');
    container.classList.add('question-answer-container');
    container.appendChild(elem);
    container.appendChild(inputAnswer);
    fragment.appendChild(container)
  });
  testCardQuestion.querySelector('.description-and-answer').innerHTML = '';
  testCardQuestion.querySelector('.description-and-answer').appendChild(fragment)
}