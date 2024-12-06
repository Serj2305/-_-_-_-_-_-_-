const resultsContainer = document.querySelector('.result-list');
const resultTemplate = document.querySelector('#template-exam-result').content;

export function fillResults(results) {
    Object.entries(results).forEach(function (result, index) {
      const currentResult = resultTemplate.cloneNode(true);
      currentResult.querySelector('.number-exam').textContent = index + 1;
      currentResult.querySelector('.start-time').textContent = result[1].startTime;
      currentResult.querySelector('.time-exam').textContent = result[1].time;
      currentResult.querySelector('.assessment').textContent = result[1].res;
      if (index % 2 !== 0) {
        currentResult.querySelector('.result-list-item').style = 'background-color: #f5f5f5';
      }
      if (index === 9) {
        currentResult.querySelector('.result-list-item').style = 'border-radius: 0 0 10px 10px; background-color: #f5f5f5; '
      }
      resultsContainer.appendChild(currentResult);
    })
  }