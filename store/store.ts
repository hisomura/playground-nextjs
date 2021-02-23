import createSagaMiddleware, { Task } from "@redux-saga/core";
import dayjs from "dayjs";
import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, compose, createStore, Store } from "redux";
import { call, put, takeEvery } from "redux-saga/effects";

export interface State {
  tick: string;
}

export interface SagaStore extends Store {
  sagaTask?: Task;
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

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).window.__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
//  サンプル見る限りこれで動きそうだったけどfunctionじゃなくて動かないって言われてしまった
//  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

function hello() {
  const start = dayjs();
  while (dayjs().diff(start) < 1000);
  const time = dayjs().format("HH:mm:ss");
  return `hello${time}`;
}

function* testSagaWorker() {
  try {
    const message = yield call(hello);
    yield put({ type: "TICK", payload: `saga worked: ${message}` });
  } catch (e) {
    yield put({ type: "TICK", message: e.message });
  }
}

function* rootSaga() {
  yield takeEvery("TEST_SAGA_WORKER", testSagaWorker);
}

const makeStore: MakeStore<State> = (_context: Context) => {
  const sagaMiddleware = createSagaMiddleware();

  // const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
