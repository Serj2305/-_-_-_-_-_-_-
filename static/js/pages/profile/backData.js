const editButton = document.querySelector('.button-edit');
const saveButton = document.querySelector('.button-save');
const backButton = document.querySelector('.button-back');
const inputAvatar = document.querySelector('.input-avatar');

export function back_data(pr_data) {
    editButton.style.display = 'block';
    saveButton.style.display = 'none';
    backButton.style.display = 'none';
    inputAvatar.id = '';
    let editName1 = document.querySelector('.name-account');
    editName1.innerHTML = pr_data.previous_name;
    let editGroup1 = document.querySelector('.group');
    editGroup1.innerHTML = pr_data.previous_group;
    const avatar = document.querySelector('.avatar');
    avatar.src = pr_data.previous_avatar;
    avatar.classList.remove('edit')
    backButton.removeEventListener('click', back_data)
}