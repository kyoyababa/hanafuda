import * as Enums from '../../resources/constants/enums';
import { Card } from './cards-service';
import * as Helpers from './helpers-service';

type Yaku = 'Kasu' | 'Kasu' | 'Tanzaku' | 'Tane' | 'Aotan' | 'Akatan' |
            'Inoshikacho' | 'Hanamideippai' | 'Tsukimideippai' | 'Goko' | 'Shiko' | 'Sanko';

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

export function calculatePointsByYakus(cards: Array<Card>): number {
  let points = 0;

  if (Helpers.isKasu(cards)) {
    const kasuCardsCount = cards.filter(c => {
      return c.point === 1 || Helpers.isKikunisakazuki(c)
    }).length;
    points += 1;
    points += (kasuCardsCount - 10);
  }

  if (Helpers.isTanzaku(cards)) {
    const tanzakuCardsCount = cards.filter(c => {
      return c.point === 5;
    }).length;
    points += 1;
    points += (tanzakuCardsCount - 5);
  }

  if (Helpers.isAotan(cards) && Helpers.isAkatan(cards)) {
    const tanzakuCardsCount = cards.filter(c => {
      return c.point === 5;
    }).length;
    points += 10;
    points += (tanzakuCardsCount - (3 + 3));

  } else {
    if (Helpers.isAotan(cards)) {
      const tanzakuCardsCount = cards.filter(c => {
        return c.point === 5;
      }).length;
      points += 5;
      points += (tanzakuCardsCount - 3);
    }

    if (Helpers.isAkatan(cards)) {
      const tanzakuCardsCount = cards.filter(c => {
        return c.point === 5;
      }).length;
      points += 5;
      points += (tanzakuCardsCount - 3);
    }
  }

  if (Helpers.isTane(cards)) {
    const taneCardsCount = cards.filter(c => {
      return c.point === 10;
    }).length;
    points += 1;
    points += (taneCardsCount - 5);
  }

  if (Helpers.isInoshikacho(cards)) {
    const taneCardsCount = cards.filter(c => {
      return c.point === 10;
    }).length;
    points += 5;
    points += (taneCardsCount - 3);
  }

  if (Helpers.isHanamideippai(cards)) {
    points += 5;
  }

  if (Helpers.isTsukimideippai(cards)) {
    points += 5;
  }

  if (Helpers.isGoko(cards)) {
    points += 10;
  } else if (Helpers.isShiko(cards)) {
    const isIncludeOnonoMichikaze = cards.find(c => {
      return c.point === 20 && c.flowerType === Enums.FlowerTypes.Yanagi.name;
    });
    if (isIncludeOnonoMichikaze) {
      points += 7;
    } else {
      points += 8;
    }
  } else if (Helpers.isSanko(cards)) {
    points += 5;
  }

  return points;
}
