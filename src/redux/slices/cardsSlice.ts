import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {CardInterface} from '../../components/Card';

/**
 * State interface
 */
interface CardsSliceInterface {
  page: number;
  cardAdded: boolean;
  loading: boolean;
  loadingSearch: boolean;
  cards: {
    [key: number]: CardInterface;
  };
  searchCards: {
    [key: number]: CardInterface;
  };
  shoppingCart: {
    [key: number]: CardInterface;
  };
}

/**
 * Normalized state structure
 */
const initialState: CardsSliceInterface = {
  page: 0,
  cardAdded: false,
  loading: false,
  loadingSearch: false,
  cards: {},
  shoppingCart: {},
  searchCards: {},
};

/**
 * Thunks
 * -> https://redux-toolkit.js.org/api/createAsyncThunk
 */

/**
 * Fetches cards by page
 */
export const fetchCards = createAsyncThunk(
  'cards/updateCards',
  async (page: number, thunkAPI) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`,
    );
    return response.data;
  },
);

/**
 * Search cards by page
 */
export const searchCards = createAsyncThunk(
  'cards/searchCards',
  async (name: string, thunkAPI) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${name}`,
    );
    return response.data;
  },
);

/**
 * Add cards to shopping card
 */
export const addToShoppingCard = createAsyncThunk(
  'cards/addToShoppingCard',
  async (id: number, _) => {
    return id;
  },
);

/**
 * Remove cards to shopping card
 */
export const removeFromShoppingCard = createAsyncThunk(
  'cards/removeFromShoppingCard',
  async (id: number, _) => {
    return id;
  },
);

/**
 * Slice
 */
const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    /**
     * Immer makes it immutable under the hood
     * -> https://immerjs.github.io/immer/
     */
    toogledSavedCard(state, action: PayloadAction<number>) {
      const id = action.payload;
      const card = state.cards[id];
      const saved = card.saved ? true : false;
      state.cards = {
        ...state.cards,
        [id]: {...card, saved: !saved},
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCards.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      const extraCards: {[key: number]: CardInterface} = {};
      const {results, info} = action.payload;
      const nextPage = info.next ? info.next.split('page=')[1] : 3000;
      results.forEach((card: CardInterface) => {
        extraCards[card.id] = card;
      });
      state.cards = extraCards;
      state.page = nextPage;
      state.loading = false;
      /**
       * Similiar to: return {
       * ...state,
       *  cards: {
       *    ...state.cards,
       *    extraCards
       *  }
       * }
       */
    });
    builder.addCase(searchCards.pending, (state, action) => {
      state.loadingSearch = true;
    });
    builder.addCase(searchCards.rejected, (state, action) => {
      state.loadingSearch = false;
    });
    builder.addCase(searchCards.fulfilled, (state, action) => {
      const extraCards: {[key: number]: CardInterface} = {};
      const {results, info} = action.payload;
      results.forEach((card: CardInterface) => {
        extraCards[card.id] = card;
      });
      state.searchCards = extraCards;
      state.loadingSearch = false;
    });
    builder.addCase(addToShoppingCard.fulfilled, (state, action) => {
      const id = action.payload;
      const card = state.cards[id];
      state.shoppingCart = {
        ...state.shoppingCart,
        [card.id]: card,
      };
      state.cardAdded = !state.cardAdded;
    });
    builder.addCase(removeFromShoppingCard.fulfilled, (state, action) => {
      const id = action.payload;
      const newShopingCards = {...state.shoppingCart};
      delete newShopingCards[id];
      state.shoppingCart = newShopingCards;
    });
  },
});

export const {toogledSavedCard} = cardsSlice.actions;

export default cardsSlice.reducer;
