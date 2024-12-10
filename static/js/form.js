import { changeRating } from "./changeRating.js";

const form = document.getElementById('form-feedback');
const formBackButton = document.querySelector('.form-button-back');
const formButton = document.querySelector('.button-form');
const popup = document.querySelector('#popup');
const circles = document.querySelectorAll('.circle');

formButton.onclick = () => {
  popup.style = 'display:block;';
}

circles.forEach((circle) => circle.addEventListener('click', () => changeRating(+circle.dataset.value)))


formBackButton.onclick = () => {
  popup.style = 'display:none';
  form.reset()
}

form.onsubmit = (e) => {
  e.preventDefault()
  fetch('send_to_email', {
    method: 'POST',
    body: new FormData(form)
  }).then((response) => {
    if (!response.ok) {
      return response.statusText
    }
    else {
      popup.style = 'display:none';
    }
  }).catch((error) => {
    alert(error);
  })
  popup.style = 'display:none';
  form.reset()
}