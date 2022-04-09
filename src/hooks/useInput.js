import { useState, useCallback } from "react";

export function useInput(includeFile = false) {
  const [state, setState] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    setState((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const getState = useCallback(() => state, [state]);

  if (includeFile) {
    const handleFile = (e) => {
      e.preventDefault();
      setState((pre) => ({ ...pre, files: e.target.files[0] }));
    };
    return { handleChange, getState, handleFile };
  }
  return { handleChange, getState };
}
