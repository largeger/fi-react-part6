import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { calculateCart, useCartStore } from "../store/cartStore";

export function CartPanel() {
  // Selektoren abonnieren nur die benötigten Daten/Aktionen aus dem Store.
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const { totalItems, totalPrice } = calculateCart(items);

  return (
    <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography variant="overline" color="text.secondary" sx={{ flexGrow: 1 }}>
          ZUSTAND STORE
        </Typography>
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        🛒 Warenkorb
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Noch leer. Füge ein Produkt hinzu!
        </Typography>
      ) : (
        <>
          <List dense disablePadding>
            {items.map((item) => (
              <ListItem
                key={item.productId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    size="small"
                    aria-label={`${item.name} entfernen`}
                    onClick={() => removeItem(item.productId)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemText
                  primary={<Typography fontWeight={600}>{item.name}</Typography>}
                  secondary={`${item.quantity} × ${item.price.toFixed(2)} €`}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography fontWeight={600}>Gesamt</Typography>
            <Typography fontWeight={700}>{totalPrice.toFixed(2)} €</Typography>
          </Box>
          <Button variant="outlined" color="error" fullWidth onClick={clear}>
            Warenkorb leeren
          </Button>
        </>
      )}

      <Typography variant="caption" display="block" mt={2} color="text.secondary">
        💡 Client-State: Der Warenkorb wird nicht aus der Produkt-API geladen.
      </Typography>
    </Paper>
  );
}
