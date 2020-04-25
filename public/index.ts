import * as $ from 'jquery';

// import components
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import {
  Card,
  FlowerType,
  cards,
  generateCardNameFromCardElement
} from './services/cards-service';
import { fisherYatesShuffle } from './services/helpers-service';
import {
  generateCardElement,
  moveCardToBafuda,
  moveCardToSutefuda,
  moveCardToAifuda
} from './services/effects-service';

// import styles
import './index.scss';

export class Index {
  private shouldContinueToPickCardUpFromYamafuda = false;

  constructor(
    header: Header,
    footer: Footer
  ) {
    this.prepareCards();
  }

  private prepareCards(): void {
    const shuffledCards: Array<Card> = fisherYatesShuffle(cards);

    const $bafuda = $('#jsi-bafuda');
    const $tefuda = $('#jsi-tefuda');
    const $yamafuda = $('#jsi-yamafuda');

    shuffledCards.forEach((c: Card, i: number) => {
      if (i < 8) {
        // 場八
        $bafuda.append(generateCardElement(c, 'jsc-bafuda'));
      } else if (i < 8 + 8) {
        // 手八
        $tefuda.append(generateCardElement(c, 'jsc-tefuda'));
      } else {
        // 山札を積む
        $yamafuda.append(generateCardElement(c, 'jsc-yamafuda'));
      }
    });

    this.enableTefudaHoveredAction();
    this.enableTefudaSelection();
    this.enableBafudaSelection();
  }

  private enableTefudaHoveredAction(): void {
    $('.jsc-tefuda').hover(function() {
      if ($('.jsc-bafuda').hasClass('is-selected-flower-type')) return;

      const flowerType = $(this).attr('data-flowertype');
      $(`.jsc-bafuda[data-flowertype="${flowerType}"]`).addClass('is-matched-flower-type');
      $(`.jsc-tefuda[data-flowertype="${flowerType}"]`).addClass('is-matched-flower-type');

    }, function() {
      $('.jsc-bafuda').removeClass('is-matched-flower-type');
      $('.jsc-tefuda').removeClass('is-matched-flower-type');
    });
  }

  private enableTefudaSelection(): void {
    const _this = this;

    $('.jsc-tefuda').click(function() {
      if ($('.jsc-bafuda').hasClass('is-selected-flower-type')) return;

      const hasAifuda = $('.jsc-bafuda').hasClass('is-matched-flower-type');
      if (!hasAifuda) {
        _this.moveTefudaToSutefuda($(this));
      } else {
        _this.moveTefudaToAifuda($(this));
      }
    });
  }

  private enableBafudaSelection(): void {
    const _this = this;

    $('.jsc-bafuda').click(function() {
      if (!$(this).hasClass('is-selected-flower-type')) return;

      moveCardToAifuda($(this));
      $('.jsc-bafuda').removeClass('is-selected-flower-type');

      if (!_this.shouldContinueToPickCardUpFromYamafuda) return;

      _this.pickCardUpFromYamafuda();
      _this.shouldContinueToPickCardUpFromYamafuda = false;
    });
  }

  private moveTefudaToSutefuda($tefuda: JQuery): void {
    if (!confirm('場に同じ月の札がないため捨札となります。\nよろしいですか？')) return;

    const _this = this;
    $.when(
      moveCardToSutefuda($tefuda),
      $('.jsc-tefuda').removeClass('is-matched-flower-type')
    ).then(() => {
      _this.pickCardUpFromYamafuda()
    });
  }

  private moveTefudaToAifuda($tefuda: JQuery): void {
    const flowerType = $tefuda.attr('data-flowertype');

    $.when(
      moveCardToAifuda($tefuda),
      $('.jsc-tefuda').removeClass('is-matched-flower-type')
    ).then(() => {
      this.highlightBafuda(<FlowerType>flowerType);
      this.shouldContinueToPickCardUpFromYamafuda = true;
    });
  }

  private pickCardUpFromYamafuda(): void {
    const $yamafuda = $('.jsc-yamafuda').eq(0);
    const flowerType = $yamafuda.attr('data-flowertype');

    const highlightYamafuda = () => {
      $yamafuda.addClass('is-selected-flower-type');
    }

    $.when(
      highlightYamafuda(),
      this.highlightBafuda(<FlowerType>flowerType)
    ).then(() => {
      const hasAifuda = $('.jsc-bafuda').hasClass('is-selected-flower-type');
      if (!hasAifuda) {
        this.moveYamafudaToBafuda($yamafuda);
      } else {
        this.moveYamafudaToAifuda($yamafuda);
      }
    });
  }

  private highlightBafuda(flowerType: FlowerType): void {
    const $bafudaCardsWithSameFlower = $(`.jsc-bafuda[data-flowertype="${flowerType}"]`);
    $bafudaCardsWithSameFlower.removeClass('is-matched-flower-type').addClass('is-selected-flower-type');
  };

  private moveYamafudaToBafuda($yamafuda: JQuery): void {
    alert(`場に同じ月の札がないため、${generateCardNameFromCardElement($yamafuda)}を山札から場札に移動します。`);
    moveCardToBafuda($yamafuda);
    this.refleshBafudaSelection();
  }

  private refleshBafudaSelection(): void {
    $('.jsc-bafuda').off();
    this.enableBafudaSelection();
  }

  private moveYamafudaToAifuda($yamafuda: JQuery): void {
    alert(`場に同じ月の札があるため、${generateCardNameFromCardElement($yamafuda)}を山札から合札に移動します。`);
    moveCardToAifuda($yamafuda);
  }
}

new Index(
  Header,
  Footer
);
