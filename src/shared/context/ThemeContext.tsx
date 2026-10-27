import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

// Union Types schließen ungültige Theme-Werte bereits beim Kompilieren aus.
export type ThemeMode = "light" | "dark";
type ThemeContextValue = { mode: ThemeMode; toggleMode: () => void };
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const toggleMode = () => setMode((current) => (current === "light" ? "dark" : "light"));

  // Memoisiert den Context-Wert; bei Theme-Wechsel ändert sich der Wert bewusst.
  const value = useMemo(() => ({ mode, toggleMode }), [mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom Hook zentralisiert den Context-Zugriff und gibt bei fehlendem Provider
// eine klare Fehlermeldung statt eines späteren, schwer verständlichen Fehlers.
export function useThemeMode(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeMode muss innerhalb von <AppThemeProvider> verwendet werden.");
  return context;
}
