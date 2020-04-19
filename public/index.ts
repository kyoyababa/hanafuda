import * as $ from 'jquery';

// import functions via scripts resources
import * as Enums from "../resources/constants/enums";
import { FlowerType } from './services/cards-service';

// import components
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Card, cards, generateImageFileName } from './services/cards-service';
import { fisherYatesShuffle } from './services/helpers-service';

// import styles
import './index.scss';

type CardClassName = 'jsc-bafuda' | 'jsc-tefuda';

export class Index {
  constructor(
    header: Header,
    footer: Footer
  ) {
    this.prepareCards();
  }

  private generateCardElement(card: Card, className: CardClassName | ''): string {
    return `
      <li class="${className}" data-flowerType="${card.flowerType}">
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
        $yamafuda.append(this.generateCardElement(c, ''));
      }
    });

    this.enableCardHoveredAction();
    this.enableCardSelection();
  }

  private enableCardHoveredAction(): void {
    $('main ul > li').hover(function() {
      if (!$(this).hasClass('jsc-tefuda')) return;
      if ($('.jsc-bafuda').hasClass('is-selected-flower-type')) return;

      const flowerType = $(this).attr('data-flowerType');
      if (!flowerType) return;

      $('.jsc-bafuda, .jsc-tefuda')
        .removeClass('is-matched-flower-type');
      $(`.jsc-bafuda[data-flowerType="${flowerType}"], .jsc-tefuda[data-flowerType="${flowerType}"]`)
        .addClass('is-matched-flower-type');

    }, function() {
      $('.jsc-bafuda, .jsc-tefuda')
        .removeClass('is-matched-flower-type');
    });
  }

  private enableCardSelection(): void {
    $('main ul > li').click(function() {
      if (!$(this).hasClass('jsc-tefuda')) return;
      if ($('.jsc-bafuda').hasClass('is-selected-flower-type')) return;

      const hasAifuda = $('.jsc-bafuda').hasClass('is-matched-flower-type');

      function handleSutefuda($selectedCard: JQuery): void {
        if (!confirm('場に同じ月の札がないため捨て札となります。\nよろしいですか？')) return;
        $selectedCard
          .removeClass('is-matched-flower-type')
          .clone(false)
          .appendTo('#jsi-sutefuda');
        $selectedCard
          .remove();
      }

      function handleAifuda($selectedCard: JQuery): void {
        const flowerType = $selectedCard.attr('data-flowerType');

        $(`.jsc-bafuda[data-flowerType="${flowerType}"]`)
          .addClass('is-selected-flower-type');

        function moveSelectedCardToAifuda() {
          $selectedCard
            .clone(false)
            .appendTo('#jsi-aifuda')
          $selectedCard
            .remove();
        }

        moveSelectedCardToAifuda();

        $('.jsc-bafuda.is-selected-flower-type').click(function() {
          const $selectedBafudaCard = $(this);

          function moveBafudaCardToAifuda() {
            $('.jsc-bafuda.is-selected-flower-type')
              .removeClass('is-selected-flower-type');
            $selectedBafudaCard
              .clone(false)
              .appendTo('#jsi-aifuda');
            $selectedBafudaCard
              .remove();
          }

          moveBafudaCardToAifuda();
        });
      }

      if (!hasAifuda) {
        handleSutefuda($(this));
      } else {
        handleAifuda($(this));
      }
    });
  }
}

new Index(
  Header,
  Footer
);
