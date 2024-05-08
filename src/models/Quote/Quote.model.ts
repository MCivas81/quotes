export interface Quote {
  id: number | string;
  text: string;
  author: string;
}

export interface QuoteFormValues {
  quote: string;
  author: string;
}

export interface RandomQuote {
  _id: string;
  content: string;
  author?: string;
}
