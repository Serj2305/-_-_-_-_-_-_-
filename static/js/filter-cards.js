const filterList = document.querySelectorAll('.filter-list-item');
const cards = document.querySelectorAll('.sign-container');

filterList.forEach((item)=> {
    item.addEventListener('change', () => {
        for (let card of cards) {
            if (cards.dataset.category !== item.value && item.value !== 'All-servers') {
                card.classList.add('hidden-card');
            } else {
                card.classList.remove('hidden-card');
            }
        }
    });
})

