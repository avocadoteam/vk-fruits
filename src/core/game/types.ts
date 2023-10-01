export type Fruits = 'watermelon' | 'green_apple' | 'grapes' | 'red_apple' | 'banana' | 'cherries';
export type Vegs = 'broccoli' | 'eggplant' | 'corn' | 'carrot' | 'avocado' | 'potato';

export type Sweets = 'soft_ice' | 'shov_ice' | 'ice_cream' | 'doughnut' | 'cookie' | 'cake';

export type Junks = 'french_fries' | 'hamburger' | 'hot_dog' | 'pancakes' | 'pizza' | 'taco';

export type Sea = 'oyster' | 'shrimp' | 'fried_shrimp' | 'squid' | 'crab' | 'lobster';

export type GameItemNames = Fruits | Vegs | Sweets | Junks | Sea;

export type FruitItems = {
  fruits: { name: Fruits; src: string; score: number }[];
  veg: { name: Vegs; src: string; score: number }[];
  sweets: { name: Sweets; src: string; score: number }[];
  junk: { name: Junks; src: string; score: number }[];
  sea: { name: Sea; src: string; score: number }[];
};
