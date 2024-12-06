import { edit_data } from "./editData.js";
import { save_data } from "./saveData.js";
import { fillAccount } from "./fillAccount.js";
import { fillResults } from "./fillResults.js";
import { changeRating } from "./changeRating.js";

const editButton = document.querySelector('.button-edit');
const saveButton = document.querySelector('.button-save');
const inputAvatar = document.querySelector('.input-avatar');
const form = document.getElementById('form-feedback');
const formBackButton = document.querySelector('.form-button-back');
const formButton = document.querySelector('.button-form');
const popup = document.querySelector('#popup');
const circles = document.querySelectorAll('.circle');


editButton.addEventListener('click', edit_data);
saveButton.addEventListener('click', () => save_data(currentAvatar));

let currentAvatar;


inputAvatar.onchange = function (event) {
  var target = event.target;

  if (!FileReader) {
    alert('FileReader не поддерживается — облом');
    return;
  }

  if (!target.files.length) {
    alert('Ничего не загружено');
    return;
  }

  var fileReader = new FileReader();
  fileReader.onload = function () {
    document.querySelector('.avatar').src = fileReader.result;
  }
  fileReader.readAsDataURL(target.files[0]);
  currentAvatar = target.files[0];
}


fetch('send_account_data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    fillAccount(data);
  })
  .catch(function (error) {
    alert(error)
  });


fetch('send_exam_data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    fillResults(data);
  })
  .catch(function (error) {
    alert(error);
  });


formButton.onclick = () => {
  popup.style = 'display:block;';
  form.querySelector('#email').value = document.querySelector('.your-email').textContent;
  form.querySelector('#name').value = document.querySelector('.name-account').textContent;
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
