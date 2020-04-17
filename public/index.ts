// import functions via scripts resources
import * as Enums from "../resources/constants/enums";

// import components
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Card, cards, generateImageFileName } from './services/cards-service';
import { fisherYatesShuffle } from './services/helpers-service';

// import styles
import './index.scss';

export class Index {
  constructor(
    header: Header,
    footer: Footer
  ) {
    this.prepareCards();
  }

  private generateCardElement(card: Card): string {
    return `
      <li>
        <img src="/assets/images/${generateImageFileName(card)}" />
        <div>
          ${card.flowerType} - ${card.name}<br />
          ${card.point}pt
        </div>
      </li>
    `;
  }

  private prepareCards(): void {
    const shuffledCards: Array<Card> = fisherYatesShuffle(cards);

    const $bafuda = document.getElementById('jsi-bafuda');
    const $tefuda = document.getElementById('jsi-tefuda');
    const $yamafuda = document.getElementById('jsi-yamafuda');
    if (!$bafuda || !$tefuda || !$yamafuda) return;

    shuffledCards.forEach((c: Card, i: number) => {
      if (i < 8) {
        $bafuda.insertAdjacentHTML('beforeend', this.generateCardElement(c));
      } else if (i < 8 + 8) {
        $tefuda.insertAdjacentHTML('beforeend', this.generateCardElement(c));
      } else if (i < 8 + 8 + 8) {
        // 相手の手札になるので、これらのカードは何もしない
      } else {
        $yamafuda.insertAdjacentHTML('beforeend', this.generateCardElement(c));
      }
    });
  }
}

new Index(
  Header,
  Footer
);
