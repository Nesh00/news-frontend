import { createContext, useState } from 'react';

export const RegisterContext = createContext({ isOpen: false });

const RegisterContextProvider = (props) => {
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <RegisterContext.Provider value={{ openRegister, setOpenRegister }}>
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;
