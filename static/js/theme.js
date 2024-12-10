const checkboxTheme = document.getElementById('toggle_checkbox');

let activeTheme = localStorage.getItem('theme');

if (activeTheme === 'dark-theme') {
    document.body.className = 'dark-theme';
    checkboxTheme.checked = true;
} else {
    document.body.className = 'light-theme';
    checkboxTheme.checked = false;
}

checkboxTheme.addEventListener('click', () => changeTheme())

function changeTheme() {
    const currentTheme = document.body.className;
    if (currentTheme === 'dark-theme') {
        document.body.className = 'light-theme'
        localStorage.setItem('theme', 'light-theme')
    } else {
        document.body.className = 'dark-theme'
        localStorage.setItem('theme', 'dark-theme')
    }
}