import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from 'ReduxStore/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import '@pwabuilder/pwaupdate'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
      {/* <pwa-update></pwa-update> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();
serviceWorkerRegistration.register({
  onUpdate: (worker) => {
    console.log('onUpdate');
    if(worker?.waiting?.postMessage){
      console.log('before postMessage');

      worker.waiting.postMessage({ type: 'SKIP_WAITING' });
      console.log('after postMessage');

      window.location.reload(true);
    }
  },
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
