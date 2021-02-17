import { useSelector } from "react-redux";
import { State } from "../store/store";
import styles from "../styles/Home.module.css";
import Links from "./links";

export default function Home() {
  const tick = useSelector<State>((state) => state.tick);
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div>tick: {tick}</div>
      <Links />
    </div>
  );
}
