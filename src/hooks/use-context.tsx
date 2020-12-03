import React, { useContext } from 'react';

// import {IGlobalContextType} from 'src/types/context';
type IGlobalContextType = any;
const defContextInterface = {} as IGlobalContextType;

// {Provider, Consumer}
export const RootContext = React.createContext<IGlobalContextType>(defContextInterface);
// get object with all useState
export const useRootContext = (): IGlobalContextType => useContext(RootContext);

export default useRootContext;
