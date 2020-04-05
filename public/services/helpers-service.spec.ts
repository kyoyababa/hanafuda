import { Card } from './cards-service';
import * as Helpers from './helpers-service';

describe('isKasu', () => {
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

    it('true を返すこと', () => {
      const actual = Helpers.isKasu(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('カス札以外が10枚ある場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '赤短', flowerType: '松', point: 5 },
      { name: '鴬', flowerType: '梅', point: 10 },
      { name: '赤短', flowerType: '梅', point: 5 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '赤短', flowerType: '桜', point: 5 },
      { name: '不如帰', flowerType: '藤', point: 10 },
      { name: '短冊', flowerType: '藤', point: 5 },
      { name: '八橋', flowerType: '菖蒲', point: 10 },
      { name: '短冊', flowerType: '菖蒲', point: 5 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isKasu(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });

  describe('札が9枚未満の場合', () => {
    const cards = [
      { name: 'カス.1', flowerType: '松', point: 1 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isKasu(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isTanzaku', () => {
  describe('短冊が5枚ある場合', () => {
    const cards = [
      { name: '赤短', flowerType: '松', point: 5 },
      { name: '赤短', flowerType: '梅', point: 5 },
      { name: '赤短', flowerType: '桜', point: 5 },
      { name: '短冊', flowerType: '藤', point: 5 },
      { name: '短冊', flowerType: '菖蒲', point: 5 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isTanzaku(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('短冊以外が5枚ある場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '鴬', flowerType: '梅', point: 10 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '不如帰', flowerType: '藤', point: 10 },
      { name: 'カス.1', flowerType: '藤', point: 1 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isKasu(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });

  describe('札が5枚未満の場合', () => {
    const cards = [
      { name: 'カス.1', flowerType: '松', point: 1 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isKasu(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});
