import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import styles from "../styles/Home.module.css";
import Links from "./links";
import SelectorTest from "./selectorTest";
import SelectorTest2 from "./selectorTest2";
import Tick from "./tick";

export default function Home() {
  const tick = useSelector<RootState>((state) => state.tick.tick);
  console.log("Home is rendering.", tick);

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div>tick: {tick}</div>
      <Links />
      <Tick />
      <SelectorTest />
      <SelectorTest2 />
    </div>
  );
}
