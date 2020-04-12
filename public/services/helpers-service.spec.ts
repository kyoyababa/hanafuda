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
      const actual = Helpers.isTanzaku(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });

  describe('札が5枚未満の場合', () => {
    const cards = [
      { name: 'カス.1', flowerType: '松', point: 1 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isTanzaku(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isTane', () => {
  describe('10点札が5枚ある場合', () => {
    const cards = [
      { name: '鴬', flowerType: '梅', point: 10 },
      { name: '不如帰', flowerType: '藤', point: 10 },
      { name: '八橋', flowerType: '菖蒲', point: 10 },
      { name: '蝶', flowerType: '牡丹', point: 10 },
      { name: '猪', flowerType: '萩', point: 10 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isTane(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('10点札以外が5枚ある場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '赤短', flowerType: '松', point: 5 },
      { name: 'カス.1', flowerType: '松', point: 1 },
      { name: 'カス.2', flowerType: '松', point: 1 },
      { name: '赤短', flowerType: '梅', point: 5 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isTane(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });

  describe('札が5枚未満の場合', () => {
    const cards = [
      { name: 'カス.1', flowerType: '松', point: 1 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isTane(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isAotan', () => {
  describe('牡丹・菊・紅葉の短冊を含む場合', () => {
    const cards = [
      { name: '青短', flowerType: '牡丹', point: 5 },
      { name: '青短', flowerType: '菊', point: 5 },
      { name: '青短', flowerType: '紅葉', point: 5 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isAotan(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('牡丹・菊・紅葉のどれかひとつの短冊でも欠ける場合', () => {
    const cards = [
      { name: '青短', flowerType: '牡丹', point: 5 },
      { name: '青短', flowerType: '菊', point: 5 },
      { name: '鹿', flowerType: '紅葉', point: 10 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isAotan(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isAkatan', () => {
  describe('梅・桜・松の短冊を含む場合', () => {
    const cards = [
      { name: '赤短', flowerType: '梅', point: 5 },
      { name: '赤短', flowerType: '桜', point: 5 },
      { name: '赤短', flowerType: '松', point: 5 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isAkatan(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('牡丹・菊・紅葉のどれかひとつの短冊でも欠ける場合', () => {
    const cards = [
      { name: '赤短', flowerType: '梅', point: 5 },
      { name: '赤短', flowerType: '桜', point: 5 },
      { name: '鶴', flowerType: '松', point: 20 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isAkatan(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isInoshikacho', () => {
  describe('萩・紅葉・牡丹のタネ札を含む場合', () => {
    const cards = [
      { name: '猪', flowerType: '萩', point: 10 },
      { name: '鹿', flowerType: '紅葉', point: 10 },
      { name: '蝶', flowerType: '牡丹', point: 10 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isInoshikacho(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('萩・紅葉・牡丹のどれかひとつのタネ札でも欠ける場合', () => {
    const cards = [
      { name: '猪', flowerType: '萩', point: 10 },
      { name: '鹿', flowerType: '紅葉', point: 10 },
      { name: '八橋', flowerType: '菖蒲', point: 10 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isInoshikacho(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isHanamideippai', () => {
  describe('桜に幕・菊に盃の2枚を含む場合', () => {
    const cards = [
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '盃', flowerType: '菊', point: 10 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isHanamideippai(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('桜に幕・菊に盃のいずれかしか含まない場合', () => {
    const cards = [
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '鹿', flowerType: '紅葉', point: 10 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isHanamideippai(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isTsukimideippai', () => {
  describe('芒に月・菊に盃の2枚を含む場合', () => {
    const cards = [
      { name: '月', flowerType: '芒', point: 20 },
      { name: '盃', flowerType: '菊', point: 10 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isTsukimideippai(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('桜に幕・菊に盃のいずれかしか含まない場合', () => {
    const cards = [
      { name: '月', flowerType: '芒', point: 20 },
      { name: '鹿', flowerType: '紅葉', point: 10 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isTsukimideippai(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isGoko', () => {
  describe('5光札をすべて含む場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '月', flowerType: '芒', point: 20 },
      { name: '小野道風', flowerType: '柳', point: 20 },
      { name: '鳳凰', flowerType: '桐', point: 20 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isGoko(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('5光札が1枚でも欠ける場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '月', flowerType: '芒', point: 20 },
      { name: '小野道風', flowerType: '柳', point: 20 },
      { name: 'カス.1', flowerType: '桐', point: 1 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isGoko(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isShiko', () => {
  describe('5光札を4枚含む場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '月', flowerType: '芒', point: 20 },
      { name: '小野道風', flowerType: '柳', point: 20 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isShiko(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('5光札が3枚以下の場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '月', flowerType: '芒', point: 20 },
      { name: 'カス.1', flowerType: '桐', point: 1 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isShiko(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});

describe('isSanko', () => {
  describe('5光札を3枚含み、いずれも柳に小野道風ではない場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '月', flowerType: '芒', point: 20 },
    ];

    it('true を返すこと', () => {
      const actual = Helpers.isSanko(<Array<Card>>cards);
      expect(actual).toBeTruthy();
    });
  });

  describe('5光札を3枚含むが、柳に小野道風が含まれる場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: '小野道風', flowerType: '柳', point: 20 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isSanko(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });

  describe('5光札が2枚以下の場合', () => {
    const cards = [
      { name: '鶴', flowerType: '松', point: 20 },
      { name: '幕', flowerType: '桜', point: 20 },
      { name: 'カス.1', flowerType: '桐', point: 1 },
    ];

    it('false を返すこと', () => {
      const actual = Helpers.isSanko(<Array<Card>>cards);
      expect(actual).toBeFalsy();
    });
  });
});
