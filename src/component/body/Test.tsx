import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, stop } from "../../redux/counterSlice";
import { useEffect, useState } from "react";

export default function Test() {
  const count = useSelector((state: any) => state.counter.count);
  const dispatch = useDispatch();
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    if (!mode) return;

    const timer = setInterval(() => {
      if (mode == "increment") {
        dispatch(increment());
      } else if (mode == "decrement") {
        dispatch(decrement());
      } else if (mode == "stop") {
        dispatch(stop());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, mode]);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setMode("increment")}>Increment</button>

      <button onClick={() => setMode("decrement")}>Decrement</button>
      <button onClick={() => setMode("stop")}>stop</button>
    </>
  );
}
