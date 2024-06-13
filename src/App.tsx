import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SqlConsoleContextProvider } from './context/SqlConsoleContext';
import { SqlConsole } from './components/sqlConsole/SqlConsole';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <SqlConsoleContextProvider>
      <SqlConsole/>
    </SqlConsoleContextProvider>
  </React.StrictMode>
);
