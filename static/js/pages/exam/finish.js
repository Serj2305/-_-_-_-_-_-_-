const testCardQuestion = document.querySelector('.test-card-question');
const endTestCard = document.querySelector('.end-test')
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const mistakes = document.querySelector('.mistakes');
const mistakesWord = document.querySelector('.mistakes-word');
const mistakesScore = document.querySelector('.mistakes-score')
const timeResult = document.querySelector('.time-result');
const timeScore = document.querySelector('.time-score');


export function finishTest(QUESTIONS, timer, userResposes, questionsResult) {
  timer.stop();
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
  testCardQuestion.classList.remove('front');
  let result = questionsResult.reduce(function (a, b) {
    return a + b;
  }, 0);
  score.textContent = `${result}/${Object.entries(QUESTIONS).length}`;
  let mistakesRes = Object.entries(QUESTIONS).length - result;
  mistakes.textContent = `${mistakesRes}`;
  if (mistakesRes.length % 100 >= 10 && mistakesRes.length % 100 <= 20) {
    mistakesWord.textContent = 'ошибок'
  }
  else {
    if (mistakesRes.length % 10 == 1) {
      mistakesWord.textContent = 'ошибка'
    }

    else if (mistakesRes.length % 10 > 1 && mistakesRes.length % 10 < 5) {
      mistakesWord.textContent = 'ошибки'
    }

    else {
      mistakesWord.textContent = 'ошибок'
    }
  }

  if (mistakesRes <= 1) {
    mistakesScore.textContent = '"хорошо"'
  }
  else if (mistakesRes === 2) {
    mistakesScore.textContent = '"удовлетворительно"'
  }
  else {
    mistakesScore.textContent = '"неудовлетварительно"'
  }
  const timePassed = 600 - (+localStorage.min * 60 + +localStorage.sec)
  const minPassed = Math.floor(timePassed / 60)
  const secPassed = timePassed - minPassed * 60;
  time.textContent = `${minPassed} мин ${secPassed} сек`
  if (timePassed <= 260) {
    timeScore.textContent = '"отлично"'
    timeResult.textContent = '4:20'
  }
  else if (timePassed <= 270) {
    timeScore.textContent = '"хорошо"'
    timeResult.textContent = '4:30'
  }
  else if (timePassed <= 300) {
    timeScore.textContent = '"удовлетворительно"'
    timeResult.textContent = '5:00'
  } else {
    timeScore.textContent = '"неудовлетворительно"'
    timeResult.textContent = 'до 10:00'
  }
  fetch('get_exam_data', {
    method: 'POST',
    body: JSON.stringify({
      startTime: localStorage.startTime,
      res: result,
      time: `${minPassed} мин ${secPassed} сек`
    }),
  }).then((response) => {
    if (!response.ok) {
      return response.statusText
    }
  }).catch((error) => {
    alert(error);
  })
  endTestCard.classList.add('front');
  localStorage.removeItem('min');
  localStorage.removeItem('sec');
  localStorage.removeItem('session');
  localStorage.removeItem('cardId');
  localStorage.removeItem('startTime')
}