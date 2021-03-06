export type FlowerType = '松' | '梅' | '桜' | '藤' | '菖蒲' | '牡丹' | '萩' | '芒' | '菊' | '紅葉' | '柳' | '桐';
export type PointType = 20 | 10 | 5 | 1;
export type Card = {
  name: string;
  flowerType: FlowerType;
  point: PointType;
};

export const cards: Array<Card> = [
  { name: '鶴', flowerType: '松', point: 20 },
  { name: '赤短', flowerType: '松', point: 5 },
  { name: 'カス.1', flowerType: '松', point: 1 },
  { name: 'カス.2', flowerType: '松', point: 1 },
  { name: '鴬', flowerType: '梅', point: 10 },
  { name: '赤短', flowerType: '梅', point: 5 },
  { name: 'カス.1', flowerType: '梅', point: 1 },
  { name: 'カス.2', flowerType: '梅', point: 1 },
  { name: '幕', flowerType: '桜', point: 20 },
  { name: '赤短', flowerType: '桜', point: 5 },
  { name: 'カス.1', flowerType: '桜', point: 1 },
  { name: 'カス.2', flowerType: '桜', point: 1 },
  { name: '不如帰', flowerType: '藤', point: 10 },
  { name: '短冊', flowerType: '藤', point: 5 },
  { name: 'カス.1', flowerType: '藤', point: 1 },
  { name: 'カス.2', flowerType: '藤', point: 1 },
  { name: '八橋', flowerType: '菖蒲', point: 10 },
  { name: '短冊', flowerType: '菖蒲', point: 5 },
  { name: 'カス.1', flowerType: '菖蒲', point: 1 },
  { name: 'カス.2', flowerType: '菖蒲', point: 1 },
  { name: '蝶', flowerType: '牡丹', point: 10 },
  { name: '青短', flowerType: '牡丹', point: 5 },
  { name: 'カス.1', flowerType: '牡丹', point: 1 },
  { name: 'カス.2', flowerType: '牡丹', point: 1 },
  { name: '猪', flowerType: '萩', point: 10 },
  { name: '短冊', flowerType: '萩', point: 5 },
  { name: 'カス.1', flowerType: '萩', point: 1 },
  { name: 'カス.2', flowerType: '萩', point: 1 },
  { name: '月', flowerType: '芒', point: 20 },
  { name: '雁', flowerType: '芒', point: 10 },
  { name: 'カス.1', flowerType: '芒', point: 1 },
  { name: 'カス.2', flowerType: '芒', point: 1 },
  { name: '盃', flowerType: '菊', point: 10 },
  { name: '青短', flowerType: '菊', point: 5 },
  { name: 'カス.1', flowerType: '菊', point: 1 },
  { name: 'カス.2', flowerType: '菊', point: 1 },
  { name: '鹿', flowerType: '紅葉', point: 10 },
  { name: '青短', flowerType: '紅葉', point: 5 },
  { name: 'カス.1', flowerType: '紅葉', point: 1 },
  { name: 'カス.2', flowerType: '紅葉', point: 1 },
  { name: '小野道風', flowerType: '柳', point: 20 },
  { name: '燕', flowerType: '柳', point: 10 },
  { name: '短冊', flowerType: '柳', point: 5 },
  { name: 'カス.1', flowerType: '柳', point: 1 },
  { name: '鳳凰', flowerType: '桐', point: 20 },
  { name: 'カス.1', flowerType: '桐', point: 1 },
  { name: 'カス.2', flowerType: '桐', point: 1 },
  { name: 'カス.3', flowerType: '桐', point: 1 },
];

export function generateImageFileName(card: Card): string {
  switch(card.point) {
    case 1:
      return `${card.flowerType}の${card.name}.jpg`;
    default:
      return `${card.flowerType}に${card.name}.jpg`;
  }
}

export function convertCardElementToCard($card: JQuery): Card {
  const flowerType = <FlowerType>$card.attr('data-flowertype');
  const name = <string>$card.attr('data-name');
  const point = <PointType>parseInt(<string>$card.attr('data-point'), 10);

  return {
    flowerType,
    name,
    point
  };
}

export function generateCardNameFromCardElement($card: JQuery): string {
  return `${$card.attr('data-flowertype')} - ${$card.attr('data-name')}`;
}
