import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quote } from "../../models/Quote/Quote.model";
import { RootState } from "../store";

interface QuotesState {
  quotes: Quote[];
}

const initialState: QuotesState = {
  quotes: [],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    addQuote(state, action: PayloadAction<Quote>) {
      state.quotes.unshift(action.payload);
    },
    deleteQuote(state, action: PayloadAction<number | string>) {
      state.quotes = state.quotes.filter((quote) => quote.id !== action.payload);
    },
  },
});

export const { addQuote, deleteQuote } = quotesSlice.actions;

export const selectQuotes = (state: RootState) => state.quotes.quotes;

export default quotesSlice.reducer;
