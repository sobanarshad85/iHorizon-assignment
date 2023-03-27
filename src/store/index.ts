import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './api/pokemonApi';
import pokemonReducer from './pokemonSlice';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const reducers = combineReducers({
  pokemon: pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,

});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['pokemon'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, logger),
});
setupListeners(store.dispatch);
export default store;
