import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function SelectorTest() {
  const state = useSelector<RootState>((state) => state);
  console.log("SelectorTest is rendering.", state);

  return <div>Selector Test</div>;
}
