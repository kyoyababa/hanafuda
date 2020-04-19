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
  //   const _this = this;
  //
  //   $('main ul > li').click(function() {
  //     if (!$(this).hasClass('jsc-tefuda')) return;
  //     if ($('.jsc-bafuda').hasClass('is-selected-flower-type')) return;
  //
  //     const hasAifuda = $('.jsc-bafuda').hasClass('is-matched-flower-type');
  //     if (!hasAifuda) {
  //       _this.handleSutefuda($(this));
  //     } else {
  //       _this.handleAifuda($(this));
  //     }
  //   });
  }
  
  // private handleSutefuda($selectedCard: JQuery): void {
  //   if (!confirm('場に同じ月の札がないため捨札となります。\nよろしいですか？')) return;
  //
  //   const _this = this;
  //   $.when(
  //     _this.moveTefudaCardToSutefuda($selectedCard)
  //   ).then(() => {
  //     $.when(
  //       _this.pickCardUpFromYamafuda()
  //     ).then(() => {
  //       const hasAifuda = $('.jsc-bafuda').hasClass('is-selected-flower-type');
  //       const $yamafuda = $('.jsc-yamafuda').eq(0);
  //       if (!hasAifuda) {
  //         _this.moveYamafudaToSutefuda($yamafuda);
  //       } else {
  //         _this.moveYamafudaToBafuda($yamafuda);
  //
  //         $('main ul > li').click(function() {
  //           if (!$(this).hasClass('jsc-bafuda') || !$(this).hasClass('is-selected-flower-type')) return;
  //           _this.moveBafudaCardToAifuda($(this));
  //         });
  //       }
  //     });
  //   });
  // }
  //
  // private handleAifuda($selectedCard: JQuery): void {
  //   this.moveCardToAifuda($selectedCard);
  //   $('.jsc-tefuda').removeClass('is-matched-flower-type');
  //
  //   const flowerType = $selectedCard.attr('data-flowertype');
  //   const $bafudaCardsWithSameFlower = $(`.jsc-bafuda[data-flowertype="${flowerType}"]`);
  //   $bafudaCardsWithSameFlower.removeClass('is-matched-flower-type').addClass('is-selected-flower-type');
  //
  //   const _this = this;
  //   $('main ul > li').click(function() {
  //     if (!$(this).hasClass('jsc-bafuda')) return;
  //     if (!$(this).hasClass('is-selected-flower-type')) return;
  //
  //     const $this = $(this);
  //     $.when(
  //       _this.moveBafudaCardToAifuda($this),
  //       $('.jsc-bafuda').removeClass('is-selected-flower-type')
  //     ).then(() => {
  //       $.when(
  //         _this.pickCardUpFromYamafuda(),
  //         $bafudaCardsWithSameFlower.removeClass('is-selected-flower-type').addClass('is-matched-with-yamafuda')
  //       ).then(() => {
  //         const hasAifuda = $('.jsc-bafuda').hasClass('is-matched-with-yamafuda');
  //         const $yamafuda = $('.jsc-yamafuda').eq(0);
  //         if (!hasAifuda) {
  //           _this.moveYamafudaToSutefuda($yamafuda);
  //         } else {
  //           _this.moveYamafudaToBafuda($yamafuda);
  //
  //           $('main ul > li').click(function() {
  //             if (!$(this).hasClass('jsc-bafuda')) return;
  //             if (!$(this).hasClass('is-matched-with-yamafuda')) return;
  //
  //             _this.moveCardToAifuda($(this));
  //             $bafudaCardsWithSameFlower.removeClass('is-matched-with-yamafuda');
  //           });
  //         }
  //       });
  //     });
  //   });
  // }
  //
  // private moveYamafudaToSutefuda($yamafuda: JQuery): void {
  //   alert(`場に同じ月の札がないため、${generateCardNameFromCardElement($yamafuda)}を山札から捨札に移動します。`);
  //   this.moveCardToSutefuda($yamafuda);
  // }
  //
  // private moveYamafudaToBafuda($yamafuda: JQuery): void {
  //   alert(`${$yamafuda.attr('data-flowertype')}の札が場札にあるため、${generateCardNameFromCardElement($yamafuda)}を山札から合札に移動します。`);
  //   this.moveCardToAifuda($yamafuda);
  // }
  //
  // private moveTefudaCardToSutefuda($selectedCard: JQuery): void {
  //   $('.jsc-tefuda').removeClass('is-matched-flower-type');
  //   this.moveCardToSutefuda($selectedCard);
  // }
  //
  // private moveBafudaCardToAifuda($selectedCard: JQuery): void {
  //   $('.jsc-bafuda').removeClass('is-selected-flower-type');
  //   this.moveCardToAifuda($selectedCard);
  // }
  //
  // private pickCardUpFromYamafuda(): void {
  //   const $yamafuda = $('.jsc-yamafuda').eq(0);
  //   $yamafuda.addClass('is-selected-flower-type');
  //
  //   const flowerType = $yamafuda.attr('data-flowertype');
  //   const $bafudaCardsWithSameFlower = $(`.jsc-bafuda[data-flowertype="${flowerType}"]`);
  //   $bafudaCardsWithSameFlower.addClass('is-selected-flower-type');
  // }
  //
  // private moveCardToAifuda($card: JQuery) {
  //   const card = convertCardElementToCard($card);
  //   $('#jsi-aifuda').append(this.generateCardElement(card, 'jsc-aifuda'));
  //   $card.remove();
  //
  //   this.updateCurrentYaku();
  // }
  //
  // private moveCardToSutefuda($card: JQuery) {
  //   const card = convertCardElementToCard($card);
  //   $('#jsi-sutefuda').prepend(this.generateCardElement(card, ''));
  //   $card.remove();
  // }
  //
  // private updateCurrentYaku(): void {
  //   $('#jsi-dekiyaku').empty().append(this.generateDekiyakuElements());
  // }
  //
  // private generateDekiyakuElements(): string {
  //   const cards = Array.from($('.jsc-aifuda')).map($c => convertCardElementToCard($($c)));
  //   const yakus = generateYakuByCurrentCards(cards).map(yaku => {
  //     const yakuEnums = Enums.yakusValues.find(yakuValue => yakuValue.code === yaku);
  //     if (yakuEnums) return yakuEnums.name;
  //   });
  //   return yakus.map(yaku => `<li>${yaku}</li>`).join('');
  // }
}

new Index(
  Header,
  Footer
);
