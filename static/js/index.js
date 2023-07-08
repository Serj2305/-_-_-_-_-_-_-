const filterButton = document.querySelector('.signs-filter');
const filterList = document.querySelector('.filter-list');
const filtersUl = document.querySelector('.filters')
const descriptionCategory = document.querySelector('.description-category')
const buttonShouMore = document.querySelector('.button-shou-more')
const popup = document.querySelector('.popup');
const popupEnlargedImg = document.querySelector('.popup-enlarged-img');
const popupButtonClose = document.querySelector('.popup-button-close');
const popupImgButtonClose = document.querySelector('.popup-img-button-close');
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
const worldSignContainer = document.querySelector('.world-picture-container')

let MAXCARD = 10;
function appendSign(Signs) {
    Object.entries(Signs).forEach(function(sign) {
        const currentSign = signTemplate.cloneNode(true);
        currentSign.querySelector('.img-sign').src = sign[1].picture;
        //currentSign.querySelector('.description-sign').textContent = sign[1].description;
        currentSign.querySelector('.name-sign').textContent = sign[1].name;
        currentSign.querySelector('.sign-container').dataset.category = sign[1].category;
        signsContainer.appendChild(currentSign);

    });



    showMore(MAXCARD);
    buttonShouMore.onclick = function() {
        MAXCARD += 10;
        showMore(MAXCARD);
    }
}
function showMore(maxCard) {
    let currentRenderCard = 0;
    const card = document.querySelectorAll('.sign-container');
        for (let i = 0; i < card.length; i++) {
            if (currentRenderCard < maxCard) {
                card[i].classList.remove('hidden-card');
              if(!card[i].classList.contains('hidden-card-filter')) {
                  currentRenderCard+=1;
              }
              if (maxCard === card.length || maxCard > card.length) {
                  buttonShouMore.style.display = 'none';
              }
              else {
                  buttonShouMore.style.display = 'flex';
              }
            }
            else  {
                card[i].classList.add('hidden-card');
            }
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
popupImgButtonClose.onclick = function () {
    popupEnlargedImg.classList.add('hidden');
}

const FILTERS = {
    1:{
        name: 'Все знаки',
        description: '2',
        category: 'all-signs',
    },
    2:{
        name: 'Геодезические пункты',
        description: '4444214326234234',
        category: 'geodetic-points',
    },
    3:{
        name: 'Населенные пункты',
        description: '',
        category: 'localities',
    },
    4:{
        name: 'Промышленные, сельскохозяйственные и социально-культурные объекты',
        description: '11111',
        category: 'objects',
    },
    5:{
        name: 'Дорожная сеть',
        description: '123321',
        category: 'road-network',
    },
    6:{
        name: 'Гидрография и гидротехнические сооружения',
        description: '123321',
        category: 'structures',
    },
    7:{
        name: 'Растительный покров и грунты',
        description: '123321',
        category: 'vegetation-cover-and-soils',
    },
    8:{
        name: 'Границы',
        description: '123321',
        category: 'borders',
    },
    9:{
        name: 'Перечень условных сокращений',
        description: '123321',
        category: 'list-of-abbreviations',
    },
};

function appendFilters (filters) {
    Object.entries(filters).forEach(function (filter) {
        const filterItem = document.createElement('li');
        filterItem.classList.add(filter[1].category);
        filterItem.classList.add('filter-list-item');
        filterItem.textContent = filter[1].name;
        filterItem.dataset.category = filter[1].category;
        filterItem.dataset.description = filter[1].description;
        filtersUl.appendChild(filterItem);
    });
};
fetch('send_categories')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
      const filt = data;
    appendFilters(filt);
}).catch(function (error) {
      alert(error)
  });


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
              pictureSign.addEventListener('click', () => {
                      popupEnlargedImg.querySelector('.popup-img-enlarged-img').src = data[index].picture;
                      popupEnlargedImg.classList.remove('hidden');
                  });
              popupNameSign.textContent = data[index].name;
              if(data[index].pictureWorld === '/images/') {
                  worldSignContainer.style.display = 'none';
              }
              else{
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
      })
    filtersUl.childNodes.forEach((item) => {
       item.addEventListener('click', () => {
          filterButton.querySelector('span').textContent = item.textContent;
          if(item.dataset.description === '') {
              descriptionCategory.style.display = 'none';
          }
          else {
              descriptionCategory.style.display = 'block';
              descriptionCategory.textContent = item.dataset.description;
          }

          filterList.classList.add('hidden');
          for (let card of cards) {
                if (card.dataset.category !== item.dataset.category && item.dataset.category !== 'all-signs') {
                    card.classList.add('hidden-card-filter');
                } else {
                    card.classList.remove('hidden-card-filter');
                }
            }
          MAXCARD=10;
          showMore(MAXCARD);
       });
    });
}).catch(function (error) {
      alert(error)
  });

