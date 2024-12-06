import { back_data } from "./backData.js";

const editButton = document.querySelector('.button-edit');
const saveButton = document.querySelector('.button-save');
const backButton = document.querySelector('.button-back');
const inputAvatar = document.querySelector('.input-avatar');


export function save_data(currentAvatar) {
  backButton.removeEventListener('click', back_data);
  editButton.style.display = 'block';
  saveButton.style.display = 'none';
  backButton.style.display = 'none';
  inputAvatar.id = '';
  let textName1 = document.querySelector('#edit_current_name');
  let editName1 = document.querySelector('.name-account');
  editName1.innerHTML = textName1.value;
  let textGroup1 = document.querySelector('#edit_current_group');
  let editGroup1 = document.querySelector('.group');
  editGroup1.innerHTML = textGroup1.value;
  document.querySelector('.avatar').classList.remove('edit');
  backButton.removeEventListener('click', back_data)
  const formData = new FormData();
  const dataAccount = {
    name: textName1.value,
    group: textGroup1.value,
    avatar: currentAvatar
  };
  Object.entries(dataAccount).forEach(element => {
    formData.append(element[0], element[1])
  });
  fetch('get_account_data', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      return response.statusText
    }
  }).catch((error) => {
    alert(error);
  })
}