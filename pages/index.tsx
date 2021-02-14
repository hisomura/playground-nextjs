import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { State } from "../store/store";

export default function Home() {
  const tick = useSelector<State>((state) => state.tick);
  return (
    <div className={styles.container}>
      <div>tick: {tick}</div>
    </div>
  );
}
