import React from 'react'

export const ModalContext = React.createContext({})
export const useModalContext = () => React.useContext(ModalContext)

export const ModalContextProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const [initialEditState, setInitialEditState] = React.useState({})

  const value = {
    open,
    setOpen,
    initialEditState,
    setInitialEditState
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
