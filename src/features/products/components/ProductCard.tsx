import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Rating,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/productsApi";
import type { Product } from "../../../shared/types/product";
import { useCartStore } from "../../cart";
import { useWishlistStore } from "../../wishlist";

export function ProductCard({ product }: { product: Product }) {
  // Der Dialogstatus ist lokal: andere Komponenten müssen ihn nicht kennen.
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editPrice, setEditPrice] = useState(String(product.price));

  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: () =>
      updateProduct(product.id, {
        name: editName.trim(),
        price: Number(editPrice),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditOpen(false);
    },
  });

  const addItem = useCartStore((state) => state.addItem); // Nur die Aktion abonnieren.
  const hasWishlistItem = useWishlistStore((state) => state.hasItem);
  const addWishlistItem = useWishlistStore((state) => state.addItem);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ fontSize: "2.5rem", mb: 1 }}>{product.emoji}</Box>
          <Chip label={product.category} size="small" color="secondary" sx={{ mb: 1 }} />
          <Typography variant="h6" component="h3" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Box sx={{ mt: 1 }}>
            {product.rating !== undefined ? (
              <Rating value={product.rating} readOnly precision={0.5} size="small" />
            ) : (
              <Typography variant="body2" color="text.disabled">
                Noch nicht bewertet
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Typography variant="h6" fontWeight={700} color="primary">
            {product.price.toFixed(2)} €
          </Typography>
          <Box>
            <Button
              size="small"
              variant="text"
              color={hasWishlistItem(product.id) ? "error" : "inherit"}
              onClick={() => addWishlistItem(product)}
              sx={{ mr: 1 }}
            >
              ♥ Merken
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={() => {
                setEditName(product.name);
                setEditPrice(String(product.price));
                setEditOpen(true);
              }}
              sx={{ mr: 1 }}
            >
              Bearbeiten
            </Button>
            <Button size="small" variant="text" onClick={() => setDetailsOpen(true)} sx={{ mr: 1 }}>
              Details
            </Button>
            <Button size="small" variant="contained" onClick={() => addItem(product)}>
              + Warenkorb
            </Button>
          </Box>
        </CardActions>
      </Card>

      {/* MUI Dialog ersetzt das selbst gebaute Modal aus Teil 05. */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Box sx={{ fontSize: "3rem", textAlign: "center" }}>{product.emoji}</Box>
          <Typography variant="overline" display="block" textAlign="center" color="text.secondary">
            PRODUKTDETAILS · MUI Dialog
          </Typography>
          <Typography variant="h5" fontWeight={700} textAlign="center">
            {product.name}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{product.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            Kategorie: {product.category}
          </Typography>
          <Typography variant="h5" fontWeight={700} mt={2}>
            {product.price.toFixed(2)} €
          </Typography>
          <Box sx={{ mt: 1 }}>
            {product.rating !== undefined ? (
              <Rating value={product.rating} readOnly precision={0.5} size="small" />
            ) : (
              <Typography variant="body2" color="text.disabled">
                Noch nicht bewertet
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)} variant="contained" fullWidth>
            Fertig
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="overline" display="block" color="text.secondary">
            TANSTACK QUERY · useMutation
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            ✏️ Produkt bearbeiten
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Produktname"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Preis (€)"
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              inputProps={{ min: 0, step: 0.01 }}
              required
              fullWidth
              size="small"
            />
            {editMutation.isError && (
              <Alert severity="error">
                {editMutation.error.message}
              </Alert>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Abbrechen</Button>
          <Button
            onClick={() => editMutation.mutate()}
            variant="contained"
            disabled={editMutation.isPending || !editName.trim() || !editPrice.trim()}
          >
            {editMutation.isPending ? "Speichert…" : "Speichern"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
