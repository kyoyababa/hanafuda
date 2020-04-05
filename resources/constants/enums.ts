import { FlowerType } from '../../public/services/cards-service';

interface FlowerTypeEnum {
  [key: string]: {
    code: string;
    name: FlowerType
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
