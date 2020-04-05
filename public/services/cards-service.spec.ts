import { cards } from '../services/cards-service';

describe('cards', () => {
  it('絵札が48枚用意されていること', () => {
    expect(cards.length).toBe(48);
  });

  const flowerTypes = [
    '松', '梅', '桜', '藤', '菖蒲', '牡丹',
    '萩', '芒', '菊', '紅葉', '柳', '桐'
  ];
  flowerTypes.forEach(t => {
    describe(`「${t}」の花に対して`, () => {
      const cardsOfT = cards.filter(c => c.flowerType === t);

      it('絵札が4枚ずつ用意されていること', () => {
        expect(cardsOfT.length).toBe(4);
      });
    });
  });
});
