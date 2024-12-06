import { fillingSigns } from "./fillingSigns.js";
import { fillingFilters } from "./fillingFilters.js";
import { openCard } from "./openCard.js";
import { changeActiveFilter } from "./activeFilter.js";

const filterButton = document.querySelector('.signs-filter');
const filterList = document.querySelector('.filter-list');
const filtersUl = document.querySelector('.filters');
const popup = document.querySelector('.popup');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');
const popupButtonClose = document.querySelector('.popup-button-close');
const popupImgButtonClose = document.querySelector('.popup-img-button-close');


filterButton.addEventListener('click', () => {
  if (filterList.classList.contains('hidden')) {
    filterList.classList.remove('hidden');
  }
  else {
    filterList.classList.add('hidden');
  }
});

popupButtonClose.onclick = function () {
  popup.classList.add('hidden');
}

popupImgButtonClose.onclick = function () {
  popupEnlargedImg.classList.add('hidden');
}

fetch('send_categories')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    const filt = data;
    fillingFilters(filt);
  }).catch(function (error) {
    alert(error)
  });


fetch('send_signs')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    fillingSigns(data);
    const signsArray = [];
    Object.entries(data).forEach(function (sign) {
      signsArray.push(sign[1])
    });
    return signsArray;

  }).then((data) => {
    const cards = document.querySelectorAll('.sign-container');
    cards.forEach((card, index) => {
      openCard(card, index, data)
    })
    filtersUl.childNodes.forEach((item) => {
      changeActiveFilter(item, cards);
    });
  }).catch(function (error) {
    alert(error)
  });

