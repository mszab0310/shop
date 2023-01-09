import { createContext } from "react";
export interface ISearchContext {
  dispatchSearchEvent: (actiontype: any, query: any) => {};
  searchQuery: string;
}

const context = { dispatchSearchEvent: (actiontype: any, query: any) => {}, searchQuery: "" };

export const AppContext = createContext(context);
