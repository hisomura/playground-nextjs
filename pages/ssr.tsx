import { useSelector } from "react-redux";
import { State } from "../store/store";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
import Links from "./links";
import dayjs from "dayjs";

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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  _context
) => ({
  props: {
    time: dayjs().format("HH:mm:ss.SS"),
    score: Math.floor(Math.random() * 100),
  },
});
