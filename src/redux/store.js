import {combineReducers, createStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import app from './app'

const appPersistConfig = {
   key: 'app',
   storage,
   whitelist: ['token', 'user']
}

const persistedReducer = combineReducers({
   app: persistReducer(appPersistConfig, app)
})

export const store = createStore(
  persistedReducer
)

export const persistor = persistStore(store)
