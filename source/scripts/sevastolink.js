'use strict';

const baseHeight = 800;
const baseWidth = 1024;
const loading = document.getElementById('loading');
const login = document.getElementById('login');
const loggedInLoading = document.getElementById('loggedInLoading');

function createLoadingScreen(callback) {
  const drawArea = SVG(document.createDocumentFragment());
  const rects = [];

  for (let i = 0; i < 22; i += 1) {
    for (let j = 0; j < 16; j += 1) {
      rects.push(drawArea.rect('1.5em', '1.5em').attr({ x: i * 3 + 'em', y: j * 3 + 'em', fill: '#02c45a' }));
    }
  }

  setTimeout(() => {
    loading.classList.remove('hide');
    loading.appendChild(drawArea.node);
    rects.forEach((rect) => {
      return rect.animate({ duration: 30 }).size('1.5em', '1em').delay(70).animate({ duration: 30 }).size('1.5em', '.5em').delay(70).animate({ duration: 30 }).size('1.5em', 0);
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

  });
}, 500);
