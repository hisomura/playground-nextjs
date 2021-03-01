import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import styles from "../styles/Home.module.css";
import Links from "./links";

export default function Foo() {
  const tick = useSelector<RootState>((state) => state.tick.tick);
  return (
    <div className={styles.container}>
      <h1>Foo</h1>
      <div>tick: {tick}</div>
      <Links />
    </div>
  );
}
