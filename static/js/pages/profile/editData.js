import { back_data } from "./backData.js";

const editButton = document.querySelector('.button-edit');
const saveButton = document.querySelector('.button-save');
const backButton = document.querySelector('.button-back');
const inputAvatar = document.querySelector('.input-avatar');

export function edit_data() {
  editButton.style.display = 'none';
  saveButton.style.display = 'block';
  backButton.style.display = 'block';
  const avatar = document.querySelector('.avatar');
  avatar.classList.add('edit');
  const previous_data = {
    previous_name: document.querySelector('.name-account').textContent,
    previous_group: document.querySelector('.group').textContent,
    previous_avatar: avatar.src,
  }
  let editName1 = document.querySelector('.name-account');
  let editName2 = '<input type="text" value="' + editName1.innerHTML + '"id="edit_current_name"/>';
  editName1.innerHTML = '';
  editName1.insertAdjacentHTML('afterBegin', editName2);
  let editGroup1 = document.querySelector('.group');
  let editGroup2 = '<input type="text" value="' + editGroup1.innerHTML + '"id="edit_current_group"/>';
  editGroup1.innerHTML = '';
  editGroup1.insertAdjacentHTML('afterBegin', editGroup2);
  inputAvatar.id = 'fileAvatar';
  backButton.addEventListener('click', () => {
    back_data(previous_data);
  });
}