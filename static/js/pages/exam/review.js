const testCardQuestion = document.querySelector('.test-card-question');
const endTestCard = document.querySelector('.end-test')
const buttonAnswer = document.querySelector('.button-answer');
const buttonBackCard = document.querySelector('.back-card');
const buttonEnd = document.querySelector('.button-end');
const buttonResumeReview = document.querySelector('.button-resume-review');
const buttonBackReview = document.querySelector('.button-back-review');
const buttonEndReview = document.querySelector('.button-end-review');
const complexity = document.querySelectorAll('.complexity');
const complexityColor = document.querySelectorAll('.complexity-color');

const COMPLEXITY = {
  A: '#9FCB9F',
  B: '#F1D385',
  C: '#F38686'
}

export function reviewExam(direction, QUESTIONS, userResposes) {
  testCardQuestion.classList.remove('front');
  endTestCard.classList.remove('front');
  buttonAnswer.style.display = 'none';
  buttonBackCard.style.display = 'none';
  buttonEnd.style.display = 'none';
  let cardId;

  setTimeout(() => {
    testCardQuestion.querySelector('.description-and-answer').innerHTML = '';
    if (direction === 'start') {
      cardId = '1';
    }
    else if (direction === 'resume') {
      cardId = `${Number(testCardQuestion.id) + 1}`;
    }
    else if (direction === 'back') {
      cardId = `${Number(testCardQuestion.id) - 1}`;
    }

    testCardQuestion.id = cardId;

    if (cardId === '1') {
      buttonBackReview.style.display = 'none';
    }
    else {
      buttonBackReview.style.display = 'block';
    }
    if (cardId === `${Object.keys(QUESTIONS).length}`) {
      buttonResumeReview.style.display = 'none';
      buttonEndReview.style.display = 'block';
    } else {
      buttonResumeReview.style.display = 'block';
      buttonEndReview.style.display = 'none';
    }
    const trueAnswers = QUESTIONS[cardId].answersList;
    const responses = userResposes[cardId - 1];
    const fragment = document.createDocumentFragment();
    QUESTIONS[cardId].textQuestions.forEach((question, index) => {
      const elem = document.createElement('p');
      elem.classList.add('text-question')
      elem.textContent = question;
      const inputAnswer = document.createElement('input');
      inputAnswer.value = responses[index];
      inputAnswer.readOnly = true;
      const container = document.createElement('div');
      container.classList.add('question-answer-container');
      container.appendChild(elem);
      container.appendChild(inputAnswer);
      const result = document.createElement('span');
      result.classList.add('result');
      container.appendChild(result);
      if (responses[index].toLowerCase() !== trueAnswers[index]) {
        if(localStorage.getItem('theme') === 'dark-theme') {
          inputAnswer.style.background = '#372626';
          inputAnswer.style.border = '#402F2F'
        }
        else {
          inputAnswer.style.background = '#F4D0D0';
          inputAnswer.style.border = '#E18686';
        }
        result.textContent = `верный ответ - ${trueAnswers[index]}`;
      }
      else {
        if(localStorage.getItem('theme') === 'dark-theme') {
          inputAnswer.style.background = '#26372A';
          inputAnswer.style.border = '#314334';
        }
        else {
          inputAnswer.style.background = '#E1F0E1';
          inputAnswer.style.border = '#9FCB9F';
        }
        result.textContent = `верный ответ - ${trueAnswers[index]}`;
      }
      fragment.appendChild(container);
    });
    testCardQuestion.querySelector('.description-and-answer').appendChild(fragment);

    complexity.forEach((item) => {
      item.textContent = QUESTIONS[testCardQuestion.id].complexity;
    })
    complexityColor.forEach((item) => {
      item.style.backgroundColor = COMPLEXITY[QUESTIONS[testCardQuestion.id].complexity]
    })
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
    testCardQuestion.querySelector('.test-number').textContent = `${cardId}/${Object.keys(QUESTIONS).length}`;
    testCardQuestion.classList.add('front');
  }, 300);
}