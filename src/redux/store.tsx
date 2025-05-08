import {configureStore} from '@reduxjs/toolkit'; //configureStore comes preconfigured with good defaults, eliminates manual middleware setup, and integrates DevTools out of the box.
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  persistReducer,
} from 'redux-persist'; //to persist (save) parts of the Redux state (e.g., user) across app restarts (like AsyncStorage on React Native)
import reduxStorage from './storage';
import rootReducer from './rootReducer';
// we use it for data persist when app close and gets reopen
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  blacklist: [],
  whitelist: ['user'], //We usually only persist important, non-volatile data (like user session info) to avoid bloating storage or persisting unnecessary UI state.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
