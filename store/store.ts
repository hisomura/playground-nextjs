import createSagaMiddleware, { Task } from "@redux-saga/core";
import dayjs from "dayjs";
import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux";
import { call, put, takeEvery } from "redux-saga/effects";

export interface TickState {
  tick: string;
}

export interface HelloState {
  name: string;
  count: number;
}

export interface SagaStore extends Store {
  sagaTask?: Task;
}

// create your reducer
const tickReducer = (
  state: TickState = { tick: "init" },
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "TICK":
      return { ...state, tick: action.payload };
    case "RETURN_NEW":
      return { ...state };
    default:
      return state;
  }
};

const helloReducer = (
  state: HelloState = { name: "foo", count: 0 },
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "TICK":
      console.log("hello, tick", state);
      return { ...state, tick: action.payload };
    case "HELLO":
      return { ...state, tick: "Hello, World!" };
    case "HOGE":
      state.name = "aiueo";
      return state;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  tick: tickReducer,
  hello: helloReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

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

const makeStore: MakeStore<TickState> = (_context: Context) => {
  const sagaMiddleware = createSagaMiddleware();

  // const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<TickState>(makeStore, { debug: true });
