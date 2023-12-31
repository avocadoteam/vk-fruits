import { getUserInfoFX } from '@core/api/game/effects.game';
import { setOffline, setOnline } from '@core/config';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import { qVK } from '@core/data/q-params';
import { connectWS } from '@core/sockets/game';
import '@core/vk-bridge/init';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Providers } from './providers';

getStorageKeys();
getUserDataFX();
getUserInfoFX();
connectWS(qVK);

window.addEventListener('offline', () => {
  console.log('offline');
  setOffline();
});

window.addEventListener('online', () => {
  console.log('online');
  setOnline();
});

ReactDOM.createRoot(document.getElementById('app')!).render(<Providers />);
