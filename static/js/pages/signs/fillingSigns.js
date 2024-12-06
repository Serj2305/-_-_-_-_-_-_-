const signTemplate = document.querySelector('#sign').content;
const signsContainer = document.querySelector('.signs-container');
const buttonShouMore = document.querySelector('.button-shou-more');
import { showMore } from "./showMore.js";

let MAXCARD = 10;
export function fillingSigns(Signs) {
  Object.entries(Signs).forEach(function (sign) {
    const currentSign = signTemplate.cloneNode(true);
    currentSign.querySelector('.img-sign').src = sign[1].picture;
    //currentSign.querySelector('.description-sign').textContent = sign[1].description;
    currentSign.querySelector('.name-sign').textContent = sign[1].name;
    currentSign.querySelector('.sign-container').dataset.category = sign[1].category;
    signsContainer.appendChild(currentSign);
  });

  showMore(MAXCARD);
  buttonShouMore.onclick = function () {
    MAXCARD += 10;
    showMore(MAXCARD);
  }
}
