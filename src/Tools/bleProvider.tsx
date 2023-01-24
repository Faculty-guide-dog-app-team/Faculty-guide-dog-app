import * as React from 'react';
import {Sensor} from './Sensor';
import {useBLE} from './useBLE';

const bleContext = React.createContext<{sensorsConnected: Sensor[]}>({
  sensorsConnected: [],
});

export const BLEProvider = ({children}) => {
  // This is the exact same logic that we previously had in our hook

  const sensorsConnected = useBLE();

  return (
    <bleContext.Provider value={{sensorsConnected}}>
      {children}
    </bleContext.Provider>
  );
};

export const useBLEContext = () => {
  const {sensorsConnected} = React.useContext(bleContext);
  return {sensorsConnected};
};
