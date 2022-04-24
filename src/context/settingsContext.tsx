import React, {createContext, useCallback, useContext, useState} from "react";

const LOCAL_STORAGE_KEY = "dekadeka:settings";

type Setting = {
    isBold: boolean,
    textColor: string,
    bgColor: string,
}
const defaultSetting: Setting = {
    isBold: false,
    textColor: "#000000",
    bgColor: "#ffffff",
}

function loadSettings() {
    try {
        const str = localStorage.getItem(LOCAL_STORAGE_KEY);
        return str ? {...defaultSetting, ...JSON.parse(str)} : defaultSetting;
    } catch (e) {
        return defaultSetting
    }
}

const Context = createContext<[Setting, (partial: Partial<Setting>) => void]>(
    [defaultSetting, () => {
    }]
);

export const SettingsContextProvider: React.FC = ({children}) => {
    const [object, setObject] = useState<Setting>(() => loadSettings());
    const setValue = useCallback((partialSetting: Partial<Setting>) => {
        const newObj = {
            ...object,
            ...partialSetting,
        };
        setObject(newObj)

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newObj));
    }, [object]);
    return (
        <Context.Provider value={[object, setValue]}>
            {children}
        </Context.Provider>
    )
}

export const useSettings = () => useContext(Context);