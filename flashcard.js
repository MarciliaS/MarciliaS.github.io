const gridContainer = document.querySelector(".grid-container");

let cards = [];
let lockBoard = false; 

fetch("../data/cards.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    cards = data;        
  })
  .catch(error => {
    console.log('Error fetching or parsing JSON:', error);
  });

function shuffleArray(arr) {
  let currentIndex = arr.length;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
  }
  return arr
}

const dropdown = document.getElementById("myDropdown");
let value;
dropdown.addEventListener("change", () => {
   value = dropdown.value;
   generateCards(cards[value]);
})



function generateCards(list) {
    gridContainer.innerHTML = ""; 

    
        for(const card of list) {
                
        const cardElement = document.createElement('div');
        cardElement.classList.add("card");

        cardElement.innerHTML = `
            <div class="front">
                <p class="front_name">${card.portuguese}</p>
            </div>
            <div class="back">
                <div class="inner">
                <img class="back-image" src="${card.image}" alt="">
                <p class="back_name">${card.english}</p>
                </div>
            </div>
        `
        gridContainer.appendChild(cardElement);

        cardElement.addEventListener("click", () => {
            cardElement.classList.toggle("flipped");
        });
    }
    
};

function suffle() {
  const copy = [...cards[value]];

  shuffleArray(copy);
  generateCards(copy);
}
