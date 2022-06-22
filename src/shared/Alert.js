import { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

export const AlertContext = createContext([]);

const AlertBox = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 10000;
  background-color: black;
  color: white;
`;

//기능이..추가 되어야 하는데.

const AlertItem = (item) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      item.timeOver();
    }, item.duration ?? 1000);
    return () => clearTimeout(timer);
  }, []);
  return <div>{item.text}</div>;
};

export const AlertList = ({ msg, duration }) => {
  const [alertList, setAlertList] = useContext(AlertContext);
  useEffect(() => {
    if (!!msg) {
      const tmp = [...alertList];
      tmp.push({ id: tmp.length + 1, text: msg, duration: duration ?? 1000 });
      setAlertList(tmp);
    }
  }, []);

  const timeOver = (idx) => {
    return () => {
      const updatedList = [...alertList];
      updatedList.splice(idx, 1);
      setAlertList(updatedList);
    };
  };

  return (
    <AlertBox>
      {alertList.map((alert, idx) => (
        <AlertItem
          key={alert.id}
          {...alert}
          idx={idx}
          timeOver={timeOver(idx)}
        />
      ))}
    </AlertBox>
  );
};

export function AlertProvider({ children }) {
  const alertMsg = useState([
    { id: 1, text: "mymistake", duration: 1000 },
    { id: 5, text: "읭", duration: 7000 },
  ]);
  return (
    <AlertContext.Provider value={alertMsg}>{children}</AlertContext.Provider>
  );
}
