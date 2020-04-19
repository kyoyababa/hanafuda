import * as $ from 'jquery';

// import functions via scripts resources
import * as Enums from "../resources/constants/enums";

// import components
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import {
  Card,
  cards,
  generateImageFileName,
  convertCardElementToCard,
  generateCardNameFromCardElement
} from './services/cards-service';
import { fisherYatesShuffle } from './services/helpers-service';
import { generateYakuByCurrentCards } from './services/actions-service';

// import styles
import './index.scss';

type CardClassName = 'jsc-bafuda' | 'jsc-tefuda' | 'jsc-yamafuda' | 'jsc-aifuda';

export class Index {
  constructor(
    header: Header,
    footer: Footer
  ) {
    this.prepareCards();
  }

  private generateCardElement(card: Card, className: CardClassName | ''): string {
    return `
      <li class="${className}" data-flowertype="${card.flowerType}" data-name="${card.name}" data-point="${card.point}">
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
        // 場八
        $bafuda.append(this.generateCardElement(c, 'jsc-bafuda'));
      } else if (i < 8 + 8) {
        // 手八
        $tefuda.append(this.generateCardElement(c, 'jsc-tefuda'));
      } else {
        // 山札を積む
        $yamafuda.append(this.generateCardElement(c, 'jsc-yamafuda'));
      }
    });

    this.enableCardHoveredAction();
    this.enableCardSelection();
  }

  private enableCardHoveredAction(): void {
    $('main ul > li').hover(function() {
      if (!$(this).hasClass('jsc-tefuda')) return;
      if ($('.jsc-bafuda').hasClass('is-selected-flower-type')) return;

      const flowerType = $(this).attr('data-flowertype');
      $(`.jsc-bafuda[data-flowertype="${flowerType}"]`).addClass('is-matched-flower-type');
      $(`.jsc-tefuda[data-flowertype="${flowerType}"]`).addClass('is-matched-flower-type');

    }, function() {
      $('.jsc-bafuda').removeClass('is-matched-flower-type');
      $('.jsc-tefuda').removeClass('is-matched-flower-type');
    });
  }

  private enableCardSelection(): void {
    const _this = this;

    $('main ul > li').click(function() {
      if (!$(this).hasClass('jsc-tefuda')) return;
      if ($('.jsc-bafuda').hasClass('is-selected-flower-type')) return;

      const hasAifuda = $('.jsc-bafuda').hasClass('is-matched-flower-type');
      if (!hasAifuda) {
        _this.handleSutefuda($(this));
      } else {
        _this.handleAifuda($(this));
      }
    });
  }

  private handleSutefuda($selectedCard: JQuery): void {
    if (!confirm('場に同じ月の札がないため捨札となります。\nよろしいですか？')) return;

    const _this = this;
    $.when(
      _this.moveTefudaCardToSutefuda($selectedCard)
    ).then(() => {
      _this.addBafudaCardFromYamafuda();
    });
  }

  private handleAifuda($selectedCard: JQuery): void {
    const flowerType = $selectedCard.attr('data-flowertype');
    $(`.jsc-bafuda[data-flowertype="${flowerType}"]`).removeClass('is-matched-flower-type').addClass('is-selected-flower-type');

    this.moveCardToAifuda($selectedCard);
    $('.jsc-tefuda').removeClass('is-matched-flower-type');

    const _this = this;
    $('main ul > li').click(function() {
      if (!$(this).hasClass('jsc-bafuda') || !$(this).hasClass('is-selected-flower-type')) return;
      const $this = $(this);
      $.when(
        _this.moveBafudaCardToAifuda($this)
      ).then(() => {
        _this.addBafudaCardFromYamafuda();
      });
    });
  }

  private moveTefudaCardToSutefuda($selectedCard: JQuery): void {
    this.moveCardToSutefuda($selectedCard);
    $('.jsc-tefuda').removeClass('is-matched-flower-type');
  }

  private moveYamafudaCardToSutefuda($yamafuda: JQuery): void {
    alert(`場に同じ月の札がないため、${generateCardNameFromCardElement($yamafuda)}を山札から捨札に移動します。`);
    this.moveCardToSutefuda($yamafuda);
  }

  private movePairOfYamafudaAndTefuda($yamafuda: JQuery): void {
    alert(`${$yamafuda.attr('data-flowertype')}の札が場札にあるため、${generateCardNameFromCardElement($yamafuda)}を山札から合札に移動します。`);
    this.moveCardToAifuda($yamafuda);
    this.enableBafudaCardSelection();
  }

  private enableBafudaCardSelection(): void {
    const _this = this;
    $('main ul > li').click(function() {
      if (!$(this).hasClass('jsc-bafuda') || !$(this).hasClass('is-selected-flower-type')) return;
      _this.moveBafudaCardToAifuda($(this));
    });
  }

  private moveBafudaCardToAifuda($selectedCard: JQuery): void {
    this.moveCardToAifuda($selectedCard);
    $('.jsc-bafuda').removeClass('is-selected-flower-type');
  }

  private addBafudaCardFromYamafuda(): void {
    const $yamafuda = $('.jsc-yamafuda').eq(0);
    $yamafuda.addClass('is-selected-flower-type');

    const flowerType = $yamafuda.attr('data-flowertype');
    $(`.jsc-bafuda[data-flowertype="${flowerType}"]`).addClass('is-selected-flower-type');

    const _this = this;
    const hasAifuda = $('.jsc-bafuda').hasClass('is-selected-flower-type');
    if (!hasAifuda) {
      _this.moveYamafudaCardToSutefuda($yamafuda);
    } else {
      _this.movePairOfYamafudaAndTefuda($yamafuda);
    }
  }

  private moveCardToAifuda($card: JQuery) {
    const card = convertCardElementToCard($card);
    $('#jsi-aifuda').append(this.generateCardElement(card, 'jsc-aifuda'));
    $card.remove();

    this.updateCurrentYaku();
  }

  private moveCardToSutefuda($card: JQuery) {
    const card = convertCardElementToCard($card);
    $('#jsi-sutefuda').prepend(this.generateCardElement(card, ''));
    $card.remove();
  }

  private updateCurrentYaku(): void {
    const cards = Array.from($('.jsc-aifuda')).map($c => {
      return convertCardElementToCard($($c));
    });
    console.log(generateYakuByCurrentCards(cards));
  }
}

new Index(
  Header,
  Footer
);
