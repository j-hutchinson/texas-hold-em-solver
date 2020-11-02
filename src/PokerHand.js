export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
};

export class PokerHand {
	constructor(hand) {
		this.hand = hand;
	}

	scoreHand(hand) {
		const cards = hand.split(' ');
		const order = '23456789TJQKA';

		const faces = cards
			.map((card) => String.fromCharCode([77 - order.indexOf(card[0])]))
			.sort();
		const suits = cards.map((card) => card[1]).sort();
		const counts = faces.reduce(count, {});
		const duplicates = Object.values(counts).reduce(count, {});
		const flush = suits[0] === suits[4];
		const straight = faces.every((face, index) => face.charCodeAt(0) - faces[0].charCodeAt(0) === index);
		let rank =
			(flush && straight && 1) ||
			(duplicates[4] && 2) ||
			(duplicates[3] && duplicates[2] && 3) ||
			(flush && 4) ||
			(straight && 5) ||
			(duplicates[3] && 6) ||
			(duplicates[2] > 1 && 7) ||
			(duplicates[2] && 8) ||
			9;

		function sortByCountFirst(a, b) {
			const countDiff = counts[b] - counts[a];
			if (countDiff) return countDiff;
			return b > a ? -1 : b === a ? 0 : 1;
		}

		function count(c, a) {
			c[a] = (c[a] || 0) + 1;
			return c;
		}

		return {
			rank,
			value: faces.sort(sortByCountFirst).join('')
		};
	}

	compareWith({ hand }) {
		let scoredHand1 = this.scoreHand(this.hand);
		let scoredHand2 = this.scoreHand(hand);

		if (scoredHand1.rank === scoredHand2.rank) {
			if (scoredHand1.value < scoredHand2.value) {
				return Result.WIN;
			} else if (scoredHand1.value > scoredHand2.value) {
				return Result.LOSS;
			} else {
				return Result.TIE;
			}
		}
		if (scoredHand1.rank < scoredHand2.rank) {
			return Result.WIN;
		}
		return Result.LOSS;
	}
}

export default PokerHand;
