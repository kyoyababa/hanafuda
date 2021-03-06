import * as Enums from '../../resources/constants/enums';
import { Card, PointType } from './cards-service';

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

export function isKikunisakazuki(card: Card): boolean {
  return card.flowerType === Enums.FlowerTypes.Kiku.name && card.point === 10;
}

function isKasuWithKikunisakazuki(cards: Array<Card>): boolean {
  const filteredCards = cards.filter(c => {
    return c.point === 1 || isKikunisakazuki(c);
  });
  return filteredCards.length >= 10;
}

export function isKasu(cards: Array<Card>): boolean {
  return checkMatchedBasicYaku(cards, 'Kasu') || isKasuWithKikunisakazuki(cards);
}

export function isTanzaku(cards: Array<Card>): boolean {
  return checkMatchedBasicYaku(cards, 'Tanzaku');
}

export function isTane(cards: Array<Card>): boolean {
  return checkMatchedBasicYaku(cards, 'Tane');
}

type FivePointsYaku = 'Aotan' | 'Akatan' | 'Inoshikacho' | 'Hanamideippai' | 'Tsukimideippai';

function checkMatchedFivePointsYaku(cards: Array<Card>, yaku: FivePointsYaku): boolean {
  interface RequiredCard {
    flowerType: string;
    point: PointType;
  };

  const requiredCards = (): Array<RequiredCard> => {
    switch(yaku) {
      case 'Aotan': return [
        { flowerType: Enums.FlowerTypes.Botan.name, point: 5 },
        { flowerType: Enums.FlowerTypes.Kiku.name, point: 5 },
        { flowerType: Enums.FlowerTypes.Momiji.name, point: 5 },
      ];

      case 'Akatan': return [
        { flowerType: Enums.FlowerTypes.Ume.name, point: 5 },
        { flowerType: Enums.FlowerTypes.Sakura.name, point: 5 },
        { flowerType: Enums.FlowerTypes.Matsu.name, point: 5 },
      ];

      case 'Inoshikacho': return [
        { flowerType: Enums.FlowerTypes.Hagi.name, point: 10 },
        { flowerType: Enums.FlowerTypes.Momiji.name, point: 10 },
        { flowerType: Enums.FlowerTypes.Botan.name, point: 10 },
      ];

      case 'Hanamideippai': return [
        { flowerType: Enums.FlowerTypes.Sakura.name, point: 20 },
        { flowerType: Enums.FlowerTypes.Kiku.name, point: 10 },
      ];

      case 'Tsukimideippai': return [
        { flowerType: Enums.FlowerTypes.Susuki.name, point: 20 },
        { flowerType: Enums.FlowerTypes.Kiku.name, point: 10 },
      ]
    }
  };

  return requiredCards().every(required => {
    return cards.some(card => card.flowerType === required.flowerType && card.point === required.point);
  });
}

export function isAotan(cards: Array<Card>): boolean {
  return checkMatchedFivePointsYaku(cards, 'Aotan');
}

export function isAkatan(cards: Array<Card>): boolean {
  return checkMatchedFivePointsYaku(cards, 'Akatan');
}

export function isInoshikacho(cards: Array<Card>): boolean {
  return checkMatchedFivePointsYaku(cards, 'Inoshikacho');
}

export function isHanamideippai(cards: Array<Card>): boolean {
  return checkMatchedFivePointsYaku(cards, 'Hanamideippai');
}

export function isTsukimideippai(cards: Array<Card>): boolean {
  return checkMatchedFivePointsYaku(cards, 'Tsukimideippai');
}

function hikariCardsCount(cards: Array<Card>): number {
  return cards.filter(c => c.point === 20).length;
}

export function isGoko(cards: Array<Card>): boolean {
  return hikariCardsCount(cards) === 5;
}

function hasYanagiNiOnonomichikaze(cards: Array<Card>): boolean {
  return cards.some(c => c.point === 20 && c.flowerType === Enums.FlowerTypes.Yanagi.name);
}

export function isShiko(cards: Array<Card>): boolean {
  return hikariCardsCount(cards) === 4 && !hasYanagiNiOnonomichikaze(cards);
}

export function isAmeiriShiko(cards: Array<Card>): boolean {
  return hikariCardsCount(cards) === 4 && hasYanagiNiOnonomichikaze(cards);
}

export function isSanko(cards: Array<Card>): boolean {
  const filteredCards = cards.filter(c => c.point === 20 && c.flowerType !== Enums.FlowerTypes.Yanagi.name);
  return filteredCards.length === 3;
}

// https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/shuffle.md
export function fisherYatesShuffle(arr: Array<any>): Array<any> {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}
