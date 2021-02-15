import { useSelector } from "react-redux";
import { State } from "../store/store";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Bar() {
  const tick = useSelector<State>((state) => state.tick);
  return (
    <div className={styles.container}>
      <h1>Bar</h1>
      <div>tick: {tick}</div>
      <Link href="/">Home</Link>
      <Link href="/foo">Foo</Link>
      <Link href="/bar">Bar</Link>
    </div>
  );
}
