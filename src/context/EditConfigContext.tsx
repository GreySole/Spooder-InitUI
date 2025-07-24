import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  CircleLoader,
  SpooderPet,
  ThemeProvider,
} from "@greysole/spooder-component-library";
import { getData } from "../Request";
import { ConfigFile, NetworkInterface } from "../Types";
import App from "../App";

// Create the context
const EditConfigContext = createContext({
  config: {} as ConfigFile,
  setConfig: (config: ConfigFile) => {},
  nets: [] as NetworkInterface[],
  refetch: () => new Promise<void>((res) => res()),
});

// Create a provider component
export function EditConfigContextProvider() {
  const [spooder, setSpooder] = useState<SpooderPet | undefined>();
  const [config, setConfig] = useState<ConfigFile | undefined>();
  const [nets, setNets] = useState<NetworkInterface[] | undefined>();
  const refetch = useCallback(() => {
    return new Promise<void>((res, rej) => {
      getData()
        .then((data) => {
          setNets(data.nets);
          setSpooder(data.themes.spooderpet as SpooderPet);
          setConfig(data.config as ConfigFile);
          res();
        })
        .catch((e) => {
          rej(e);
        });
    });
  }, [setSpooder, setConfig, setNets]);

  useEffect(() => {
    // Fetch nets from Request.ts
    refetch();
  }, [refetch]);

  if (!nets || !spooder || !config) {
    return null;
  }

  return (
    <EditConfigContext.Provider
      value={{ config, setConfig, nets, refetch }}
    ></EditConfigContext.Provider>
  );
}

// Custom hook to use the editConfigContext
export function useEditConfigContext() {
  const context = useContext(EditConfigContext);
  if (!context) {
    throw new Error("useEditConfigContext must be used within an InitProvider");
  }
  return context;
}
