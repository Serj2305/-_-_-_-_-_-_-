const buttonShouMore = document.querySelector('.button-shou-more');

export function showMore(maxCard) {
    let currentRenderCard = 0;
    const card = document.querySelectorAll('.sign-container');
    for (let i = 0; i < card.length; i++) {
      if (currentRenderCard < maxCard) {
        card[i].classList.remove('hidden-card');
        if (!card[i].classList.contains('hidden-card-filter')) {
          currentRenderCard += 1;
        }
        if (maxCard === card.length || maxCard > card.length) {
          buttonShouMore.style.display = 'none';
        }
        else {
          buttonShouMore.style.display = 'flex';
        }
      }
      else {
        card[i].classList.add('hidden-card');
      }
    }
  }