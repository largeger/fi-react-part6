import { useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AppThemeProvider, useThemeMode } from "./shared/context/ThemeContext";
import { buildMuiTheme } from "./shared/theme/muiTheme";

// Ein QueryClient pro App-Lauf verwaltet den Cache für Server-State.
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10_000, retry: 1, refetchOnWindowFocus: false } },
});

// MuiThemeWrapper liest den Mode aus dem Custom Context und erstellt das MUI-Theme.
// useMemo verhindert, dass createTheme bei jedem Render neu aufgerufen wird.
function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  const muiTheme = useMemo(() => buildMuiTheme(mode), [mode]);
  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}

import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Router: Kategorie-Filter wird in Search Params gehalten. */}
    <BrowserRouter>
      {/* TanStack Query: Cache, Queries und Mutations verfügbar machen. */}
      <QueryClientProvider client={queryClient}>
        {/* Custom Context: ThemeMode (light/dark) für die gesamte App. */}
        <AppThemeProvider>
          {/* MUI ThemeProvider: Liest mode aus Custom Context, baut MUI-Theme. */}
          <MuiThemeWrapper>
            <CssBaseline />
            <App />
          </MuiThemeWrapper>
        </AppThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
