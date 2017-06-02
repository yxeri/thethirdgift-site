'use strict';

const loading = document.getElementById('loading');
const login = document.getElementById('login');
const loggedInLoading = document.getElementById('loggedInLoading');
const loadingBar = document.getElementById('loadingBar');

function createLoadingScreen(callback) {
  const drawArea = SVG(document.createDocumentFragment());
  const rects = [];
  const hideRects = [];

  for (let row = 0; row < 21; row += 1) {
    hideRects.push(drawArea.rect('64em', 0).attr({ x: 0, y: `${row * 3}em`, fill: '#011d00' }));

    for (let column = 0; column < 16; column += 1) {
      rects.push(drawArea.rect('1.5em', '1.5em').attr({ x: `${row * 3}em`, y: `${column * 3}em`, fill: '#02c45a' }));
    }
  }

  setTimeout(() => {
    loading.innerHTML = '';
    loading.classList.remove('hide');
    loading.appendChild(drawArea.node);
    hideRects.forEach((rect) => {
      rect.front();
      return rect.animate({ duration: 30 }).size('64em', '.5em').delay(70).animate({ duration: 30 }).size('64em', '1em').delay(70).animate({ duration: 30 }).size('64em', '1.5em');
    });

    setTimeout(() => {
      loading.classList.add('hide');
      callback();
    }, 300);
  }, 100);
}

setTimeout(() => {
  login.classList.add('hide');
  createLoadingScreen(() => {
    const drawArea = SVG(document.createDocumentFragment()).size('16em', '.8em');
    const rect = drawArea.rect('16em', '.8em').attr({ fill: '#011d00', stroke: '#02c45a' });
    rect.addClass('outerBar');
    drawArea
      .rect(0, '.8em')
      .attr({ fill: '#02c45a' })
      .animate({ duration: 500 })
      .size('6em', '.8em')
      .delay(500)
      .animate({ duration: 200 })
      .size('12em', '.8em')
      .delay(300)
      .animate({ duration: 700 })
      .size('15em', '.8em')
      .delay(800)
      .animate({ duration: 50 })
      .size('16em', '.8em');

    loggedInLoading.classList.remove('hide');
    loadingBar.appendChild(drawArea.node);

    setTimeout(() => {
      loggedInLoading.classList.add('hide');
      createLoadingScreen(() => {

      });
    }, 3200)
  });
}, 2000);
