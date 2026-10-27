import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Chip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ProductList } from "./features/products/components/ProductList";
import { CreateProductForm } from "./features/products/components/CreateProductForm";
import { CartPanel } from "./features/cart/components/CartPanel";
import { setSimulateApiFailure } from "./features/products/api/productsApi";
import { useThemeMode } from "./shared/context/ThemeContext";

export function App() {
  const { mode, toggleMode } = useThemeMode();
  const queryClient = useQueryClient();
  const [failureEnabled, setFailureEnabled] = useState(false);

  function toggleFailure() {
    const next = !failureEnabled;
    setFailureEnabled(next);
    setSimulateApiFailure(next);
    void queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* MUI AppBar als persistenter Header */}
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1, letterSpacing: "-0.5px" }}>
            pixel <em>&amp;</em> bohne
          </Typography>
          <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
            <IconButton color="inherit" onClick={toggleMode}>
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero-Banner */}
        <Box sx={{ mb: 4, p: 4, borderRadius: 3, bgcolor: "primary.main", color: "primary.contrastText" }}>
          <Typography variant="overline">REACT + MUI · FEATURE ARCHITECTURE · LIVE DEMO</Typography>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Architektur & Design System.
          </Typography>
          <Typography variant="body1" mb={2} sx={{ opacity: 0.8 }}>
            Dieselbe "Pixel & Bohne" App – jetzt mit MUI-Komponenten und Feature-basierter Ordnerstruktur.
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {["⚛️ Feature Architecture", "🎨 MUI Theme", "🔄 TanStack Query", "🐻 Zustand"].map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "inherit" }} />
            ))}
          </Box>
        </Box>

        {/* Trainer-Mode Banner */}
        <Paper
          elevation={0}
          sx={{ p: 2, mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid", borderColor: "divider" }}
        >
          <Box>
            <Typography fontWeight={700}>🎓 Trainer-Modus</Typography>
            <Typography variant="body2" color="text.secondary">
              Lege ein Produkt an oder simuliere einen API-Fehler.
            </Typography>
          </Box>
          <FormControlLabel
            control={<Switch checked={failureEnabled} onChange={toggleFailure} color="error" />}
            label={failureEnabled ? "Fehler aktiv" : "Demo-Fehler"}
          />
        </Paper>

        {/* Haupt-Layout: 2/3 Content + 1/3 Sidebar */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <ProductList />
            </Paper>
            <Paper elevation={1} sx={{ p: 3 }}>
              <CreateProductForm />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CartPanel />
            <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
              <Typography variant="overline" color="text.secondary">
                ARCHITEKTUR AUF EINEN BLICK
              </Typography>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Wer ist wofür zuständig?
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {[
                  ["useState", "Details-Dialog je Produktkarte"],
                  ["Custom Context", "ThemeMode für die gesamte App"],
                  ["MUI ThemeProvider", "Design-System mit Custom Palette"],
                  ["Zustand", "Gemeinsamer Warenkorb"],
                  ["TanStack Query", "API-Daten, Cache und Mutations"],
                  ["URL Search Params", "Teilbarer Kategorie-Filter"],
                ].map(([title, desc]) => (
                  <Box component="li" key={title} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      <strong>{title}</strong>
                      <br />
                      <Typography component="span" variant="caption" color="text.secondary">
                        {desc}
                      </Typography>
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" display="block" mt={2} color="text.secondary">
                💡 Feature-Architektur: Jedes Feature hat seine eigene api/, hooks/ und components/ Schicht.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box component="footer" sx={{ py: 3, mt: 4, borderTop: "1px solid", borderColor: "divider", textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Pixel & Bohne · MUI + Feature-Architektur Demo · Für Lernzwecke gebaut ☕
        </Typography>
      </Box>
    </Box>
  );
}
