const topArticles = document.getElementsByClassName('topArticle');
const topSections = document.getElementsByClassName('topSection');
const allHeaders = document.getElementsByTagName('header');

function collapseElements({ elements }) {
 for (let i = 0; i < elements.length; i++) {
   elements[i].classList.add('collapse');
 }
}

function addClickListener({ elements }) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    element.addEventListener('click', () => {
      element.parentElement.classList.toggle('collapse');
    });
  }
}

collapseElements({ elements: topArticles });
collapseElements({ elements: topSections });
addClickListener({ elements: allHeaders });
