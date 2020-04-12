import * as Enums from '../../resources/constants/enums';
import { Card } from './cards-service';
import * as Helpers from './helpers-service';

type Yaku = 'Kasu' | 'Tanzaku' | 'Tane' | 'Aotan' | 'Akatan' | 'Inoshikacho' |
            'Hanamideippai' | 'Tsukimideippai' | 'Goko' | 'Shiko' | 'Sanko';

export function generateYakuByCurrentCards(cards: Array<Card>): Array<Yaku> {
  const check20PointCardsYaku = () => {
    if (Helpers.isGoko(cards)) {
      return 'Goko';
    } else if (Helpers.isShiko(cards)) {
      return 'Shiko';
    } else if (Helpers.isSanko(cards)) {
      return 'Sanko';
    } else {
      return null;
    }
  }

  const yakus = [
    Helpers.isKasu(cards) ? 'Kasu' : null,
    Helpers.isTanzaku(cards) ? 'Tanzaku' : null,
    Helpers.isTane(cards) ? 'Tane' : null,
    Helpers.isAotan(cards) ? 'Aotan' : null,
    Helpers.isAkatan(cards) ? 'Akatan' : null,
    Helpers.isInoshikacho(cards) ? 'Inoshikacho' : null,
    Helpers.isHanamideippai(cards) ? 'Hanamideippai' : null,
    Helpers.isTsukimideippai(cards) ? 'Tsukimideippai' : null,
    check20PointCardsYaku()
  ];

  return <Array<Yaku>>yakus.filter(y => y !== null);
}

function kasuCardsCount(cards: Array<Card>): number {
  return cards.filter(c => c.point === 1 || Helpers.isKikunisakazuki(c)).length;
}

function tanzakuCardsCount(cards: Array<Card>): number {
  return cards.filter(c => c.point === 5).length;
}

function taneCardsCount(cards: Array<Card>): number {
  return cards.filter(c => c.point === 10).length;
}

function isIncludeOnonoMichikaze(cards: Array<Card>): boolean {
  return cards.some(c => c.point === 20 && c.flowerType === Enums.FlowerTypes.Yanagi.name);
}

export function calculatePointsByYakus(cards: Array<Card>): number {
  const kasuPoints = (): number => {
    return 1 + (kasuCardsCount(cards) - 10);
  }

  const tanzakuPoints = (): number => {
    return 1 + (tanzakuCardsCount(cards) - 5);
  }

  const tanePoints = (): number => {
    return 1 + (taneCardsCount(cards) - 5);
  }

  const inoshikachoPoints = (): number => {
    return 5 + (taneCardsCount(cards) - 3);
  }

  const calculateAotanAndAkatanYakuPoints = (): number => {
    if (Helpers.isAotan(cards) && Helpers.isAkatan(cards)) {
      return 10 + (tanzakuCardsCount(cards) - (3 + 3));
    } else if (Helpers.isAotan(cards) || Helpers.isAkatan(cards)) {
      return 5 + (tanzakuCardsCount(cards) - 3);
    } else {
      return 0;
    }
  }

  const calculate20PointCardsPoints = (): number => {
    if (Helpers.isGoko(cards)) {
      return 10;
    } else if (Helpers.isShiko(cards) && isIncludeOnonoMichikaze(cards)) {
      return 7;
    } else if (Helpers.isShiko(cards)) {
      return 8;
    } else if (Helpers.isSanko(cards)) {
      return 5;
    } else {
      return 0;
    }
  }

  const points: Array<number> = [
    Helpers.isKasu(cards) ? kasuPoints() : 0,
    Helpers.isTanzaku(cards) ? tanzakuPoints() : 0,
    Helpers.isTane(cards) ? tanePoints() : 0,
    calculateAotanAndAkatanYakuPoints(),
    Helpers.isInoshikacho(cards) ? inoshikachoPoints() : 0,
    Helpers.isHanamideippai(cards) ? 5 : 0,
    Helpers.isTsukimideippai(cards) ? 5 : 0,
    calculate20PointCardsPoints(),
  ];

  return points.reduce((point, summary) => point + summary);
}
