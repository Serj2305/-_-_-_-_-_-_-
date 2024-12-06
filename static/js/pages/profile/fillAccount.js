const buttonDownload = document.querySelector('.button-download');

export function fillAccount(account) {
    document.querySelector('.name-account').textContent = account.name;
    document.querySelector('.group').textContent = account.group;
    document.querySelector('.avatar').src = account.avatar;
    document.querySelector('.your-email').textContent = account.email;
    if (account.is_superuser !== 'True') {
      buttonDownload.remove();
      document.querySelector('.role').textContent = 'Студент';
    }
  }