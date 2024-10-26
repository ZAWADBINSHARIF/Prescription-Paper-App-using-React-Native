import { GlobalContext } from '@/context/GlobalValueProvider';
import React, { useContext } from 'react';

const useGlobalContext = () => {

    const GlobalContextValues = useContext(GlobalContext);

    if (!GlobalContextValues) {
        throw Error("Wrap the root component using GlobalContextProvider component");
    }

    return GlobalContextValues;
};

export default useGlobalContext;