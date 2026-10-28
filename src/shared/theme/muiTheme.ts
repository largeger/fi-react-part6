import { createTheme } from "@mui/material/styles";

// Das MUI-Theme zentralisiert alle Design-Entscheidungen.
// styleOverrides überschreiben das Standardverhalten einzelner Komponenten global.
export function buildMuiTheme(mode: "light" | "dark") {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1e293b", // Slate-800
      },
      secondary: {
        main: "#06b6d4", // Cyan-500
      },
      background: {
        default: mode === "light" ? "#f8fafc" : "#0f172a",
        paper: mode === "light" ? "#ffffff" : "#1e293b",
      },
      error: {
        main: "#dc2626",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      // Alle Buttons erhalten textTransform: none – kein automatisches Großschreiben.
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({theme}) =>  ({
            "&:hover": {
              boxShadow: theme.shadows[8],
            },
          }),
        },
      },
    },
  });
}
