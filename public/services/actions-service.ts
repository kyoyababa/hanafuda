import * as Enums from '../../resources/constants/enums';
import { Card } from './cards-service';
import * as Helpers from './helpers-service';

export function generateYakuByCurrentCards(cards: Array<Card>): Array<Enums.Yaku> {
  const check20PointCardsYaku = () => {
    if (Helpers.isGoko(cards)) {
      return Enums.Yakus.Goko.code;
    } else if (Helpers.isAmeiriShiko(cards)) {
      return Enums.Yakus.AmeiriShiko.code;
    } else if (Helpers.isShiko(cards)) {
      return Enums.Yakus.Shiko.code;
    } else if (Helpers.isSanko(cards)) {
      return Enums.Yakus.Sanko.code;
    } else {
      return null;
    }
  }

  const yakus = [
    Helpers.isKasu(cards) ? Enums.Yakus.Kasu.code : null,
    Helpers.isTanzaku(cards) ? Enums.Yakus.Tanzaku.code : null,
    Helpers.isTane(cards) ? Enums.Yakus.Tane.code : null,
    Helpers.isAotan(cards) ? Enums.Yakus.Aotan.code : null,
    Helpers.isAkatan(cards) ? Enums.Yakus.Akatan.code : null,
    Helpers.isInoshikacho(cards) ? Enums.Yakus.Inoshikacho.code : null,
    Helpers.isHanamideippai(cards) ? Enums.Yakus.Hanamideippai.code : null,
    Helpers.isTsukimideippai(cards) ? Enums.Yakus.Tsukimideippai.code : null,
    check20PointCardsYaku()
  ];

  return <Array<Enums.Yaku>>yakus.filter(y => y !== null);
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

export function calculatePointsByYakus(cards: Array<Card>): number {
  const kasuPoints = (): number => {
    return Enums.Yakus.Kasu.point + (kasuCardsCount(cards) - 10);
  }

  const tanzakuPoints = (): number => {
    return Enums.Yakus.Tanzaku.point + (tanzakuCardsCount(cards) - 5);
  }

  const tanePoints = (): number => {
    return Enums.Yakus.Tane.point + (taneCardsCount(cards) - 5);
  }

  const inoshikachoPoints = (): number => {
    return Enums.Yakus.Inoshikacho.point + (taneCardsCount(cards) - 3);
  }

  const calculateAotanAndAkatanYakuPoints = (): number => {
    if (Helpers.isAotan(cards) && Helpers.isAkatan(cards)) {
      return Enums.Yakus.Aotan.point + Enums.Yakus.Akatan.point + (tanzakuCardsCount(cards) - (3 + 3));
    } else if (Helpers.isAotan(cards)) {
      return Enums.Yakus.Aotan.point + (tanzakuCardsCount(cards) - 3);
    } else if (Helpers.isAkatan(cards)) {
      return Enums.Yakus.Akatan.point + (tanzakuCardsCount(cards) - 3);
    } else {
      return 0;
    }
  }

  const calculate20PointCardsPoints = (): number => {
    if (Helpers.isGoko(cards)) {
      return Enums.Yakus.Goko.point;
    } else if (Helpers.isAmeiriShiko(cards)) {
      return Enums.Yakus.AmeiriShiko.point;
    } else if (Helpers.isShiko(cards)) {
      return Enums.Yakus.Shiko.point;
    } else if (Helpers.isSanko(cards)) {
      return Enums.Yakus.Sanko.point;
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
    Helpers.isHanamideippai(cards) ? Enums.Yakus.Hanamideippai.point : 0,
    Helpers.isTsukimideippai(cards) ? Enums.Yakus.Tsukimideippai.point : 0,
    calculate20PointCardsPoints(),
  ];

  return points.reduce((point, summary) => point + summary);
}
