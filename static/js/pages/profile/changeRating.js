const circles = document.querySelectorAll('.circle');
const inputRating = document.querySelector('.rating-input')

export function changeRating(numb) {
    let color;
    if (numb < 3) color = 'red';
    else if (numb < 7) color = 'orange';
    else color = 'green';
    circles.forEach(circle => circle.className = 'circle')
  
    for (let i = 0; i < numb; i++) {
      circles[i].className = 'circle ' + color;
    }
    inputRating.value = numb;
  }