import { useDispatch } from "react-redux";

export default function Tick() {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: "TICK", payload: "Tick 1 clicked." });
        }}
      >
        Tick 1
      </button>
      <button
        onClick={() => {
          dispatch({ type: "TICK", payload: "Tick 2 clicked." });
        }}
      >
        Tick 2
      </button>

      <button
        onClick={() => {
          dispatch({ type: "HELLO" });
        }}
      >
        Hello
      </button>

      <button
        onClick={() => {
          dispatch({ type: "NOTHING" });
        }}
      >
        Nothing
      </button>

      <button
        onClick={() => {
          dispatch({ type: "HOGE" });
        }}
      >
        Hoge
      </button>

      <button
        onClick={() => {
          dispatch({ type: "RETURN_NEW" });
        }}
      >
        RETURN_NEW tick state
      </button>

      <button
        onClick={() => {
          dispatch({ type: "TEST_SAGA_WORKER" });
        }}
      >
        Test Saga
      </button>
    </>
  );
}
