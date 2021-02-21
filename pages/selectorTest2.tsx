import { useSelector } from "react-redux";
import { State } from "../store/store";

export default function SelectorTest2() {
  const state = useSelector<State, State>(
    (state) => state,
    (oldState, newState) => oldState.tick === newState.tick
  );
  console.log("SelectorTest2 is rendering.", state);

  return <div>Selector Test2</div>;
}
