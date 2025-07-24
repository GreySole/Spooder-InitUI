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
const InitContext = createContext({
  theme: { hue: 0, saturation: 0, isDarkTheme: true },
  setTheme: (theme: any) => {},
  config: {} as ConfigFile,
  setConfig: (config: ConfigFile) => {},
  nets: [] as NetworkInterface[],
  refetch: () => new Promise<void>((res) => res()),
  isFirstTime: true,
});

// Create a provider component
export function InitProvider() {
  const [theme, setTheme] = useState({
    hue: 0.5,
    saturation: 1,
    isDarkTheme: true,
  });
  const [spooder, setSpooder] = useState<SpooderPet | undefined>();
  const [config, setConfig] = useState<ConfigFile | undefined>();
  const [nets, setNets] = useState<NetworkInterface[] | undefined>();
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const refetch = useCallback(() => {
    return new Promise<void>((res, rej) => {
      getData()
        .then((data) => {
          setNets(data.nets);
          if (Object.keys(data.themes.webui).length > 0) {
            const newHue = data.themes.webui?.hue;
            const newSaturation = data.themes.webui?.saturation;
            const newIsDarkTheme = data.themes.webui?.isDarkTheme;
            setIsFirstTime(false);
            setTheme({
              hue: newHue ?? 0.5,
              saturation: newSaturation ?? 1,
              isDarkTheme: newIsDarkTheme ?? true,
            });
          }

          setSpooder(data.themes.spooderpet as SpooderPet);
          setConfig(data.config as ConfigFile);
          res();
        })
        .catch((e) => {
          rej(e);
        });
    });
  }, [setSpooder, setConfig, setNets, setTheme]);

  useEffect(() => {
    // Fetch nets from Request.ts
    refetch();
  }, [refetch]);

  if (!nets || !theme || !spooder || !config) {
    return null;
  }

  return (
    <InitContext.Provider
      value={{ theme, setTheme, config, setConfig, nets, refetch, isFirstTime }}
    >
      <ThemeProvider theme={theme} spooder={spooder}>
        <App />
      </ThemeProvider>
    </InitContext.Provider>
  );
}

// Custom hook to use the InitContext
export function useInitContext() {
  const context = useContext(InitContext);
  if (!context) {
    throw new Error("useInitContext must be used within an InitProvider");
  }
  return context;
}
