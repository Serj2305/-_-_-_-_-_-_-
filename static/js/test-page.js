const startTestCard = document.querySelector('.start-test');
const startTestButton = startTestCard.querySelector('.start-test-button');
const testCardQuestion = document.querySelector('.test-card-question');
const buttonAnswer = document.querySelector('.button-answer');
const testCardAnswer = document.querySelector('.test-card-answer');
const buttonResume = document.querySelector('.button-resume');
const buttonBackAnswer = document.querySelector('.back-answer');
const buttonBackCard = document.querySelector('.back-card')

const QUESTIONS = {
    1:{
        number: '1/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        answersList: ['ответ 1','ответ 2','ответ 3'],
    },
    2:{
        number: '2/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'вопрос 4', 'вопрос 5'],
        answersList: ['ответ 1','ответ 23','ответ 31'],
    },
    3:{
        number: '3/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        answersList: ['ответ 1','ответ 2','ответ 3'],
    },
    4:{
        number: '4/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        answersList: ['ответ 1','ответ 2','ответ 3'],
    },
    5:{
        number: '5/120',
        picture:'/static/img/Rectangle%205.svg',
        textQuestions: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3'],
        answersList: ['ответ 1','ответ 2','ответ 3'],
    },
}

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
    }
}
startTestButton.addEventListener('click', () => {
    startTestCard.classList.add('back');
    testCardQuestion.id = '1';
    testCardQuestion.querySelector('img').src = QUESTIONS["1"].picture;
    testCardQuestion.querySelector('.test-number').textContent = QUESTIONS["1"].number;
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
});

buttonAnswer.addEventListener('click', () => {
    testCardQuestion.classList.remove('front');
    testCardAnswer.querySelector('.test-number').textContent = ANSWERS[`${testCardQuestion.id}`].number;
    testCardAnswer.querySelector('.picture-sign').src = ANSWERS[`${testCardQuestion.id}`].pictureSign;
    testCardAnswer.querySelector('.picture-world').src = ANSWERS[`${testCardQuestion.id}`].pictureWorld;
    testCardAnswer.querySelector('.result').textContent = ANSWERS[`${testCardQuestion.id}`].result;
    testCardAnswer.querySelector('.name-sign').textContent = ANSWERS[`${testCardQuestion.id}`].nameSign;
    testCardAnswer.querySelector('.description-sign').textContent = ANSWERS[`${testCardQuestion.id}`].descriptionSign;
    testCardAnswer.classList.add('front');
});

buttonResume.addEventListener('click', () => {
    testCardAnswer.classList.remove('front');
    let cardId = `${Number(testCardQuestion.id) + 1}`;
    testCardQuestion.id = cardId;
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
    testCardQuestion.querySelector('.test-number').textContent = QUESTIONS[cardId].number;
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
});

buttonBackCard.addEventListener('click', () => {
    testCardQuestion.classList.remove('front');
    let cardId = `${Number(testCardQuestion.id) - 1}`;
    testCardQuestion.id = cardId;
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
    testCardQuestion.querySelector('.test-number').textContent = QUESTIONS[cardId].number;
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
    setTimeout(()=>testCardQuestion.classList.add('front'),300);
});

buttonBackAnswer.addEventListener('click', () => {
    testCardAnswer.classList.remove('front');
    let cardId = `${Number(testCardQuestion.id) - 1}`;
    testCardQuestion.id = cardId;
    testCardQuestion.querySelector('img').src = QUESTIONS[cardId].picture;
    testCardQuestion.querySelector('.test-number').textContent = QUESTIONS[cardId].number;
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
})