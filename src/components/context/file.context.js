import { createContext, useState } from "react";

export const FileContext = createContext({
    file: '',
    setFile: () => { },
    loading: false,
    setLoading: () => { },
    fileName: '',
    setFileName: () => { }
});

export const FileProvider = ({ children }) => {
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const value = {
        file,
        setFile,
        loading,
        setLoading,
        fileName,
        setFileName
    }
    return <FileContext.Provider value={value} >{children}</FileContext.Provider>
}