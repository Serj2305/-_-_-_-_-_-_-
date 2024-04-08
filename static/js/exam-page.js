const startTestCard = document.querySelector('.start-test');
const startTestButton = startTestCard.querySelector('.start-test-button');
const testCardQuestion = document.querySelector('.test-card-question');
const endTestCard = document.querySelector('.end-test')
const buttonAnswer = document.querySelector('.button-answer');
const buttonBackCard = document.querySelector('.back-card');
const buttonEnd = document.querySelector('.button-end')
const buttonAgain = document.querySelector('.again-button')
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');
const popupImgButtonClose = document.querySelector('.popup-img-button-close');
const timerContainer = document.querySelector('.timer');
const score = document.querySelector('.score');
const time = document.querySelector('.time');

let QUESTIONS = {};
let userResposes = [];
let questionsResult = [];
if(localStorage.session === 'true') {
    QUESTIONS = JSON.parse(localStorage.QUESTIONS);
    userResposes = JSON.parse(localStorage.userResposes);
    questionsResult = JSON.parse(localStorage.questionsResult);
}
else{
    getDataExam()
}

function getDataExam() {
    fetch('send_exam')
    .then((response) => {
      if(response.ok) {
        console.log(response)
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
      QUESTIONS = data;
      localStorage.QUESTIONS = JSON.stringify(data);
      document.querySelector('.start-test .question-number').textContent = testCardQuestion.querySelector('.test-number').textContent = `0/${Object.keys(QUESTIONS).length}`;
  }).catch(function (error) {
      alert(error)
  });
}
//const QUESTIONS = {
  //  1:{
    //    number: '1/120',
      //  picture:'/static/img/Rectangle%205.svg',
        //textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        //answersList: ['1','2','3'],
   // },
    //2:{
      //  number: '2/120',
        //picture:'/static/img/Rectangle%205.svg',
        //textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'вопрос 4', 'вопрос 5'],
        //answersList: ['1','2','3','4','5'],
    //},
    //3:{
      //  number: '3/120',
       // picture:'/static/img/Rectangle%205.svg',
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
        //picture:'/static/img/Rectangle%205.svg',
        //textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        //answersList: ['1','2','3'],
    //},
//}

popupImgButtonClose.onclick = function () {
    popupEnlargedImg.classList.add('hidden');
}

var timer = new easytimer.Timer();

if (localStorage.session === 'true') {
    startTest();
}

function startTest() {
    localStorage.session = 'true';
    timer.start({countdown: true, startValues: {minutes: localStorage.min || 10, seconds: localStorage.sec || 0}});
    timer.addEventListener('secondsUpdated', function (e) {
        timerContainer.textContent = timer.getTimeValues().toString(['minutes', 'seconds']);
        localStorage.min = timer.getTimeValues().minutes;
        localStorage.sec = timer.getTimeValues().seconds;
    });
    timer.addEventListener('targetAchieved', function () {
        finishTest();
    });

    startTestCard.classList.add('back');
    testCardQuestion.id = localStorage.cardId || '1';
    if(testCardQuestion.id === '1'){
        buttonBackCard.style.display = 'none';
    }
    else {
        buttonBackCard.style.display = 'block';
    }
    if(testCardQuestion.id === `${Object.keys(QUESTIONS).length}`) {
        buttonAnswer.style.display = 'none';
        buttonEnd.style.display = 'block'
    }
    else {
        buttonAnswer.style.display = 'block'
        buttonEnd.style.display = 'none'
    }
    const questionImg = testCardQuestion.querySelector('img');
    questionImg.src = QUESTIONS[testCardQuestion.id].picture;
    questionImg.addEventListener('click', () => {
      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = questionImg.src;
      popupEnlargedImg.classList.remove('hidden');
    });
    setTimeout(() => {
      testCardQuestion.querySelector('.test-number').textContent = `${testCardQuestion.id}/${Object.keys(QUESTIONS).length}`;
    }, 100)
    const fragment = document.createDocumentFragment();
    QUESTIONS[testCardQuestion.id].textQuestions.forEach((question, index) => {
        const elem = document.createElement('p');
        elem.classList.add('text-question')
        elem.textContent = question;
        const inputAnswer = document.createElement('input');
        inputAnswer.placeholder = 'Введите ответ';
        userResposes[testCardQuestion.id] ? inputAnswer.value = userResposes[testCardQuestion.id-1][index] : '';
        const container = document.createElement('div');
        container.classList.add('question-answer-container');
        container.appendChild(elem);
        container.appendChild(inputAnswer);
        fragment.appendChild(container)

    });
    testCardQuestion.querySelector('.description-and-answer').appendChild(fragment)
    testCardQuestion.classList.add('front');
};

function createStartTime() {
    let date = new Date();
    localStorage.startTime = date.toLocaleDateString();
}

startTestButton.addEventListener('click', startTest);
startTestButton.addEventListener('click', createStartTime)

function shouNextQuestion() {
    testCardQuestion.classList.remove('front');
    const response = testCardQuestion.querySelectorAll('input');
    const trueResponse = QUESTIONS[Number(testCardQuestion.id)].answersList;
    let flag = true;
    const responses = []
    response.forEach((resp,index) => {
        if (resp.value !== trueResponse[index]) {
            flag = false;
        }
        responses[index] = resp.value;
    })
    userResposes[Number(testCardQuestion.id)-1] = responses;
    if(flag == true) {
        questionsResult[Number(testCardQuestion.id)-1] = 1;
    }
    else {
        questionsResult[Number(testCardQuestion.id)-1] = 0;
    }
    localStorage.userResposes = JSON.stringify(userResposes);
    localStorage.questionsResult = JSON.stringify(questionsResult)
    
    setTimeout(()=>{
        testCardQuestion.classList.add('front');
        let cardId = `${Number(testCardQuestion.id) + 1}`;
        localStorage.cardId = cardId;
        testCardQuestion.id = cardId;
        if(cardId === '1'){
            buttonBackCard.style.display = 'none';
        }
        else {
            buttonBackCard.style.display = 'block';
        }
        if(cardId === `${Object.keys(QUESTIONS).length}`) {
            buttonAnswer.style.display = 'none';
            buttonEnd.style.display = 'block'
        }
        else {
            buttonAnswer.style.display = 'block'
            buttonEnd.style.display = 'none'
        }
        testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
        testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS[testCardQuestion.id].number}/${Object.keys(QUESTIONS).length}`;
        const fragment = document.createDocumentFragment();
        QUESTIONS[cardId].textQuestions.forEach((question, index) => {
            const elem = document.createElement('p');
            elem.classList.add('text-question')
            elem.textContent = question;
            const inputAnswer = document.createElement('input');
            inputAnswer.placeholder = 'Введите ответ';
            userResposes[cardId-1] ? inputAnswer.value = userResposes[cardId-1][index] : '';
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
    const response = testCardQuestion.querySelectorAll('input');
    const trueResponse = QUESTIONS[Number(testCardQuestion.id)].answersList;
    let flag = true;
    const responses = []
    response.forEach((resp,index) => {
        responses[index] = resp.value;
    })
    userResposes[Number(testCardQuestion.id)-1] = responses;
    localStorage.userResposes = JSON.stringify(userResposes);
    setTimeout(()=>{
        testCardQuestion.classList.add('front');
        let cardId = `${Number(testCardQuestion.id) - 1}`;
        testCardQuestion.id = cardId;
        localStorage.cardId = cardId;
        if(cardId === '1'){
            buttonBackCard.style.display = 'none';
        }
        else {
            buttonBackCard.style.display = 'block';
        }
        if(cardId === `${Object.keys(QUESTIONS).length}`) {
            buttonAnswer.style.display = 'none';
            buttonEnd.style.display = 'block'
        }
        else {
            buttonAnswer.style.display = 'block'
            buttonEnd.style.display = 'none'
        }
        testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
        testCardQuestion.querySelector('.test-number').textContent = `${QUESTIONS[testCardQuestion.id].number}/${Object.keys(QUESTIONS).length}`;
        const fragment = document.createDocumentFragment();
        QUESTIONS[cardId].textQuestions.forEach((question, index) => {
            const elem = document.createElement('p');
            elem.classList.add('text-question')
            elem.textContent = question;
            const inputAnswer = document.createElement('input');
            inputAnswer.placeholder = 'Введите ответ';
            inputAnswer.value = userResposes[cardId-1][index];
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

function finishTest() {
    timer.stop();
    const response = testCardQuestion.querySelectorAll('input');
    const trueResponse = QUESTIONS[Number(testCardQuestion.id)].answersList;
    let flag = true;
    const responses = []
    response.forEach((resp,index) => {
        if (resp.value !== trueResponse[index]) {
            flag = false;
        }
        responses[index] = resp.value;
    })
    userResposes[Number(testCardQuestion.id)-1] = responses;
    if(flag == true) {
        questionsResult[Number(testCardQuestion.id)-1] = 1;
    }
    else {
        questionsResult[Number(testCardQuestion.id)-1] = 0;
    }
    testCardQuestion.classList.remove('front');
    let result = questionsResult.reduce(function(a,b){
        return a+b;
    },0);
    score.textContent = `${result}/${Object.entries(QUESTIONS).length}`
    const timePassed = 600 - (+localStorage.min * 60 + +localStorage.sec)
    const minPassed = Math.floor(timePassed / 60)
    const secPassed = timePassed - minPassed * 60;
    time.textContent = `${minPassed} мин ${secPassed} сек`
    fetch('get_exam_data', {
        method: 'POST',
        body: JSON.stringify({
            startTime: localStorage.startTime,
            res: result,
            time: `${minPassed} мин ${secPassed} сек`
        }),
    }).then((response) => {
        if(!response.ok) {
            return response.statusText
        }
    }).catch((error)=>{
        alert(error);
    })
    endTestCard.classList.add('front');
    localStorage.removeItem('min');
    localStorage.removeItem('sec');
    localStorage.removeItem('session');
    localStorage.removeItem('cardId');
    localStorage.removeItem('startTime')
}

buttonEnd.addEventListener('click', finishTest);
buttonAgain.addEventListener('click', createStartTime)
buttonAgain.addEventListener('click', function() {
    endTestCard.classList.remove('front');
    testCardQuestion.querySelector('.description-and-answer').innerHTML = '';
    questionsResult.length = 0;
    userResposes.length = 0;
    getDataExam()
    startTest();
});
