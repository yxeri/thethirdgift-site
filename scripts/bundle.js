(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var basePosition = 800;
var paragraphs = document.getElementsByTagName('P');

for (var i = 0; i < paragraphs.length; i += 1) {
  var paragraph = paragraphs[i];
  paragraph.firstElementChild.classList.add('hide');
  paragraph.setAttribute('id', 'paragraph_' + i);
}

var lines = Array.from(paragraphs).map(function (paragraph) {
  var draw = SVG(paragraph.getAttribute('id')).size(basePosition - 1, '1.7em');
  var line = draw.rect('1em', '.4em').attr({ x: basePosition, y: '.7em', fill: '#d2fed3' });

  return { drawArea: draw, paragraph: paragraph, line: line, text: paragraph.firstElementChild.innerText };
});

setTimeout(function () {
  animate(lines);
}, 1000);

function animate(lines) {
  if (lines && lines.length > 0) {
    var lineObj = lines.shift();
    var lineAnimationSpeed = lineObj.paragraph.firstElementChild.clientWidth * 2;
    var lineLength = lineObj.paragraph.firstElementChild.clientWidth;

    lineObj.line.animate({ duration: 150, ease: '-' }).width(basePosition).move(0, '.7em').queue(function () {
      var marker = lineObj.drawArea.rect('.2em', '1.7em').attr({ x: 0, y: 0, fill: '#d2fed3' });

      marker.animate({ duration: lineAnimationSpeed, ease: '-' }).move(lineLength, 0).once(1, function () {
        marker.addClass('hide');
      });

      lineObj.line.attr({ y: 0 }).height('1.7em');
      lineObj.line.style({ fill: '#000000' });
      lineObj.paragraph.firstElementChild.classList.remove('hide');
      lineObj.line.fx.dequeue();
    }).animate({ duration: lineAnimationSpeed + 20, ease: '-' }).size(0, '1.5em').move(lineLength, 0).delay(300).queue(function () {
      lineObj.line.fx.dequeue();
      animate(lines);
    });
  }
}

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
module.exports={
  "cards": [
    {
      "name": "Tear Gas",
      "type": "Action",
      "subType": "Action",
      "description": [
        "Discard cards from the top of your Inventory until you discard a Weapon.",
        "If you Discarded a Weapon, your character, your character deals an additional 10 Damage during this turn for each card you Discarded."
      ],
      "unique": false,
      "cost": 70,
      "trashAfterUse": false,
      "ammoRequirement": {
        "minimum": 0,
        "isAdjustable": false
      },
      "damage": {
        "minimum": 30,
        "isAdjustable": true
      },
      "extra": {
        "actions": {
          "amount": 1,
          "guaranteed": true
        },
        "buys": {
          "amount": 0,
          "guaranteed": false
        },
        "explores": {
          "amount": 0,
          "guaranteed": false
        }
      },
      "tags": ["weaponFinder"]
    }, {
      "name": "Msater of Unlocking",
      "type": "Action",
      "subType": "Action",
      "description": [
        "Each other Player Reveals the top card of their Inventory.",
        "You can gain 1 of the Revealed Weapons.",
        "All of the other Revealed cards are discarded afterwards."
      ],
      "unique": false,
      "cost": 30,
      "trashAfterUse": false,
      "ammoRequirement": {
        "minimum": 0,
        "isAdjustable": false
      },
      "damage": {
        "minimum": 0,
        "isAdjustable": false
      },
      "extra": {
        "actions": {
          "amount": 1,
          "guaranteed": true
        },
        "buys": {
          "amount": 0,
          "guaranteed": false
        },
        "explores": {
          "amount": 0,
          "guaranteed": false
        }
      },
      "tags": ["pvp", "cardStealer"]
    }, {
      "name": "Uroboros Injection",
      "type": "Action",
      "subType": "Action",
      "description": [
        "During another Player's turn, when an Infected is Revealed, you can Trash this card from your hand to give it +20 Health to any Revealed Infected during this turn."
      ],
      "unique": false,
      "cost": 60,
      "trashAfterUse": false,
      "ammoRequirement": {
        "minimum": 0,
        "isAdjustable": false
      },
      "damage": {
        "minimum": 0,
        "isAdjustable": false
      },
      "extra": {
        "actions": {
          "amount": 2,
          "guaranteed": true
        },
        "buys": {
          "amount": 1,
          "guaranteed": true
        },
        "explores": {
          "amount": 0,
          "guaranteed": false
        }
      },
      "tags": ["pvp", "enemyBooster"]
    }, {
      "name": "The Gathering Darkness",
      "type": "Action",
      "subType": "Action",
      "description": [
        "Trash this card and choose another Player.",
        "That Player Reveals their Hand and Trashes an Ammunition with the higehst cost from their Hand.",
        "That Player moves 1 \"Ammo x10\" Ammunition to their hand for every 10 ammo the Trashed card provided."
      ],
      "unique": false,
      "cost": 50,
      "trashAfterUse": true,
      "ammoRequirement": {
        "minimum": 0,
        "isAdjustable": false
      },
      "damage": {
        "minimum": 0,
        "isAdjustable": false
      },
      "extra": {
        "actions": {
          "amount": 0,
          "guaranteed": false
        },
        "buys": {
          "amount": 0,
          "guaranteed": false
        },
        "explores": {
          "amount": 0,
          "guaranteed": false
        }
      },
      "tags": ["pvp", "deckDiluter"]
    }, {
      "name": "The Gathering Darkness",
      "type": "Action",
      "subType": "Action",
      "description": [
        "Choose another Player.",
        "That Player Reveales their hand and you select and Discard a Weapon from it (if any).",
        "Your Character deals and additional X Damage during this turn, where X = the damage of the Discarded Weapon."
      ],
      "unique": false,
      "cost": 70,
      "trashAfterUse": false,
      "ammoRequirement": {
        "minimum": 0,
        "isAdjustable": false
      },
      "damage": {
        "minimum": 0,
        "isAdjustable": false
      },
      "extra": {
        "actions": {
          "amount": 0,
          "guaranteed": false
        },
        "buys": {
          "amount": 0,
          "guaranteed": false
        },
        "explores": {
          "amount": 0,
          "guaranteed": false
        }
      },
      "tags": ["pvp", "weaponBooster"]
    }
  ]
}

},{}]},{},[1,2,3]);
