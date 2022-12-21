import { createContext, useState } from "react";

export const FileContext = createContext({
    file: '',
    setFile: () => { },
    loading: false,
    setLoading: () => { },
    fileName: '',
    setFileName: () => { },
    showButton: false,
    setShowButton: () => { }
});

export const FileProvider = ({ children }) => {
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [showButton, setShowButton] = useState(false);

    const value = {
        file,
        setFile,
        loading,
        setLoading,
        fileName,
        setFileName,
        showButton,
        setShowButton
    }
    return <FileContext.Provider value={value} >{children}</FileContext.Provider>
}