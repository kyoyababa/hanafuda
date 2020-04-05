import * as Enums from '../../resources/constants/enums';
import { Card } from './cards-service';

function checkMatchedBasicYaku(cards: Array<Card>, yaku: 'Kasu' | 'Tanzaku' | 'Tane') {
  const filterPoint = (): number => {
    switch(yaku) {
      case 'Kasu': return 1;
      case 'Tanzaku': return 5;
      case 'Tane': return 10;
    }
  }

  const filterCardsLength = (): number => {
    switch(yaku) {
      case 'Kasu':
        return 10;
      case 'Tanzaku':
      case 'Tane':
        return 5;
    }
  }

  const filteredCards = cards.filter(c => c.point === filterPoint());
  return filteredCards.length >= filterCardsLength();
}

export function isKasu(cards: Array<Card>): boolean {
  return checkMatchedBasicYaku(cards, 'Kasu');
}

export function isTanzaku(cards: Array<Card>): boolean {
  return checkMatchedBasicYaku(cards, 'Tanzaku');
}

export function isTane(cards: Array<Card>): boolean {
  return checkMatchedBasicYaku(cards, 'Tane');
}

export function isAotan(cards: Array<Card>): boolean {
  const requiredCards = [
    Enums.FlowerTypes.Botan,
    Enums.FlowerTypes.Kiku,
    Enums.FlowerTypes.Momiji,
  ];

  return requiredCards.every(required => {
    return cards.some(card => card.flowerType === required.name && card.point === 5);
  });
}

export function isAkatan(cards: Array<Card>): boolean {
  const requiredCards = [
    Enums.FlowerTypes.Ume,
    Enums.FlowerTypes.Sakura,
    Enums.FlowerTypes.Matsu,
  ];

  return requiredCards.every(required => {
    return cards.some(card => card.flowerType === required.name && card.point === 5);
  });
}
