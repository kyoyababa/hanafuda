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
  const hasBotanAotan = cards.some(c => {
    return c.flowerType === Enums.FlowerTypes.Botan.name && c.point === 5;
  });
  const hasKikuAotan = cards.some(c => {
    return c.flowerType === Enums.FlowerTypes.Kiku.name && c.point === 5;
  });
  const hasMomijiAotan = cards.some(c => {
    return c.flowerType === Enums.FlowerTypes.Momiji.name && c.point === 5;
  });
  return hasBotanAotan && hasKikuAotan && hasMomijiAotan;
}
