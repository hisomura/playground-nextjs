import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function SelectorTest2() {
  // const state = useSelector<RootState, RootState>(
  //   (state) => state,
  //   (oldState, newState) => oldState.tick.tick === newState.tick.tick
  // );
  const state = useSelector<RootState, RootState>((state) => state.tick);
  console.log("SelectorTest2 is rendering.", state);

  return <div>Selector Test2</div>;
}
