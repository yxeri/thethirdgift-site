const cover = document.getElementById('cover');
const scan = document.getElementById('scan');
const text = document.getElementById('text');
const newText = document.getElementById('newText');

const height = window.innerHeight;
const pixelFontHeight = 13;

let counter = 0;

setTimeout(() => { scan.classList.add('play'); }, 1000);

scan.addEventListener('animationstart', () => {
});

scan.addEventListener('animationiteration', () => {
  counter += 1;

  const em = Math.ceil(counter / 2);

  if (counter % 2 === 0) {
    cover.style = `top: ${em}em; !important;`;
  } else {
    newText.style = `height: ${em}em; !important;`;
  }

  if (em * pixelFontHeight > height) {
    scan.classList.remove('play');
    counter = 0;
    cover.style = '';
  }
});
