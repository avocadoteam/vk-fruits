export enum FruitsPaidFeatureTypeUI {
  FruitsGift = 'gift',
  FruitsGift3x = 'gift_3x',
  FruitsSubMonth = 'fruits_sub_month',
  FruitsSubFV = 'fruits_sub_fv',
}

export type Fruits = 'watermelon' | 'green_apple' | 'grapes' | 'red_apple' | 'banana' | 'cherries';
export type Vegs = 'broccoli' | 'eggplant' | 'corn' | 'carrot' | 'avocado' | 'potato';

export type Sweets = 'soft_ice' | 'shov_ice' | 'ice_cream' | 'doughnut' | 'cookie' | 'cake';

export type Junks = 'french_fries' | 'hamburger' | 'hot_dog' | 'pancakes' | 'pizza' | 'taco';

export type Sea = 'oyster' | 'shrimp' | 'fried_shrimp' | 'squid' | 'crab' | 'lobster';

export type Cloud = 'sun' | 'cloud' | 'cloud_snow' | 'cloud_rain' | 'cloud_lightning' | 'cloud_lightning_rain';
export type Moon = 'moon_1' | 'moon_2' | 'moon_3' | 'moon_4' | 'moon_5' | 'saturn';
export type Car = 'bus' | 'car' | 'kick_scooter' | 'motor_scooter' | 'motorcycle' | 'racing_car';
export type Air = 'helicopter' | 'parachute' | 'plane' | 'rocket' | 'small_plane' | 'ufo';
export type Candy = 'candy' | 'lollipop' | 'chocolate' | 'pie' | 'shortcake' | 'cake';
export type Building = 'bank' | 'house' | 'hut' | 'office' | 'stadium' | 'store';
export type Ball = 'baseball' | 'basketball' | 'football' | 'pool_ball' | 'softball' | 'volleyball';
export type Fear = 'alien_bit' | 'alien' | 'clown' | 'dyno' | 'ghost' | 'robot';
export type Evolution = 'ant' | 'coral' | 'cow' | 'goose' | 'lizard' | 'microbe';
export type Plant = 'blossom' | 'cactus' | 'hyacinth' | 'rice' | 'seedling' | 'sunflower';

export type GameItemNames =
  | Fruits
  | Vegs
  | Sweets
  | Junks
  | Sea
  | Cloud
  | Moon
  | Car
  | Air
  | Candy
  | Building
  | Ball
  | Fear
  | Evolution
  | Plant;

export type FruitItems = {
  fruits: { name: Fruits; src: string; points: number }[];
  veg: { name: Vegs; src: string; points: number }[];
  sweets: { name: Sweets; src: string; points: number }[];
  junk: { name: Junks; src: string; points: number }[];
  sea: { name: Sea; src: string; points: number }[];
  clouds: { name: Cloud; src: string; points: number }[];
  cars: { name: Car; src: string; points: number }[];
  airs: { name: Air; src: string; points: number }[];
  candies: { name: Candy; src: string; points: number }[];
  buildings: { name: Building; src: string; points: number }[];
  balls: { name: Ball; src: string; points: number }[];
  fears: { name: Fear; src: string; points: number }[];
  evolutions: { name: Evolution; src: string; points: number }[];
  plants: { name: Plant; src: string; points: number }[];
  moons: { name: Moon; src: string; points: number }[];
};
