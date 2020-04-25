import * as $ from 'jquery';

import * as Enums from "../../resources/constants/enums";

import { Card, convertCardElementToCard, generateImageFileName } from './cards-service';
import { generateYakuByCurrentCards } from './actions-service';

type CardClassName = 'jsc-bafuda' | 'jsc-tefuda' | 'jsc-yamafuda' | 'jsc-aifuda';

export function generateCardElement(card: Card, className: CardClassName | ''): string {
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

export function moveCardToBafuda($card: JQuery): void {
  const card = convertCardElementToCard($card);
  $('#jsi-bafuda').append(generateCardElement(card, 'jsc-bafuda'));
  $card.remove();
}

export function moveCardToAifuda($card: JQuery): void {
  const card = convertCardElementToCard($card);
  $('#jsi-aifuda').append(generateCardElement(card, 'jsc-aifuda'));
  $card.remove();

  updateCurrentYaku();
}

export function moveCardToSutefuda($card: JQuery): void {
  const card = convertCardElementToCard($card);
  $('#jsi-sutefuda').prepend(generateCardElement(card, ''));
  $card.remove();
}

function updateCurrentYaku(): void {
  $('#jsi-dekiyaku').empty().append(generateDekiyakuElements());
}

function generateDekiyakuElements(): string {
  const cards = Array.from($('.jsc-aifuda')).map($c => convertCardElementToCard($($c)));
  const yakus = generateYakuByCurrentCards(cards).map(yaku => {
    const yakuEnums = Enums.yakusValues.find(yakuValue => yakuValue.code === yaku);
    if (yakuEnums) return yakuEnums.name;
  });
  return yakus.map(yaku => `<li>${yaku}</li>`).join('');
}
