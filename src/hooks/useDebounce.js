import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

//lodash에 제공하는 기능 있음. 그거 활용해 볼 것
//formik 이나 react-form-hook같이
//폼 입력을 최적화해준 라이브러리 있으니 앞으로는 활용해볼 것!

//React.memo이용한 렌더링 최적화.. 해야겠지,,?
