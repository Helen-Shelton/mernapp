import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


/*
MY NOTES

In 'frontend/src/app/store', whenever we create a Redux resource or a state resource 
(like "Users or Goals"), we need to add a 'Reducer' from a 'Slice' and then 
add it to the 'store' (see store.js for more details)
ex.

import counterReducer from '../features/counter/counterSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },

*/