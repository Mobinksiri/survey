import { useEffect, useState } from "react";

type EffectCallback = () => void;
type DependencyList = React.DependencyList;

export const useEffectSkipFirstRender = (
   callBack: EffectCallback,
   dependencies: DependencyList
) => {
   const [count, setCount] = useState<number>(0);
   useEffect(() => {
      if (count > 0) {
         callBack();
      }
      setCount((s) => s + 1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, dependencies);
};
