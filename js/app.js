/*
 * Create a list that holds all of your cards
 */
 let starspopup = "3";
 let starRating = "3";
 const endMoves = document.querySelector(".end-moves")
const popup =document.querySelector(".popup");
var moves = 0;
var winMoves = 0;
const movesElement = document.querySelector(".moves");
const timeElement = document.querySelector(".time");
var counter = 0;
const openCards = [];
const container = document.querySelector(".card_container");
const cardList = [{
    symbol: "fa fa-diamond"
  },
  {
    symbol: "fa fa-paper-plane-o"
  },
  {
    symbol: "fa fa-anchor"
  },
  {
    symbol: "fa fa-bolt"
  },
  {
    symbol: "fa fa-cube"
  },
  {
    symbol: "fa fa-leaf"
  },
  {
    symbol: "fa fa-bicycle"
  },
  {
    symbol: "fa fa-bomb"
  }
];


const allCardList = cardList.concat(cardList);

container.addEventListener("click", showCard);

shuffle(allCardList);

cardMaker();


var timer = new Timer();
timer.addEventListener('secondsUpdated', function(e) {
  $('#timer').html(timer.getTimeValues().toString());
});

timer.start();
/*

 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function sRating(){
  if (moves > 0 && moves < 13) {
    starRating = starRating;
    starspopup = starspopup;
  } else if (moves >= 13 && moves <= 20) {
    $("#starOne").removeClass("fa-star");
    starRating = "2";
    $("#starOnepopup").removeClass("fa-star");
    starspopup = "2";
  } else if (moves > 20) {
    $("#starTwo").removeClass("fa-star");
    starRating = "1";
    $("#starTwopopup").removeClass("fa-star");
    starspopup ="1";
  }
}
function cardMaker() {
  const ul = document.createElement("ul")
  ul.setAttribute("class", "deck")

  for (var i = 0, z = allCardList.length; i < z; i++) {

    const li = document.createElement("li")
    li.setAttribute("class", "card")
    ul.appendChild(li);

    const ii = document.createElement("i")
    ii.setAttribute("class", allCardList[i].symbol)
    li.appendChild(ii);
  }
  container.appendChild(ul);
}

function showCard(event) {
  if (event.target.classList.contains("card")) {
    counter++;
    sRating();

    event.target.classList.toggle("show");
    event.target.classList.toggle("open");
    event.target.classList.toggle("unclickable");

    openCards.push(event.target);
    if (counter === 2) {
      movesCounter();

      if (compareCards()) {

        openCards[0].classList.add("show", "open", "unclickable");
        openCards[1].classList.add("show", "open", "unclickable");

        win();
      } else {
        setTimeout(hideOpenCards, 400);
        console.log("g")

      }
      setTimeout(removeOpenCards, 400);
      counter = 0;
    }
  }

}

function compareCards() {
  if (openCards[0].firstElementChild.classList.value === openCards[1].firstElementChild.classList.value) {
    return true;
  } else {
    return false;
  }
}

function removeOpenCards() {
  openCards.pop();
  openCards.pop();
}

function hideOpenCards() {
  openCards[0].classList.remove("show", "open", "unclickable");
  openCards[1].classList.remove("show", "open", "unclickable");
}

function movesCounter() {
  moves += 1;
  movesElement.textContent = moves;
}

$('.restart').on('click', function() {
    location.reload();
});

$('.button').on('click', function() {
    location.reload();
});
function win(){
winMoves +=1;
  if (winMoves===8){
  popup.classList.remove("hidden");
  endMoves.textContent = moves;
  timer.pause();
  $(".end-timer").html(timer.getTimeValues().seconds);
  }
}
/*{}
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
