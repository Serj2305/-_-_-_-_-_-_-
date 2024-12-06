const pictureSign = document.querySelector('.picture-sign');
const worldSign = document.querySelector('.world-sign');
const popupNameSign = document.querySelector('.popup-name-sign');
const popupDescriptionSign = document.querySelector('.popup-description-sign');
const worldSignContainer = document.querySelector('.world-picture-container');
const popup = document.querySelector('.popup');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');


export function openCard(card, index, data) {
    card.onclick = () => {
        pictureSign.src = data[index].picture;
        pictureSign.addEventListener('click', () => {
          popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = data[index].picture;
          popupEnlargedImg.classList.remove('hidden');
        });
        popupNameSign.textContent = data[index].name;
        if (data[index].pictureWorld === '/media/images/') {
          worldSignContainer.style.display = 'none';
        }
        else {
          worldSignContainer.style.display = 'block';
          worldSign.src = data[index].pictureWorld;
          worldSign.addEventListener('click', () => {
            popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = data[index].pictureWorld;
            popupEnlargedImg.classList.remove('hidden');
          });
        }
        popupDescriptionSign.textContent = data[index].description;

        popup.classList.remove('hidden');
      }
}