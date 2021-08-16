import {configureStore} from '@reduxjs/toolkit';
import cardsReducer from '../slices/cardsSlice';

export const store = configureStore({
  /**
   * All reducers are combined in the object
   */
  reducer: {
    cards: cardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
