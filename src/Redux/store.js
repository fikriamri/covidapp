import { createStore } from "redux";
import reducers from "./reducers/index";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuration of redux persist
const persistConfig = {
  key: 'store',
  storage,
  whitelist: ['loginReducer'],
};

// Persisting reducers
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
