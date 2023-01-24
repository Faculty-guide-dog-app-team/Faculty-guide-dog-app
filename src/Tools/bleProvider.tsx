import * as React from 'react';
import {useBLE} from './useBLE';

const bleContext = React.createContext<{
  X: number | null;
  Y: number | null;
  sensorNumber: number;
}>({
  X: null,
  Y: null,
  sensorNumber: 0,
});

export const BLEProvider = ({children}) => {
  // This is the exact same logic that we previously had in our hook

  const [X, Y, sensorNumber] = useBLE();
  const sensorNumberNotNull = sensorNumber === null ? 0 : sensorNumber;

  return (
    <bleContext.Provider
      value={{X: X, Y: Y, sensorNumber: sensorNumberNotNull}}>
      {children}
    </bleContext.Provider>
  );
};

export const useBLEContext = () => {
  const {X, Y, sensorNumber} = React.useContext(bleContext);
  return {X, Y, sensorNumber};
};
