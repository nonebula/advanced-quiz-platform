import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";

let timer: NodeJS.Timer;
export function Timer(props: { max: number; onFinished: () => void }) {
  const [progress, setProgress] = useState<number>(props.max);

  useEffect(() => {
    if (progress <= 0) {
      props.onFinished();
      clearInterval(timer);
    }
  }, [progress]);

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress max={props.max} value={progress}>
      <CircularProgressLabel>{progress}</CircularProgressLabel>
    </CircularProgress>
  );
}
