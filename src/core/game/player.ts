import { FruitItems } from './types';

export type FruitsItemName = `skin__${keyof FruitItems}`;

export type PlayerJoinPayload = {
  avatar: string;
  firstName: string;
  lastName: string;
  selectedSkin: FruitsItemName;
};

export type FruitsGameAction = {
  roomId: string;
  actionType: 'unite' | 'buy';
  uniteFruits?: [number, number];
  product?: 1 | 2 | 3 | 4 | 5 | 6;
};

export type TableData = {
  points: number;
  userId: number;
  table: number[];
  fruitPrices: number[];
};
