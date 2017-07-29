const tag = document.createElement('script');
const firstScriptTag = document.getElementsByTagName('script')[0];
const playerWrapper = document.getElementById('playerWrapper');
const playerBottom = document.getElementById('playerBottom');
const playerInnerWrapper = document.getElementById('playerInnerWrapper');
const idInput = document.getElementById('idInput');
const idButton = document.getElementById('idButton');
let player;
let hasStarted = false;
tag.src = 'https://www.youtube.com/iframe_api';
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

playerWrapper.addEventListener('click', (event) => {
  event.stopPropagation();
});

idButton.addEventListener('click', () => {
  console.log('click');
  playingChosen();
});

function playingChosen() {
  if (!hasStarted) {
    const videoId = idInput.value;
    idInput.value = '';
    player.loadVideoById(videoId);
  }
}

function onPlayerReady() {
  console.log('ready');
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    if (!hasStarted) {
      player.pauseVideo();

      setTimeout(() => {
        player.playVideo();
        playerInnerWrapper.classList.remove('hide');
        playerBottom.classList.remove('hide');

        setTimeout(() => {
          playerBottom.classList.add('hide');
        }, 3000)
      }, 500);

      hasStarted = true;
    }
  } else if (event.data === YT.PlayerState.ENDED) {
    hasStarted = false;
    playerInnerWrapper.classList.add('hide');
  }
}

window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('player', {
    height: 405,
    width: 720,
    playerVars: {
      'autoPlay': 1,
      'controls': 0,
      'disablekb': 1,
      'enablejsapi': 1,
      'fs': 0,
      'modestbranding': 1,
      'rel': 0,
      'showinfo': 0,
      'iv_load_polacy': 3,
      'frameborder': 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    }
  });
};
