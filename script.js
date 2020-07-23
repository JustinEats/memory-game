class MemoryGame {
	constructor(card1, card2, cardsFlipped, notClicking, colors) {
		this.card1 = card1;
		this.card2 = card2;
		this.cardsFlipped = cardsFlipped;
		this.notClicking = notClicking;
		this.colors = colors;
		this.shuffle(colors);
		this.createDivsForColors(this.colors);
	}
	shuffle(array) {
		let counter = array.length;
		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			let index = Math.floor(Math.random() * counter);

			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			let temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	}
	createDivsForColors(colorArray) {
		const gameContainer = document.getElementById('game');
		for (let color of colorArray) {
			const newDiv = document.createElement('div');
			newDiv.classList.add(color);
			newDiv.addEventListener('click', this.handleCardClick.bind(this));

			gameContainer.append(newDiv);
		}
	}
	handleCardClick(e) {
		const { card1, card2, cardsFlipped, noClicking, colors } = this;
		if (this.noClicking) return; // not clicked, return the card as is
		if (e.target.classList.contains('flipped')) return;

		let currentCard = e.target; // assigns current card

		currentCard.style.backgroundColor = currentCard.classList[0]; // changes background of current card

		if (!card1 || !card2) {
			currentCard.classList.add('flipped'); // adds class "flipped" which will be removed later.
			this.card1 = this.card1 || currentCard;
			this.card2 = currentCard === card1 ? null : currentCard;
		}

		if (card1 && card2) {
			this.noClicking = true;

			let color1 = card1.className; //assigns your clicked card to a variable
			let color2 = card2.className; //assigns your clicked card to a variable

			if (color1 === color2) {
				// compares the variables and if = sets cards to stay with their colors showing
				this.cardsFlipped += 2;
				card1.removeEventListener('click', this.handleCardClick);
				card2.removeEventListener('click', this.handleCardClick);
				this.card1 = null;
				this.card2 = null;
				this.noClicking = false;
			} else {
				// sets cards to have no color showing to be clicked again
				setTimeout(function() {
					card1.style.backgroundColor = ''; // sets background back to nothing
					card2.style.backgroundColor = ''; // sets background back to nothing
					card1.classList.remove('flipped'); //removes class "flipped" that was added earlier
					card2.classList.remove('flipped'); //removes class "flipped" that was added earlier
					card1 = null;
					card2 = null;
					noClicking = false;
				}, 1000);
			}
		}

		if (cardsFlipped === colors.length) alert('game over!'); // ends game.
	}
}

new MemoryGame(null, null, 0, false, [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple'
]);
