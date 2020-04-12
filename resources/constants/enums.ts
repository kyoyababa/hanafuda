import { FlowerType } from '../../public/services/cards-service';

interface FlowerTypeEnum {
  [key: string]: {
    code: string;
    name: FlowerType;
  }
}

export const FlowerTypes: FlowerTypeEnum = {
  Matsu: { code: 'Matsu', name: '松'},
  Ume: { code: 'Ume', name: '梅'},
  Sakura: { code: 'Sakura', name: '桜'},
  Fuji: { code: 'Fuji', name: '藤'},
  Ayame: { code: 'Ayame', name: '菖蒲'},
  Botan: { code: 'Botan', name: '牡丹'},
  Hagi: { code: 'Hagi', name: '萩'},
  Susuki: { code: 'Susuki', name: '芒'},
  Kiku: { code: 'Kiku', name: '菊'},
  Momiji: { code: 'Momiji', name: '紅葉'},
  Yanagi: { code: 'Yanagi', name: '柳'},
  Kiri: { code: 'Kiri', name: '桐'},
};

export const flowerTypesValues = () => [
  FlowerTypes.Matsu,
  FlowerTypes.Ume,
  FlowerTypes.Sakura,
  FlowerTypes.Fuji,
  FlowerTypes.Ayame,
  FlowerTypes.Botan,
  FlowerTypes.Hagi,
  FlowerTypes.Susuki,
  FlowerTypes.Kiku,
  FlowerTypes.Momiji,
  FlowerTypes.Yanagi,
  FlowerTypes.Kiri,
];

export type Yaku = 'Kasu' | 'Tanzaku' | 'Tane' | 'Aotan' | 'Akatan' |
                   'Inoshikacho' | 'Hanamideippai' | 'Tsukimideippai' |
                   'Goko' | 'Shiko' | 'AmeiriShiko' | 'Sanko';

interface YakuEnum {
  [key: string]: {
    code: Yaku;
    name: string;
    point: number;
  }
}

export const Yakus: YakuEnum = {
  Kasu: { code: 'Kasu', name: 'カス', point: 1 },
  Tanzaku: { code: 'Tanzaku', name: 'タン', point: 1 },
  Tane: { code: 'Tane', name: 'タネ', point: 1 },
  Aotan: { code: 'Aotan', name: '青短', point: 5 },
  Akatan: { code: 'Akatan', name: '赤短', point: 5 },
  Inoshikacho: { code: 'Inoshikacho', name: '猪鹿蝶', point: 5 },
  Hanamideippai: { code: 'Hanamideippai', name: '花見で一杯', point: 5 },
  Tsukimideippai: { code: 'Tsukimideippai', name: '月見で一杯', point: 5 },
  Goko: { code: 'Goko', name: '五光', point: 10 },
  Shiko: { code: 'Shiko', name: '四光', point: 8 },
  AmeiriShiko: { code: 'AmeiriShiko', name: '雨入り四光', point: 7 },
  Sanko: { code: 'Sanko', name: '三光', point: 5 },
}
