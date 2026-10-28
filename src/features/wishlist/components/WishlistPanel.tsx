import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Badge,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useWishlistStore } from "../store/wishlistStore";

export function WishlistPanel() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography variant="overline" color="text.secondary" sx={{ flexGrow: 1 }}>
          WUNSCHLISTE
        </Typography>
        <Badge badgeContent={items.length} color="error">
          <FavoriteIcon color="error" />
        </Badge>
      </Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        ♥ Wunschliste
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Noch nichts gemerkt.
        </Typography>
      ) : (
        <List dense disablePadding>
          {items.map((product) => (
            <ListItem
              key={product.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  size="small"
                  aria-label={`${product.name} entfernen`}
                  onClick={() => removeItem(product.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
              disablePadding
            >
              <ListItemText
                primary={<Typography fontWeight={600}>{product.name}</Typography>}
                secondary={`${product.price.toFixed(2)} €`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
