import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './main.css'

const strict = true;
const app = <App />;
const strictApp = <React.StrictMode><App /></React.StrictMode>;
const targetApp = strict ? strictApp : app;
if (!strict) console.error("App is not running in strict mode! This should only be done for temporary debugging purposes!");

const root = createRoot(document.getElementById('root')!);
root.render(targetApp);