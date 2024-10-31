const startTestCard = document.querySelector('.start-test');
const startTestButton = startTestCard.querySelector('.start-test-button');
const testCardQuestion = document.querySelector('.test-card-question');
const buttonAnswer = document.querySelector('.button-answer');
const testCardAnswer = document.querySelector('.test-card-answer');
const buttonResume = document.querySelector('.button-resume');
const buttonBackAnswer = document.querySelector('.back-answer');
const buttonBackCard = document.querySelector('.back-card');
const buttonAgain = document.querySelector('.button-again');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');
const popupImgButtonClose = document.querySelector('.popup-img-button-close');
const totalQuestions = document.querySelector('.total-questions');
const wordQuetstion = document.querySelector('.word-question');
const complexity = document.querySelectorAll('.complexity');
const complexityColor = document.querySelectorAll('.complexity-color');
let QUESTIONS = {};

getDataTest()
function getDataTest() {
    fetch('send_test')
    .then((response) => {
      if(response.ok) {
        return  response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
      QUESTIONS = data;
      document.querySelector('.start-test .question-number').textContent = testCardQuestion.querySelector('.test-number').textContent = `0/${Object.keys(QUESTIONS).length}`;
      totalQuestions.textContent = Object.keys(QUESTIONS).length;
      if(Object.keys(QUESTIONS).length % 100 >= 10 && Object.keys(QUESTIONS).length % 100<=20) {
        wordQuetstion.textContent = 'вопросов'
      }
      else{
        if(Object.keys(QUESTIONS).length % 10 == 1) {
            wordQuetstion.textContent = 'вопрос'
        }

        else if(Object.keys(QUESTIONS).length % 10 > 1 && Object.keys(QUESTIONS).length % 10 < 5) {
            wordQuetstion.textContent = 'вопроса'
        }

        else{
            wordQuetstion.textContent = 'вопросов'
        }
      }
  }).catch(function (error) {
      alert(error)
  });
}

  const COMPLEXITY = {
    A: '#9FCB9F',
    B: '#F1D385',
    C: '#F38686'
  }
//const QUESTIONS = {
  //  1:{
    //    number: '1/120',
      //  picture:'/static/img/Rectangle%205.svg',
        //textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        //answersList: ['1','2','3'],
    //},
    //2:{
      //  number: '2/120',
        //picture:'/static/img/Rectangle%205.svg',
        //textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'вопрос 4', 'вопрос 5'],
        //answersList: ['1','2','3','4','5'],
    //},
    //3:{
      //  number: '3/120',
        //picture:'/static/img/Rectangle%205.svg',
        //textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        //answersList: ['1','2','3'],
    //},
    //4:{
      //  number: '4/120',
        //picture:'/static/img/Rectangle%205.svg',
        //textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        //answersList: ['1','2','3'],
    //},
    //5:{
      //  number: '5/120',
       // picture:'/static/img/Rectangle%205.svg',
        //textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        //answersList: ['1','2','3'],
    //},
//}

const ANSWERS = {
    1:{
        number: '1/120',
        pictureSign: '/static/img/Rectangle%205.svg',
        pictureWorld: '/static/img/Rectangle%205.svg',
        result: 'Верно',
        nameSign: 'тут должно быть название знаков',
        descriptionSign: 'а тут должно быть описание или характеристика знака'
    },
    2:{
        number: '2/120',
        pictureSign: '/static/img/Rectangle%205.svg',
        pictureWorld: '/static/img/Rectangle%205.svg',
        result: 'Верно',
        nameSign: 'тут должно быть название знаков',
        descriptionSign: 'а тут должно быть описание или характеристика знака'
    },
    3:{
        number: '3/120',
        pictureSign: '/static/img/Rectangle%205.svg',
        pictureWorld: '/static/img/Rectangle%205.svg',
        result: 'Верно',
        nameSign: 'тут должно быть название знаков',
        descriptionSign: 'а тут должно быть описание или характеристика знака'
    },
    4:{
        number: '4/120',
        pictureSign: '/static/img/Rectangle%205.svg',
        pictureWorld: '/static/img/Rectangle%205.svg',
        result: 'Верно',
        nameSign: 'тут должно быть название знаков',
        descriptionSign: 'а тут должно быть описание или характеристика знака'
    },
    5:{
        number: '5/120',
        pictureSign: '/static/img/Rectangle%205.svg',
        pictureWorld: '/static/img/Rectangle%205.svg',
        result: 'Верно',
        nameSign: 'тут должно быть название знаков',
        descriptionSign: 'а тут должно быть описание или характеристика знака'
    },
    6:{
        number: '5/120',
        pictureSign: '/static/img/Rectangle%205.svg',
        pictureWorld: '/static/img/Rectangle%205.svg',
        result: 'Верно',
        nameSign: 'тут должно быть название знаков',
        descriptionSign: 'а тут должно быть описание или характеристика знака'
    },
    7:{
        number: '5/120',
        pictureSign: '/static/img/Rectangle%205.svg',
        pictureWorld: '/static/img/Rectangle%205.svg',
        result: 'Верно',
        nameSign: 'тут должно быть название знаков',
        descriptionSign: 'а тут должно быть описание или характеристика знака'
    },
    8:{
        number: '5/120',
        pictureSign: '/static/img/Rectangle%205.svg',
        pictureWorld: '/static/img/Rectangle%205.svg',
        result: 'Верно',
        nameSign: 'тут должно быть название знаков',
        descriptionSign: 'а тут должно быть описание или характеристика знака'
    }
}

popupImgButtonClose.onclick = function () {
    popupEnlargedImg.classList.add('hidden');
}

function startTest() {
    startTestCard.classList.add('back');
    testCardQuestion.id = '1';
    buttonAgain.style.display = 'none'
    buttonBackCard.style.display = 'none';
    buttonBackAnswer.style.display = 'none';
    buttonResume.style.display = 'block'
    complexity.forEach((item) => {
        item.textContent = QUESTIONS["1"].complexity; 
    })
    complexityColor.forEach((item) => {
        item.style.backgroundColor = COMPLEXITY[QUESTIONS["1"].complexity]
    }) 
    const questionImg = testCardQuestion.querySelector('img');
    questionImg.src = QUESTIONS["1"].picture;
    questionImg.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = questionImg.src;
                      popupEnlargedImg.classList.remove('hidden');
                  });
    testCardQuestion.querySelector('.test-number').textContent = `${1}/${Object.keys(QUESTIONS).length}`;
    const fragment = document.createDocumentFragment();
    QUESTIONS["1"].textQuestions.forEach((question) => {
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
    testCardQuestion.querySelector('.description-and-answer').appendChild(fragment)
    testCardQuestion.classList.add('front');
};

startTestButton.addEventListener('click', startTest);

function shouAnswer() {
    testCardQuestion.classList.remove('front');
    testCardAnswer.querySelector('.description-and-answer').innerHTML = ''
    const answers = testCardQuestion.querySelectorAll('input');
    let cardId = testCardQuestion.id;
    if(cardId === '1'){
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
        if(answer.value.toLowerCase() !== trueAnswers[index]) {
            answer.style.background = '#F4D0D0';
            answer.style.border = '#E18686';
            result.textContent = `верный ответ - ${trueAnswers[index]}`;
        }
        else {
            answer.style.background = '#E1F0E1';
            answer.style.border = '#9FCB9F';
            result.textContent = `верный ответ - ${trueAnswers[index]}`;
        }
        testCardAnswer.querySelector('.description-and-answer').appendChild(answer.parentElement);
    });


    testCardAnswer.querySelector('.test-number').textContent = `${cardId}/${Object.keys(QUESTIONS).length}`;
    const imgAnswer = testCardAnswer.querySelector('.picture-sign');
    imgAnswer.src = QUESTIONS[`${testCardQuestion.id}`].picture;
    imgAnswer.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = imgAnswer.src;
                      popupEnlargedImg.classList.remove('hidden');
                  });
    
    testCardAnswer.classList.add('front');
};
buttonAnswer.addEventListener('click', shouAnswer);

function shouNextQuestion() {
    testCardAnswer.classList.remove('front');
    let cardId = `${Number(testCardQuestion.id) + 1}`;
    testCardQuestion.id = cardId;
    if(cardId === '1'){
        buttonBackCard.style.display = 'none';
    }
    else {
        buttonBackCard.style.display = 'block';
    }
    if(cardId === `${Object.keys(QUESTIONS).length}`) {
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
    questionImg.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = questionImg.src;
                      popupEnlargedImg.classList.remove('hidden');
                  });
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
    testCardQuestion.classList.add('front');
};
buttonResume.addEventListener('click', shouNextQuestion);

function showPreviousQuestion() {
    testCardQuestion.classList.remove('front');
    setTimeout(()=>{
        testCardQuestion.classList.add('front');
        let cardId = `${Number(testCardQuestion.id) - 1}`;
    testCardQuestion.id = cardId;
     if(cardId === '1'){
        buttonBackCard.style.display = 'none';
    }
    else {
        buttonBackCard.style.display = 'block';
    }
    if(cardId === `${Object.keys(QUESTIONS).length}`) {
        buttonResume.style.display = 'none';
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
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
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
        },300);
};
buttonBackCard.addEventListener('click', showPreviousQuestion);

function shouPreviousAnswer() {
     testCardAnswer.classList.remove('front');
    let cardId = `${Number(testCardQuestion.id) - 1}`;
    if(cardId === '1'){
        buttonBackCard.style.display = 'none';
    }
    else {
        buttonBackCard.style.display = 'block';
    }
    if(cardId === `${Object.keys(QUESTIONS).length}`) {
        buttonResume.style.display = 'none';
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
    testCardQuestion.id = cardId;
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
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
    testCardQuestion.classList.add('front');
};

buttonBackAnswer.addEventListener('click', shouPreviousAnswer)
buttonAgain.addEventListener('click', function() {
    testCardQuestion.querySelector('.description-and-answer').innerHTML = '';
    testCardAnswer.classList.remove('front');
    fetch('send_test')
    .then((response) => {
      if(response.ok) {
        return  response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
      QUESTIONS = data;
      document.querySelector('.start-test .question-number').textContent = testCardQuestion.querySelector('.test-number').textContent = `0/${Object.keys(QUESTIONS).length}`;
      totalQuestions.textContent = Object.keys(QUESTIONS).length;
      if(Object.keys(QUESTIONS).length % 100 >= 10 && Object.keys(QUESTIONS).length % 100<=20) {
        wordQuetstion.textContent = 'вопросов'
      }
      else{
        if(Object.keys(QUESTIONS).length % 10 == 1) {
            wordQuetstion.textContent = 'вопрос'
        }

        else if(Object.keys(QUESTIONS).length % 10 > 1 && Object.keys(QUESTIONS).length % 10 < 5) {
            wordQuetstion.textContent = 'вопроса'
        }

        else{
            wordQuetstion.textContent = 'вопросов'
        }
      }
  }).then(()=>{
    startTest()
  }).catch(function (error) {
      alert(error)
  });
});
