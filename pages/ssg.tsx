import { useSelector } from "react-redux";
import { State, wrapper } from "../store/store";
import styles from "../styles/Home.module.css";
import Links from "./links";
import dayjs from "dayjs";
import Tick from "./tick";

type StaticProps = {
  time: string;
  score: number;
};

export default function Ssg(props: StaticProps) {
  const tick = useSelector<State>((state) => state.tick);
  return (
    <div className={styles.container}>
      <h1>SSG</h1>
      <div>
        date: {props.time}
        score: {props.score}
      </div>
      <div>tick: {tick}</div>
      <Links />
      <Tick />
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps<{
  props: StaticProps;
}>(({ store }) => {
  const time = dayjs().format("HH:mm:ss.SS");
  console.log("2. Page.getStaticProps uses the store to dispatch things");
  store.dispatch({ type: "TICK", payload: `TICK in SSG ${time}` });

  return {
    props: {
      time,
      score: Math.floor(Math.random() * 100),
    },
  };
});
