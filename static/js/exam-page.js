const startTestCard = document.querySelector('.start-test');
const startTestButton = startTestCard.querySelector('.start-test-button');
const testCardQuestion = document.querySelector('.test-card-question');
const buttonAnswer = document.querySelector('.button-answer');
const buttonBackCard = document.querySelector('.back-card');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');
const popupImgButtonClose = document.querySelector('.popup-img-button-close');
const timerContainer = document.querySelector('.timer');

const QUESTIONS = {
    1:{
        number: '1/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        answersList: ['1','2','3'],
    },
    2:{
        number: '2/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'вопрос 4', 'вопрос 5'],
        answersList: ['1','2','3','4','5'],
    },
    3:{
        number: '3/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        answersList: ['1','2','3'],
    },
    4:{
        number: '4/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        answersList: ['1','2','3'],
    },
    5:{
        number: '5/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        answersList: ['1','2','3'],
    },
}

popupImgButtonClose.onclick = function () {
    popupEnlargedImg.classList.add('hidden');
}

function startTest() {
    var timer = new easytimer.Timer();
    timer.start({countdown: true, startValues: {minutes: localStorage.min || 10, seconds: localStorage.sec || 0}});
    timer.addEventListener('secondsUpdated', function (e) {
        timerContainer.textContent = timer.getTimeValues().toString(['minutes', 'seconds']);
        localStorage.min = timer.getTimeValues().minutes;
        localStorage.sec = timer.getTimeValues().seconds;
    });
    timer.addEventListener('targetAchieved', function (e) {
        localStorage.clear();
    });

    startTestCard.classList.add('back');
    testCardQuestion.id = '1';
    buttonBackCard.style.display = 'none';
    const questionImg = testCardQuestion.querySelector('img');
    questionImg.src = QUESTIONS["1"].picture;
    questionImg.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = questionImg.src;
                      popupEnlargedImg.classList.remove('hidden');
                  });
    //testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS["1"].number}/${Object.keys(QUESTIONS).length}`;
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

function shouNextQuestion() {
    testCardQuestion.classList.remove('front');
    setTimeout(()=>{
        testCardQuestion.classList.add('front');
        let cardId = `${Number(testCardQuestion.id) + 1}`;
    testCardQuestion.id = cardId;
     if(cardId === '1'){
        buttonBackCard.style.display = 'none';
    }
    else {
        buttonBackCard.style.display = 'block';
    }
    if(cardId === `${Object.keys(QUESTIONS).length}`) {
        buttonAnswer.style.display = 'none';
    }
    else {
        buttonAnswer.style.display = 'block'
    }
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
    //testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS[testCardQuestion.id].number}/${Object.keys(QUESTIONS).length}`;
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
buttonAnswer.addEventListener('click', shouNextQuestion);

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
        buttonAnswer.style.display = 'none';
    }
    else {
        buttonAnswer.style.display = 'block'
    }
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
    //testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS[testCardQuestion.id].number}/${Object.keys(QUESTIONS).length}`;
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
