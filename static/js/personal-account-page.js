const editButton = document.querySelector('.button-edit');
const saveButton = document.querySelector('.button-save');
const backButton = document.querySelector('.button-back');
const inputAvatar = document.querySelector('.input-avatar');
editButton.addEventListener('click', edit_data);
saveButton.addEventListener('click', save_data);

let currentAvatar;


inputAvatar.onchange = function(event) {
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
    fileReader.onload = function() {
        document.querySelector('.avatar').src = fileReader.result;
    }
    fileReader.readAsDataURL(target.files[0]);
    currentAvatar = target.files[0];
}
 
function edit_data() {
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
    let editName2 = '<input type="text" value="'+editName1.innerHTML+'"id="edit_current_name"/>';
    editName1.innerHTML = '';
    editName1.insertAdjacentHTML('afterBegin', editName2);
    let editGroup1 = document.querySelector('.group');
    let editGroup2 = '<input type="text" value="'+editGroup1.innerHTML+'"id="edit_current_group"/>';
    editGroup1.innerHTML = '';
    editGroup1.insertAdjacentHTML('afterBegin', editGroup2);
    inputAvatar.id = 'fileAvatar';
    backButton.addEventListener('click', () => {
        back_data(previous_data);
    });
}
function back_data(pr_data) {
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
 
function save_data() {
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
        if(!response.ok) {
            return response.statusText
        }
    }).catch((error)=>{
        alert(error);
    })
}

function fillAccount(account) {
    document.querySelector('avatar').src = account.avatar;
    document.querySelector('name-account').textContent = account.name;
    document.querySelector('group').textContent = account.group;
}

fetch('send_account_data')
    .then((response) => {
        if(response.ok) {
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