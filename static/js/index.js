const filterButton = document.querySelector('.signs-filter');
const filterList = document.querySelector('.filter-list');
const filterListItems = document.querySelectorAll('.filter-list-item');
const buttonShouMore = document.querySelector('.button-shou-more')
const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup-button-close');
const SIGNS = {
    sign1:{
        name: 'Name1',
        description: 'аоаооаоаоаоаоа аоаоаоаоаоао аоаоаоаоа аоаоаооаао аоаоаоаооа оааооаоа пум пум пум аоаоаоаоа аоаоаоаа аоо ао ао оа оао аооаоаоао аоао оа',
        picture: '/static/img/Rectangle%205.svg'
    },
    sign2:{
        name: 'Name2',
        description: 'аоаооаоаоаоаоа аоаоаоаоаоао аоаоаоаоа аоаоаооаао аоаоаоаооа оааооаоа пум пум пум аоаоаоаоа аоаоаоаа аоо ао ао оа оао аооаоаоао аоао оа',
        picture: '/static/img/Rectangle%205.svg'
    },
    sign3:{
        name: 'Name3',
        description: 'аоаооаоаоаоаоа аоаоаоаоаоао аоаоаоаоа аоаоаооаао аоаоаоаооа оааооаоа пум пум пум аоаоаоаоа аоаоаоаа аоо ао ао оа оао аооаоаоао аоао оа',
        picture: '/static/img/Rectangle%205.svg'
    },
    sign4:{
        name: 'Name4',
        description: 'аоаооаоаоаоаоа аоаоаоаоаоао аоаоаоаоа аоаоаооаао аоаоаоаооа оааооаоа пум пум пум аоаоаоаоа аоаоаоаа аоо ао ао оа оао аооаоаоао аоао оа',
        picture: '/static/img/Rectangle%205.svg'
    },
    sign5:{
        name: 'Name5',
        description: 'аоаооаоаоаоаоа аоаоаоаоаоао аоаоаоаоа аоаоаооаао аоаоаоаооа оааооаоа пум пум пум аоаоаоаоа аоаоаоаа аоо ао ао оа оао аооаоаоао аоао оа',
        picture: '/static/img/Rectangle%205.svg'
    },
    sign6:{
        name: 'Name6',
        description: 'аоаооаоаоаоаоа аоаоаоаоаоао аоаоаоаоа аоаоаооаао аоаоаоаооа оааооаоа пум пум пум аоаоаоаоа аоаоаоаа аоо ао ао оа оао аооаоаоао аоао оа',
        picture: '/static/img/Rectangle%205.svg'
    },
    sign7:{
        name: 'Name7',
        description: 'аоаооаоаоаоаоа аоаоаоаоаоао аоаоаоаоа аоаоаооаао аоаоаоаооа оааооаоа пум пум пум аоаоаоаоа аоаоаоаа аоо ао ао оа оао аооаоаоао аоао оа',
        picture: '/static/img/Rectangle%205.svg'
    }
}



const signsContainer = document.querySelector('.signs-container');
const signTemplate = document.querySelector('#sign').content;
const pictureSign = document.querySelector('.picture-sign');
const worldSign = document.querySelector('.world-sign');
const popupNameSign = document.querySelector('.popup-name-sign');
const popupDescriptionSign = document.querySelector('.popup-description-sign');


function appendSign(Signs) {
    const fragment = document.createDocumentFragment();
    Object.entries(Signs).forEach(function(sign) {
        const currentSign = signTemplate.cloneNode(true);
        currentSign.querySelector('.img-sign').src = sign[1].picture;
        //currentSign.querySelector('.description-sign').textContent = sign[1].description;
        currentSign.querySelector('.name-sign').textContent = sign[1].name;
        currentSign.querySelector('.sign-container').dataset.category = sign[1].category;
        fragment.appendChild(currentSign);

    });
    signsContainer.appendChild(fragment);
    const card = document.querySelectorAll('.sign-container');
    let maxCard = 10;
    function showMore(maxCard) {
        for (let i = 0; i < card.length; i++) {
            if (i < maxCard) {
                card[i].classList.remove('hidden-card');
              if (maxCard === card.length || maxCard > card.length) {
                  buttonShouMore.style.display = 'none';
              }
            } else  {
                break;
            }
          }
        }
    showMore(maxCard);
    buttonShouMore.onclick = function() {
        maxCard += 10;
        showMore(maxCard);
    }
}



filterButton.addEventListener('click', () => {
    if(filterList.classList.contains('hidden'))
        {
            filterList.classList.remove('hidden');
        }
    else {
        filterList.classList.add('hidden');
    }
});

const openPopup = (sign) => {
    pictureSign.src = sign[1].picture;
    worldSign.src = '/static/img/Rectangle%205.svg';
    popupNameSign.textContent = sign[1].name;
    popupDescriptionSign.textContent = sign[1].description;
    popup.classList.remove('hidden');
}

popupButtonClose.onclick = function () {
    popup.classList.add('hidden');
}


fetch('send')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    appendSign(data);
    const signsArray = [];
    Object.entries(data).forEach(function(sign) {
        signsArray.push(sign[1])
    });
    return signsArray;

  }).then((data) => {
      const cards = document.querySelectorAll('.sign-container');
      cards.forEach((card,index) => {
          card.onclick = () => {
              pictureSign.src = data[index].picture;
              worldSign.src = '/static/img/Rectangle%205.svg';
              popupNameSign.textContent = data[index].name;
              popupDescriptionSign.textContent = data[index].description;
              popup.classList.remove('hidden');
          }
      })
    filterListItems.forEach((item) => {
       item.addEventListener('click', () => {
          filterButton.querySelector('span').textContent = item.textContent;
          filterList.classList.add('hidden');
          for (let card of cards) {
                if (card.dataset.category !== item.dataset.category && item.dataset.category !== 'all-signs') {
                    card.classList.add('hidden-card');
                } else {
                    card.classList.remove('hidden-card');
                }
            }
       });
    });
}).catch(function (error) {
      alert(error)
  });

