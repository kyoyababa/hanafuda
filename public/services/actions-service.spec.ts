import { Card } from './cards-service';
import { generateYakuByCurrentCards } from './actions-service';

describe('generateYakuByCurrentCards', () => {
  describe('カス札が10枚ある場合', () => {
    const cards = [
      { name: 'カス.1', flowerType: '松', point: 1 },
      { name: 'カス.2', flowerType: '松', point: 1 },
      { name: 'カス.1', flowerType: '梅', point: 1 },
      { name: 'カス.2', flowerType: '梅', point: 1 },
      { name: 'カス.1', flowerType: '桜', point: 1 },
      { name: 'カス.2', flowerType: '桜', point: 1 },
      { name: 'カス.1', flowerType: '藤', point: 1 },
      { name: 'カス.2', flowerType: '藤', point: 1 },
      { name: 'カス.1', flowerType: '菖蒲', point: 1 },
      { name: 'カス.2', flowerType: '菖蒲', point: 1 },
    ];

    it('"Kasu" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Kasu']);
    });
  });

  describe('カス札が9枚あり、菊に盃を含む場合', () => {
    const cards = [
      { name: 'カス.1', flowerType: '松', point: 1 },
      { name: 'カス.2', flowerType: '松', point: 1 },
      { name: 'カス.1', flowerType: '梅', point: 1 },
      { name: 'カス.2', flowerType: '梅', point: 1 },
      { name: 'カス.1', flowerType: '桜', point: 1 },
      { name: 'カス.2', flowerType: '桜', point: 1 },
      { name: 'カス.1', flowerType: '藤', point: 1 },
      { name: 'カス.2', flowerType: '藤', point: 1 },
      { name: 'カス.1', flowerType: '菖蒲', point: 1 },
      { name: '盃', flowerType: '菊', point: 10 },
    ];

    it('"Kasu" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Kasu']);
    });
  });

  describe('短冊が5枚ある場合', () => {
    const cards = [
      { name: '赤短', flowerType: '松', point: 5 },
      { name: '赤短', flowerType: '梅', point: 5 },
      { name: '青短', flowerType: '菊', point: 5 },
      { name: '短冊', flowerType: '藤', point: 5 },
      { name: '短冊', flowerType: '菖蒲', point: 5 },
    ];

    it('"Tanzaku" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Tanzaku']);
    });
  });

  describe('短冊が5枚あり、青短も成立している場合', () => {
    const cards = [
      { name: '青短', flowerType: '牡丹', point: 5 },
      { name: '青短', flowerType: '菊', point: 5 },
      { name: '青短', flowerType: '紅葉', point: 5 },
      { name: '短冊', flowerType: '藤', point: 5 },
      { name: '短冊', flowerType: '菖蒲', point: 5 },
    ];

    it('"Tanzaku", "Aotan" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual.length).toBe(2);
      expect(actual).toContain('Tanzaku');
      expect(actual).toContain('Aotan');
    });
  });

  describe('10点札が5枚ある場合', () => {
    const cards = [
      { name: '鴬', flowerType: '梅', point: 10 },
      { name: '不如帰', flowerType: '藤', point: 10 },
      { name: '八橋', flowerType: '菖蒲', point: 10 },
      { name: '蝶', flowerType: '牡丹', point: 10 },
      { name: '猪', flowerType: '萩', point: 10 },
    ];

    it('"Tane" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Tane']);
    });
  });

  describe('牡丹・菊・紅葉の短冊を含む場合', () => {
    const cards = [
      { name: '青短', flowerType: '牡丹', point: 5 },
      { name: '青短', flowerType: '菊', point: 5 },
      { name: '青短', flowerType: '紅葉', point: 5 },
    ];

    it('"Aotan" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Aotan']);
    });
  });

  describe('梅・桜・松の短冊を含む場合', () => {
    const cards = [
      { name: '赤短', flowerType: '梅', point: 5 },
      { name: '赤短', flowerType: '桜', point: 5 },
      { name: '赤短', flowerType: '松', point: 5 },
    ];

    it('"Akatan" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Akatan']);
    });
  });

  describe('萩・紅葉・牡丹のタネ札を含む場合', () => {
    const cards = [
      { name: '猪', flowerType: '萩', point: 10 },
      { name: '鹿', flowerType: '紅葉', point: 10 },
      { name: '蝶', flowerType: '牡丹', point: 10 },
    ];

    it('"Inoshikacho" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Inoshikacho']);
    });
  });

  describe('桜に幕・菊に盃の2枚を含む場合', () => {
    const cards = [
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '盃', flowerType: '菊', point: 10 },
    ];

    it('"Hanamideippai" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Hanamideippai']);
    });
  });

  describe('芒に月・菊に盃の2枚を含む場合', () => {
    const cards = [
      { name: '月', flowerType: '芒', point: 20 },
      { name: '盃', flowerType: '菊', point: 10 },
    ];

    it('"Tsukimideippai" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Tsukimideippai']);
    });
  });

  describe('5光札をすべて含む場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '月', flowerType: '芒', point: 20 },
      { name: '小野道風', flowerType: '柳', point: 20 },
      { name: '鳳凰', flowerType: '桐', point: 20 },
    ];

    it('"Goko" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Goko']);
    });
  });

  describe('5光札を4枚含む場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '月', flowerType: '芒', point: 20 },
      { name: '小野道風', flowerType: '柳', point: 20 },
    ];

    it('"Shiko" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Shiko']);
    });
  });

  describe('5光札を3枚含み、いずれも柳に小野道風ではない場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '月', flowerType: '芒', point: 20 },
    ];

    it('"Sanko" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual(['Sanko']);
    });
  });

  describe('短冊かつ赤短かつ青短かつ猪鹿蝶が同時に成立している組み合わせの場合', () => {
    const cards = [
      { name: '赤短', flowerType: '梅', point: 5 },
      { name: '赤短', flowerType: '桜', point: 5 },
      { name: '赤短', flowerType: '松', point: 5 },
      { name: '青短', flowerType: '牡丹', point: 5 },
      { name: '青短', flowerType: '菊', point: 5 },
      { name: '青短', flowerType: '紅葉', point: 5 },
      { name: '猪', flowerType: '萩', point: 10 },
      { name: '鹿', flowerType: '紅葉', point: 10 },
      { name: '蝶', flowerType: '牡丹', point: 10 },
    ];

    it('"Tanzaku, ""Akatan", "Aotan", "Inoshikacho" を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual.length).toBe(4);
      expect(actual).toContain('Tanzaku');
      expect(actual).toContain('Akatan');
      expect(actual).toContain('Aotan');
      expect(actual).toContain('Inoshikacho');
    });
  });

  describe('どの役も成立しない組み合わせの場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '蝶', flowerType: '牡丹', point: 10 },
      { name: '雁', flowerType: '芒', point: 10 },
      { name: '燕', flowerType: '柳', point: 10 },
      { name: 'カス.1', flowerType: '桐', point: 1 },
    ];

    it('null を返すこと', () => {
      const actual = generateYakuByCurrentCards(<Array<Card>>cards);
      expect(actual).toEqual([]);
    });
  });
});
