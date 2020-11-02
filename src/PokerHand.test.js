import PokerHand, { Result } from './PokerHand.js';

describe('PokerHand', () => {
	describe('compareWith()', () => {
		test.each`
			cards1              | cards2              | winningHand                    | outcome
			${'AC KS QS JH TH'} | ${'4S 5S 8C AS AD'} | ${'Royal flush'}               | ${Result.WIN}
			${'AC AH QS QH 4H'} | ${'4S 5S 8C AS AD'} | ${'2 pair'}                    | ${Result.WIN}
			${'2C 9S 4S 5H 6H'} | ${'3S 5S 6C 9S TD'} | ${'Highcard'}                  | ${Result.LOSS}
			${'AC 4S 5S 8C AH'} | ${'4S 5S 8C AS AD'} | ${'Same hands'}                | ${Result.TIE}
			${'AC AS AH AC 4H'} | ${'4S 4S 4C 4S 2D'} | ${'4 of a kind w/ highcard'}   | ${Result.WIN}
			${'AC AS AH AC 4H'} | ${'4S 4S 4C 3S 2D'} | ${'4 of a kind > 3 of a kind'} | ${Result.WIN}
		`(`$winningHand`, ({ cards1, cards2, outcome }) => {
			const hand1 = new PokerHand(cards1);
			const hand2 = new PokerHand(cards2);

			expect(hand1.compareWith(hand2)).toBe(outcome);
		});
	});
});
