import { createStore, AnyAction } from "redux";
import { MakeStore, createWrapper, Context, HYDRATE } from "next-redux-wrapper";

export interface State {
  tick: string;
}

// create your reducer
const reducer = (state: State = { tick: "init" }, action: AnyAction) => {
  console.log(state, action);
  //
  // @ts-ignore
  // if (state === false) {
  //   return {tick: "init"}
  // }
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore: MakeStore<State> = (_context: Context) =>
  createStore(
    reducer,
    typeof window !== "undefined" &&
      (window as any)?.__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any)?.__REDUX_DEVTOOLS_EXTENSION__()
  );

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
