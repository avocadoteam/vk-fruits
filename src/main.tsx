import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import '@core/vk-bridge/init';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Providers } from './providers';

getStorageKeys();
getUserDataFX();

ReactDOM.createRoot(document.getElementById('app')!).render(<Providers />);
