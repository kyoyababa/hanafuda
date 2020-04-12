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
