const testCardQuestion = document.querySelector('.test-card-question');

export async function getDataExam() {
    let QUESTIONS = {}
    await fetch('send_exam')
      .then((response) => {
        if (response.ok) {
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
    return QUESTIONS
  }