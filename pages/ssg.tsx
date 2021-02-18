import { useSelector } from "react-redux";
import { State } from "../store/store";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import Links from "./links";
import dayjs from "dayjs";

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
    </div>
  );
}

export const getStaticProps: GetStaticProps<StaticProps> = async (
  _context
) => ({
  props: {
    time: dayjs().format("HH:mm:ss.SS"),
    score: Math.floor(Math.random() * 100),
  },
});
