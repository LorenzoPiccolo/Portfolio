// src/main.jsx
import App from './App.jsx';
import './index.css';
import renderApp from './renderApp.jsx';

import { BrowserRouter } from 'react-router-dom';

const Root = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

renderApp(Root);
