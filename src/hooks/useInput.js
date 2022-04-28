import { useState, useCallback } from "react";

export function useInput(initialValue, includeFile = false) {
  const [state, setState] = useState(initialValue);
  const handleChange = (e) => {
    setState((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const getState = () => {
    return state;
  };

  if (includeFile) {
    const handleFile = (e) => {
      e.preventDefault();
      setState((pre) => ({ ...pre, files: e.target.files[0] }));
    };
    const handleFileCustom = (e) => {
      const binarydata = e.target.files[0];
      const base64Data = window.btoa(binarydata);
      setState((pre) => ({ ...pre, files: base64Data }));
    };
    return { handleChange, getState, handleFile, handleFileCustom, state };
  }
  return { handleChange, getState, state };
}
