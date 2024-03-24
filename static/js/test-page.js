const startTestCard = document.querySelector('.start-test');
const startTestButton = startTestCard.querySelector('.start-test-button');
const testCardQuestion = document.querySelector('.test-card-question');
const buttonAnswer = document.querySelector('.button-answer');
const testCardAnswer = document.querySelector('.test-card-answer');
const buttonResume = document.querySelector('.button-resume');
const buttonBackAnswer = document.querySelector('.back-answer');
const buttonBackCard = document.querySelector('.back-card');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');
const popupImgButtonClose = document.querySelector('.popup-img-button-close');

let QUESTIONS = {};
fetch('sendTest')
    .then((response) => {
      if(response.ok) {
        return  response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
      QUESTIONS = data;
      document.querySelector('.start-test .question-number').textContent = testCardQuestion.querySelector('.test-number').textContent = `0/${Object.keys(QUESTIONS).length}`;
  }).catch(function (error) {
      alert(error)
  });
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
    buttonBackCard.style.display = 'none';
    buttonBackAnswer.style.display = 'none';
    const questionImg = testCardQuestion.querySelector('img');
    questionImg.src = QUESTIONS["1"].picture;
    questionImg.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = questionImg.src;
                      popupEnlargedImg.classList.remove('hidden');
                  });
    testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS["1"].number}/${Object.keys(QUESTIONS).length}`;
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
        if(answer.value !== trueAnswers[index]) {
            answer.style.background = '#F4D0D0';
            answer.style.border = '#E18686';
            result.textContent = `верный ответ - ${trueAnswers[index]}`;
        }
        else {
            answer.style.background = '#E1F0E1';
            answer.style.border = '#9FCB9F';
            result.textContent = `верный ответ - ${answer.value}`;
        }
        testCardAnswer.querySelector('.description-and-answer').appendChild(answer.parentElement);
    });


    testCardAnswer.querySelector('.test-number').textContent = `${QUESTIONS[testCardQuestion.id].number}/${Object.keys(QUESTIONS).length}`;
    const imgAnswer = testCardAnswer.querySelector('.picture-sign');
    imgAnswer.src = QUESTIONS[`${testCardQuestion.id}`].picture;
    imgAnswer.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = imgAnswer.src;
                      popupEnlargedImg.classList.remove('hidden');
                  });
    if(QUESTIONS[`${testCardQuestion.id}`].pictureWorld === '/images/') {
        testCardAnswer.querySelector('.picture-world-container').style.display = 'none';
    }
    else {
        testCardAnswer.querySelector('.picture-world-container').style.display = 'flex';
        const imgWorldAnswer = testCardAnswer.querySelector('.picture-world');
        imgWorldAnswer.src = QUESTIONS[`${testCardQuestion.id}`].pictureWorld;
        imgWorldAnswer.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = imgWorldAnswer.src;
                      popupEnlargedImg.classList.remove('hidden');
                  });
    }
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
    }
    else {
        buttonResume.style.display = 'block'
    }

    const questionImg = testCardQuestion.querySelector('img');
    questionImg.src = QUESTIONS[cardId].picture;
    questionImg.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = questionImg.src;
                      popupEnlargedImg.classList.remove('hidden');
                  });
    testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS[cardId].number}/${Object.keys(QUESTIONS).length}`;
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
    }
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
    testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS[testCardQuestion.id].number}/${Object.keys(QUESTIONS).length}`;
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
    }
    testCardQuestion.id = cardId;
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
    testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS[testCardQuestion.id].number}/${Object.keys(QUESTIONS).length}`;
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

