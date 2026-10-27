import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import type { CategoryFilter } from "../../../shared/types/product";

export function ProductList() {
  // Alle Daten- und Filterlogik kommt aus dem Custom Hook – die Komponente rendert nur.
  const { query, category, categories, changeCategory } = useProducts();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" color="text.secondary">
          TANSTACK QUERY + FEATURE ARCHITECTURE
        </Typography>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Fundstücke im Shop
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Produktdaten kommen aus einer simulierten API.
        </Typography>

        {/* ToggleButtonGroup als Kategorie-Filter statt HTML-select */}
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={(_e, val: CategoryFilter | null) => {
            if (val) changeCategory(val);
          }}
          size="small"
          sx={{ flexWrap: "wrap", gap: 0.5 }}
        >
          {categories.map((c) => (
            <ToggleButton key={c} value={c} sx={{ textTransform: "none", borderRadius: "20px !important", border: "1px solid !important" }}>
              {c}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="caption" display="block" mt={1} color="text.secondary">
          🔗 Filter: <code>{category}</code> · Query Key: <code>["products", "{category}"]</code>
        </Typography>
      </Box>

      {query.isPending && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {query.isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => void query.refetch()}>
              Erneut versuchen
            </Button>
          }
        >
          <strong>Produkte konnten nicht geladen werden.</strong> {query.error.message}
        </Alert>
      )}

      {query.isSuccess && query.data.length === 0 && (
        <Alert severity="info">🔎 Keine Produkte in dieser Kategorie.</Alert>
      )}

      {query.isSuccess && query.data.length > 0 && (
        <Grid container spacing={2}>
          {query.data.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="caption" display="block" mt={2} color="text.secondary">
        💡 Der Filter steckt in der URL. TanStack Query cached die Daten pro Kategorie.
      </Typography>
    </Box>
  );
}
