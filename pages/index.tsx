import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/store";
import styles from "../styles/Home.module.css";
import Links from "./links";

export default function Home() {
  const dispatch = useDispatch();
  const tick = useSelector<State>((state) => state.tick);

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div>tick: {tick}</div>
      <Links />
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
    </div>
  );
}
