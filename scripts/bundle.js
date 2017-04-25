(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var contentElements = document.getElementById('main').children;
var latestContentElement = contentElements[0];
var collapsedElement = void 0;
var startTouchTime = void 0;
var touchX = void 0;
var touchY = void 0;
var touchDiff = void 0;
var oneDirectionSwipe = void 0;

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

  history.replaceState({}, '', '#' + newElement.id);
  collapseElement(previousElement);
  expandElement(newElement);
  newElement.scrollIntoView(true);
  collapsedElement = previousElement;
  latestContentElement = newElement;
}

function attachClickListener(element) {
  var contentClickListener = function contentClickListener(event) {
    var clickedElement = event.currentTarget;

    if (latestContentElement !== clickedElement) {
      expandAndCollapse(latestContentElement, clickedElement);
    }
  };

  element.addEventListener('click', contentClickListener);
}

function selectPreviousContent() {
  var elementIndex = Array.prototype.indexOf.call(contentElements, latestContentElement);
  var newElementIndex = elementIndex - 1;

  if (elementIndex > 0 && newElementIndex >= 0) {
    expandAndCollapse(latestContentElement, contentElements[newElementIndex]);
  }
}

function selectNextContent() {
  var elementIndex = Array.prototype.indexOf.call(contentElements, latestContentElement);
  var elementsLength = contentElements.length - 1;
  var newElementIndex = elementIndex + 1;

  if (elementIndex < elementsLength && newElementIndex <= elementsLength) {
    expandAndCollapse(latestContentElement, contentElements[newElementIndex]);
  }
}

function isLandscapeMode() {
  return window.innerWidth > window.innerHeight;
}

function start() {
  for (var i = 0; i < contentElements.length; i++) {
    attachClickListener(contentElements[i]);
  }

  addEventListener('keydown', function (event) {
    var keyCode = typeof event.which === 'number' ? event.which : event.keyCode;

    switch (keyCode) {
      // Left arrow
      case 37:
        {
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
      case 39:
        {
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

  addEventListener('touchstart', function (event) {
    startTouchTime = new Date();
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
    touchDiff = 0;
    oneDirectionSwipe = true;
  });

  addEventListener('touchmove', function (event) {
    var touchXDiff = touchX - event.touches[0].clientX;
    var touchYDiff = touchY - event.touches[0].clientY;

    if (Math.abs(touchXDiff) < Math.abs(touchDiff) || Math.abs(touchYDiff) > 20) {
      oneDirectionSwipe = false;
    }

    touchDiff = touchXDiff;
  });

  addEventListener('touchend', function () {
    var endTouchTime = new Date();

    if (oneDirectionSwipe && Math.abs(touchDiff) > 50 && endTouchTime.getSeconds() - startTouchTime.getSeconds() <= 1) {
      if (touchDiff > 0) {
        selectNextContent();
      } else {
        selectPreviousContent();
      }
    }
  });

  addEventListener('orientationchange', function () {
    latestContentElement.scrollIntoView(true);
  });

  if (location.hash.length > 1) {
    latestContentElement = Array.prototype.find.call(contentElements, function (element) {
      return element.id === location.hash.slice(1);
    });
  }

  expandElement(latestContentElement);
}

start();

},{}]},{},[1]);
