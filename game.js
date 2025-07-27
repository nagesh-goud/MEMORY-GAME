const board = document.getElementById('gameBoard');

// 16 unique emojis (total 32 cards after duplication)
const emojis = [
  '🐶', '🐱', '🐭', '🦊',
  '🐻', '🐼', '🐸', '🦁',
  '🐵', '🐔', '🐧', '🐤',
  '🐙', '🦄', '🐞', '🐢'
];

let cards = [...emojis, ...emojis]; // duplicate for pairs
cards.sort(() => 0.5 - Math.random()); // shuffle

let flippedCards = [];
let matchedCount = 0;

// Create card elements
cards.forEach((emoji) => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="front"></div>
    <div class="back">${emoji}</div>
  `;

  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstEmoji = first.querySelector('.back').textContent;
      const secondEmoji = second.querySelector('.back').textContent;

      if (firstEmoji === secondEmoji) {
        matchedCount++;
        flippedCards = [];
        if (matchedCount === emojis.length) {
          setTimeout(() => alert('🎉 You won!'), 300);
        }
      } else {
        setTimeout(() => {
          first.classList.remove('flipped');
          second.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  });

  board.appendChild(card);
});
