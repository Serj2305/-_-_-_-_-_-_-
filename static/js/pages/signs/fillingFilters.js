const filtersUl = document.querySelector('.filters');

export function fillingFilters(filters) {
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