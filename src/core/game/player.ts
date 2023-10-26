import { FruitItems } from './types';

export type FruitsItemName = `skin__${keyof FruitItems}`;

export type PlayerJoinPayload = {
  avatar: string;
  firstName: string;
  lastName: string;
  selectedSkin: FruitsItemName;
};
export type FruitGameFreeze = {
  freezingTime: number;
  freezingFruit: number;
};
export type FruitGameTableElem = number | FruitGameFreeze;

export type FruitsGameTable = {
  userId: number;
  points: number;
  table: FruitGameTableElem[];
  fruitPrices: number[];
  actionPrices: [freeze: number];
};

export type FruitsGameAction = {
  roomId: string;
  uniteFruits?: [{ points: number; position: number }, { points: number; position: number }];
  actionType: 'unite' | 'buy' | 'freeze';
  product?: 1 | 2 | 3 | 4 | 5 | 6;
  target?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export type FruitsGameUserData = {
  userId: number;
  avatar: string;
  firstName: string;
  lastName: string;
  selectedSkin: FruitsItemName;
  confirmed: boolean;
  points: number;
  pts: number;
};
