import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function useHitAction() {
  const dispatch = useDispatch();

  return useCallback(
    ({ type, payload }) => {
      dispatch({ type, payload });
    },
    [dispatch]
  );
}
