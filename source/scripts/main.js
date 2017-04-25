'use strict';

const contentElements = document.getElementById('main').children;
let latestContentElement = contentElements[0];
let collapsedElement;
let startTouchTime;
let touchX;
let touchY;
let touchDiff;
let oneDirectionSwipe;

function expandElement(element) {
  element.classList.remove('collapse');
  element.classList.add('expand');
}

function collapseElement(element) {
  element.classList.remove('expand');
  element.classList.add('collapse');
}

function expandAndCollapse(previousElement, newElement) {
  if (collapsedElement) {
    collapsedElement.classList.remove('collapse');
  }

  history.replaceState({}, '', `#${newElement.id}`);
  collapseElement(previousElement);
  expandElement(newElement);
  newElement.scrollIntoView(true);
  collapsedElement = previousElement;
  latestContentElement = newElement;
}

function attachClickListener(element) {
  const contentClickListener = (event) => {
    const clickedElement = event.currentTarget;

    if (latestContentElement !== clickedElement) {
      expandAndCollapse(latestContentElement, clickedElement);
    }
  };

  element.addEventListener('click', contentClickListener);
}

function selectPreviousContent() {
  const elementIndex = Array.prototype.indexOf.call(contentElements, latestContentElement);
  const newElementIndex = elementIndex - 1;

  if (elementIndex > 0 && newElementIndex >= 0) {
    expandAndCollapse(latestContentElement, contentElements[newElementIndex]);
  }
}

function selectNextContent() {
  const elementIndex = Array.prototype.indexOf.call(contentElements, latestContentElement);
  const elementsLength = contentElements.length - 1;
  const newElementIndex = elementIndex + 1;

  if (elementIndex < elementsLength && newElementIndex <= elementsLength) {
    expandAndCollapse(latestContentElement, contentElements[newElementIndex]);
  }
}

function isLandscapeMode() {
  return window.innerWidth > window.innerHeight;
}

function start() {
  for (let i = 0; i < contentElements.length; i++) {
    attachClickListener(contentElements[i]);
  }

  addEventListener('keydown', (event) => {
    const keyCode = typeof event.which === 'number' ? event.which : event.keyCode;

    switch (keyCode) {
      // Left arrow
      case 37: {
        if (isLandscapeMode()) {
          selectPreviousContent();
        }

        break;
      }
      // Up arrow
      case 38:
        if (!isLandscapeMode()) {
          selectPreviousContent();
        }

        break;
      // Right arrow
      case 39: {
        if (isLandscapeMode()) {
          selectNextContent();
        }

        break;
      }
      // Down arrow
      case 40:
        if (!isLandscapeMode()) {
          selectNextContent();
        }

        break;
      default:
        break;
    }
  });

  addEventListener('touchstart', (event) => {
    startTouchTime = new Date();
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
    touchDiff = 0;
    oneDirectionSwipe = true;
  });

  addEventListener('touchmove', (event) => {
    const touchXDiff = touchX - event.touches[0].clientX;
    const touchYDiff = touchY - event.touches[0].clientY;

    if (Math.abs(touchXDiff) < Math.abs(touchDiff) || Math.abs(touchYDiff) > 20) {
      oneDirectionSwipe = false;
    }

    touchDiff = touchXDiff;
  });

  addEventListener('touchend', () => {
    const endTouchTime = new Date();

    if (oneDirectionSwipe && Math.abs(touchDiff) > 50 && endTouchTime.getSeconds() - startTouchTime.getSeconds() <= 1) {
      if (touchDiff > 0) {
        selectNextContent();
      } else {
        selectPreviousContent();
      }
    }
  });

  addEventListener('orientationchange', () => {
    latestContentElement.scrollIntoView(true);
  });

  if (location.hash.length > 1) {
    latestContentElement = Array.prototype.find.call(contentElements, element => element.id === location.hash.slice(1));
  }

  expandElement(latestContentElement);
}

start();
