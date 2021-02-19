import { useSelector } from "react-redux";
import { State, wrapper } from "../store/store";
import styles from "../styles/Home.module.css";
import Links from "./links";
import dayjs from "dayjs";
import Tick from "./tick";

type ServerSideProps = {
  time: string;
  score: number;
};

export default function Ssr(props: ServerSideProps) {
  const tick = useSelector<State>((state) => state.tick);
  return (
    <div className={styles.container}>
      <h1>SSR</h1>
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

export const getServerSideProps = wrapper.getServerSideProps<{
  props: ServerSideProps;
}>(({ store }) => {
  const time = dayjs().format("HH:mm:ss.SS");
  console.log("2. Page.getServerSideProps uses the store to dispatch things");
  store.dispatch({ type: "TICK", payload: `TICK in SSR ${time}` });

  return {
    props: {
      time,
      score: Math.floor(Math.random() * 100),
    },
  };
});
