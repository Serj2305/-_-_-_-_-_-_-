const startTestCard = document.querySelector('.start-test');
const startTestButton = startTestCard.querySelector('.start-test-button');

startTestButton.addEventListener('click', () => {
    startTestCard.classList.add('start-test-active')
})