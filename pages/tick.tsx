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
    </>
  );
}
