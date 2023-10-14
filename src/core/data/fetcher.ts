import { BASE_URL } from '@core/constants';
import axios from 'axios';

export const AX = axios.create({
  baseURL: `${BASE_URL}/api`,
});
