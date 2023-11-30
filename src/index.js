const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);
let cardLock = false;
memoryGame.shuffleCards();

window.addEventListener("load", (event) => {
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      // TODO: write some code here
      if (memoryGame.pickedCards.length < 2) {
        card.classList.add("turned");
        memoryGame.pickedCards.push(card);
      } //added locking condition to ensure this function only runs once until array is cleared
      if (memoryGame.pickedCards.length === 2 && cardLock === false) {
        cardLock = true;
        let isPair = memoryGame.checkIfPair(
          memoryGame.pickedCards[0].dataset.cardName,
          memoryGame.pickedCards[1].dataset.cardName
        );
        if (isPair) {
          memoryGame.pickedCards[0].classList.add("blocked");
          memoryGame.pickedCards[1].classList.add("blocked");
        } else {
          setTimeout(() => {
            memoryGame.pickedCards[0].classList.remove("turned");
            memoryGame.pickedCards[1].classList.remove("turned");
          }, 1000);
        } //cant use the same timeout for both as we need to empty the array and unlock the function regardless of the checkIfPair outcome
        setTimeout(() => {
          memoryGame.pickedCards.splice(0, 2);
          cardLock = false;
        }, 1000);
        //updating on screen counters
        document.querySelector(
          "#pairs-clicked"
        ).innerText = `${memoryGame.pairsClicked}`;

        document.querySelector(
          "#pairs-guessed"
        ).innerText = `${memoryGame.pairsGuessed}`;
        // sending alert if all pairs are found
        if (memoryGame.checkIfFinished()) {
          setTimeout(
            () =>
              alert(
                `YOU WON! You found all pairs in ${memoryGame.pairsClicked} guesses!`
              ),
            2000
          );
          document.querySelector("#btn-reset").style.visibility = "visible"; //adding a button to reset the game without having to reload the page
        }
      }
    });
  });
  //attempted to add a button to reset the game - for now it just refreshes the page

  const resetButton = document.querySelector("#btn-reset");
  resetButton.addEventListener("click", () => {
    if (resetButton.style.visibility === "visible") {
      location.reload(); //As I didnt have more time to debug, I decided to make the button simply reload the page and
      //comment out the code with which i attempted to reset the board.
      // -
      /*resetButton.style.visibility = "hidden";
      document.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("turned", "blocked");
      });
      memoryGame.restartGame();
      document.querySelector(
        "#pairs-clicked"
      ).innerText = `${memoryGame.pairsClicked}`;
      document.querySelector(
        "#pairs-guessed"
      ).innerText = `${memoryGame.pairsGuessed}`;
      //attempting to reset the html
      let html = "";
      memoryGame.cards.forEach((pic) => {
        html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
      });
      document.querySelector("#memory-board").innerHTML = html;*/
    }
  });
});