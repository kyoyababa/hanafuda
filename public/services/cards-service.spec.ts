import { Card, cards, generateImageFileName } from '../services/cards-service';

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

describe('generateImageFileName', () => {
  [
    { name: '鶴', flowerType: '松', point: 20, expected: '松に鶴.jpg' },
    { name: '赤短', flowerType: '松', point: 5, expected: '松に赤短.jpg' },
    { name: 'カス.1', flowerType: '松', point: 1, expected: '松のカス.1.jpg' },
    { name: '鴬', flowerType: '梅', point: 10, expected: '梅に鴬.jpg' },
    { name: '赤短', flowerType: '梅', point: 5, expected: '梅に赤短.jpg' },
    { name: 'カス.2', flowerType: '梅', point: 1, expected: '梅のカス.2.jpg' },
    { name: '幕', flowerType: '桜', point: 20, expected: '桜に幕.jpg' },
    { name: '赤短', flowerType: '桜', point: 5, expected: '桜に赤短.jpg' },
    { name: 'カス.1', flowerType: '桜', point: 1, expected: '桜のカス.1.jpg' },
    { name: '不如帰', flowerType: '藤', point: 10, expected: '藤に不如帰.jpg' },
    { name: '短冊', flowerType: '藤', point: 5, expected: '藤に短冊.jpg' },
    { name: 'カス.2', flowerType: '藤', point: 1, expected: '藤のカス.2.jpg' },
    { name: '八橋', flowerType: '菖蒲', point: 10, expected: '菖蒲に八橋.jpg' },
    { name: '短冊', flowerType: '菖蒲', point: 5, expected: '菖蒲に短冊.jpg' },
    { name: 'カス.1', flowerType: '菖蒲', point: 1, expected: '菖蒲のカス.1.jpg' },
    { name: '蝶', flowerType: '牡丹', point: 10, expected: '牡丹に蝶.jpg' },
    { name: '青短', flowerType: '牡丹', point: 5, expected: '牡丹に青短.jpg' },
    { name: 'カス.2', flowerType: '牡丹', point: 1, expected: '牡丹のカス.2.jpg' },
  ].forEach(c => {
    describe(`${c.flowerType} - ${c.name} の絵札に対して`, () => {
      it(`ファイル名 ${c.expected} が生成されること`, () => {
        const actual = generateImageFileName(<Card>c);
        expect(actual).toBe(c.expected);
      });
    });
  });
});
