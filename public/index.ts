import * as $ from 'jquery';

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
      <li data-flowerType="${card.flowerType}">
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

    const $bafuda = $('#jsi-bafuda');
    const $tefuda = $('#jsi-tefuda');
    const $yamafuda = $('#jsi-yamafuda');

    shuffledCards.forEach((c: Card, i: number) => {
      if (i < 8) {
        $bafuda.append(this.generateCardElement(c));
      } else if (i < 8 + 8) {
        $tefuda.append(this.generateCardElement(c));
      } else if (i < 8 + 8 + 8) {
        // 相手の手札になるので、これらのカードは何もしない
      } else {
        $yamafuda.append(this.generateCardElement(c));
      }
    });
  }
}

new Index(
  Header,
  Footer
);
