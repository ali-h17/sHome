import { createContext, useState } from 'react';

// Define the initial state
const initialState = {
	smoke: false,
};

export const Context = createContext(initialState);

const Store = ({ children }) => {
    const [state, setState] = useState(initialState);

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    );
}

export default Store;
