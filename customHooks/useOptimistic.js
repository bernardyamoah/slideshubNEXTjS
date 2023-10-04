import { useState, useCallback } from "react";

const useOptimistic = (initialState) => {
  const [state, setState] = useState(initialState);
  const optimisticUpdate = useCallback((updateFn) => {
    setState((prevState) => {
      const updatedState = updateFn(prevState);
      return updatedState;
    });
  }, []);

  return [state, optimisticUpdate];
};

export default useOptimistic;