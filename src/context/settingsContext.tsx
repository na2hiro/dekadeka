import React, {createContext, useCallback, useContext, useState} from "react";

const LOCAL_STORAGE_KEY = "dekadeka:settings";

type Setting = {
    isBold: boolean
}
const defaultSetting: Setting = {
    isBold: false
}

function loadSettings() {
    try {
        const str = localStorage.getItem(LOCAL_STORAGE_KEY);
        return str ? JSON.parse(str) : defaultSetting;
    } catch (e) {
        return defaultSetting
    }
}

const Context = createContext<[Setting, (partial: Partial<Setting>) => void]>([defaultSetting, () => {
}]);

export const SettingsContextProvider: React.FC = ({children}) => {
    const [object, setObject] = useState<Setting>(() => loadSettings());
    const setValue = useCallback((partialSetting: Partial<Setting>) => {
        const newObj = {
            ...object,
            ...partialSetting,
        };
        setObject(newObj)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newObj));
    }, []);
    return (
        <Context.Provider value={[object, setValue]}>
            {children}
        </Context.Provider>
    )
}

export const useSettings = () => useContext(Context);