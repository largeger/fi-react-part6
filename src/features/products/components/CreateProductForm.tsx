import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import { createProduct } from "../api/productsApi";
import type { Category, NewProduct } from "../../../shared/types/product";

export function CreateProductForm() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("9.99");
  const [category, setCategory] = useState<Category>("Kurioses");
  const [emoji, setEmoji] = useState("✨");

  const mutation = useMutation({
    mutationFn: (input: NewProduct) => createProduct(input),
    onSuccess: async () => {
      // API-Daten bleiben in TanStack Query. Wir invalidieren den Cache statt
      // parallel eine zweite Produktliste in Zustand oder useState zu pflegen.
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      setName(""); setDescription(""); setPrice("9.99"); setEmoji("✨");
    },
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedPrice = Number(price);
    if (!name.trim() || !description.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) return;
    mutation.mutate({
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice,
      category,
      emoji: emoji.trim() || "🛍️",
    });
  }

  return (
    <Box component="section">
      <Typography variant="overline" color="text.secondary">
        TANSTACK QUERY · useMutation
      </Typography>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        ➕ Demo-Produkt anlegen
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Nach dem Speichern wird der Produkt-Cache invalidiert.
      </Typography>

      <Box component="form" onSubmit={submit}>
        <Stack spacing={2}>
          <TextField
            label="Produktname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kaffeetassen-Compiler"
            required
            fullWidth
            size="small"
          />
          <TextField
            label="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Was macht es besonders?"
            required
            fullWidth
            size="small"
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Preis (€)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputProps={{ min: 0, step: 0.01 }}
              required
              size="small"
              sx={{ flex: 2 }}
            />
            <TextField
              label="Emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              inputProps={{ maxLength: 8 }}
              size="small"
              sx={{ flex: 1 }}
            />
          </Stack>
          <FormControl size="small" fullWidth>
            <InputLabel>Kategorie</InputLabel>
            <Select
              value={category}
              label="Kategorie"
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <MenuItem value="Kaffee">Kaffee</MenuItem>
              <MenuItem value="Schreibtisch">Schreibtisch</MenuItem>
              <MenuItem value="Kurioses">Kurioses</MenuItem>
              <MenuItem value="Homeoffice">Homeoffice</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" disabled={mutation.isPending} fullWidth>
            {mutation.isPending ? "Speichert …" : "Produkt speichern"}
          </Button>
        </Stack>
      </Box>

      {mutation.isPending && <Alert severity="info" sx={{ mt: 2 }}>⏳ Anfrage läuft …</Alert>}
      {mutation.isSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          ✅ „{mutation.data.name}" wurde angelegt.
        </Alert>
      )}
      {mutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          ❌ {mutation.error.message}
        </Alert>
      )}
    </Box>
  );
}
