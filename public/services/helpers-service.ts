import { Card } from './cards-service';

export function isKasu(cards: Array<Card>): boolean {
  if (cards.length < 10) return false;
  const kasuCards = cards.filter(c => c.point === 1);
  return kasuCards.length >= 10;
}

export function isTanzaku(cards: Array<Card>): boolean {
  if (cards.length < 5) return false;
  const tanzakuCards = cards.filter(c => c.point === 5);
  return tanzakuCards.length >= 5;
}
