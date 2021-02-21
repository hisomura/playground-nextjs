import { useSelector } from "react-redux";
import { State } from "../store/store";

export default function SelectorTest() {
  const state = useSelector<State>((state) => state);
  console.log("SelectorTest is rendering.", state);

  return <div>Selector Test</div>;
}
