import { showMore } from "./showMore.js";

const descriptionCategory = document.querySelector('.description-category');
const buttonShouMore = document.querySelector('.button-shou-more');
const buttonDownloadFile = document.querySelector('.button-download-file');
const filterButton = document.querySelector('.signs-filter');
const filterList = document.querySelector('.filter-list');

export function changeActiveFilter(item, cards) {
  item.addEventListener('click', () => {
    filterButton.querySelector('span').textContent = item.textContent;
    if (item.dataset.description === '') {
      descriptionCategory.style.display = 'none';
    }
    else {
      descriptionCategory.style.display = 'block';
      descriptionCategory.textContent = item.dataset.description;
    }
    if (item.dataset.category === 'abbreviations') {
      buttonDownloadFile.classList.remove('hidden');
      buttonShouMore.classList.add('hidden')
    }
    else {
      buttonShouMore.classList.remove('hidden');
      buttonDownloadFile.classList.add('hidden');
    }

    filterList.classList.add('hidden');
    for (let card of cards) {
      if (card.dataset.category !== item.dataset.category && item.dataset.category !== 'all-signs') {
        card.classList.add('hidden-card-filter');
      } else {
        card.classList.remove('hidden-card-filter');
      }
    }

    showMore(10);
  });
}