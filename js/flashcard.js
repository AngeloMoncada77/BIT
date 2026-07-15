let flashcards = [];
let currentCard = 0;
let isFlipped = false;

function generateFlashcards() {
  const input = document.getElementById('flashcard-input').value.trim();
  if (!input) {
    alert('Pega algún texto primero.');
    return;
  }

  const sentences = input.split(/[.!?\n]+/).filter(s => s.trim().length > 20);
  flashcards = sentences.map(s => {
    const parts = s.split(/ es | son | significa | se usa | se llaman | se define como /i);
    if (parts.length >= 2) {
      return {
        question: `¿Qué ${parts[0].trim()}?`,
        answer: parts.slice(1).join(' - ').trim()
      };
    }
    const words = s.trim().split(' ');
    const mid = Math.floor(words.length / 2);
    return {
      question: 'Completa: ' + words.slice(0, mid).join(' ') + ' ...',
      answer: words.slice(mid).join(' ')
    };
  });

  if (flashcards.length === 0) {
    flashcards = [{
      question: '¿Cuál es la idea principal del texto?',
      answer: input.slice(0, 200)
    }];
  }

  currentCard = 0;
  isFlipped = false;
  document.getElementById('flashcard-area').style.display = 'block';
  showCard();
}

function showCard() {
  const card = flashcards[currentCard];
  document.getElementById('question-text').textContent = card.question;
  document.getElementById('flashcard-content').innerHTML = `
    <p class="flashcard__question">${card.question}</p>
  `;
  document.getElementById('card-counter').textContent = `${currentCard + 1} / ${flashcards.length}`;
  document.getElementById('card-hint').textContent = 'Haz clic en la tarjeta para ver la respuesta';
  isFlipped = false;
}

function flipCard() {
  if (!flashcards.length) return;
  const card = flashcards[currentCard];
  const content = document.getElementById('flashcard-content');
  if (!isFlipped) {
    content.innerHTML = `<p class="flashcard__answer">${card.answer}</p>`;
    document.getElementById('card-hint').textContent = 'Haz clic para volver a la pregunta';
    isFlipped = true;
  } else {
    content.innerHTML = `<p class="flashcard__question">${card.question}</p>`;
    document.getElementById('card-hint').textContent = 'Haz clic en la tarjeta para ver la respuesta';
    isFlipped = false;
  }
}

function nextCard() {
  if (currentCard < flashcards.length - 1) {
    currentCard++;
    showCard();
  }
}

function prevCard() {
  if (currentCard > 0) {
    currentCard--;
    showCard();
  }
}
