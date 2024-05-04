import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quote } from "../../models/Quote/Quote.model";

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
  },
});

export const { addQuote } = quotesSlice.actions;

export default quotesSlice.reducer;
