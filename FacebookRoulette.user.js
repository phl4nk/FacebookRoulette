// ==UserScript==
// @name        FacebookRoulette
// @namespace phl4nkSpace
// @include   https://www.facebook.com/*
// @include   https://m.facebook.com/*
// @noframes
// @description Randomly choose a site when requesting facebook.com. User has a 1/20 chance to allow facebook for 30 minutes.
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

// Date: 3/04/17
// Author: phl4nk
// TODO: log the user out of facebook(?)
// TODO: retrieve URL list remotely

var faceChance = 20;
var faceTimeout = 30;
var URLlist = [
  'https://google.com',
  'https://www.scientificamerican.com/',
  'http://www.bbc.co.uk/news/science_and_environment',
  'https://www.reddit.com/r/technology/',
  'https://slashdot.org/',
  'http://www.thisiswhyimbroke.com/',
  'https://www.isitnormal.com/',
  'https://en.wikipedia.org/wiki/Special:Random',
  'https://www.reddit.com/r/random/',
  'https://www.theuselessweb.com/'
];

window.addEventListener('load', roulette, false);

function roulette() {
  var timeLeft = checkDate();
  if (timeLeft > 0) {
    // you have some precious time...
    // allow facebook but display timeLimit banner
    alert('You have time: ' + timeLeft);
    return true;
  }
  
  // Time to play some roulette
  var bullet = spin(faceChance - 1);
  alert('Roulette Number: ' + bullet);
  if (bullet == 0) {
    alert('You got lucky!');
    // here, have some crack
    setDate(faceTimeout);
    return true;
  } 

  //no crack for you
  window.location.replace(URLlist[spin(URLlist.length-1)]);
}

// returns a random number between 0->(total)
function spin(total) {
  var ran = Math.floor(Math.random() * total);
  return ran;
}

// checks the storage for rouletteTimer
// returns the amount of seconds left
function checkDate() {
  var time = new Date().getTime();
  var rouletteTimer = GM_getValue('rouletteTimer')
  if (!rouletteTimer) {
    // first run... awww
    setDate(-1);
  };
  //time in seconds
  var timeLeft = Math.floor((rouletteTimer - time) / 1000);
  return timeLeft;
}

//sets the storage to current date+timeout.
function setDate(timeout) {
  var timeoutMillie = timeout * 1000 * 60;
  var time = new Date().getTime() + timeoutMillie;
  GM_setValue('rouletteTimer', time.toString());
}
