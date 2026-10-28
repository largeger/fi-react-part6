// Zentrale Typen halten API, UI und Warenkorb konsistent.
export type Category = "Kaffee" | "Schreibtisch" | "Kurioses" | "Homeoffice";
export type CategoryFilter = "Alle" | Category;

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  emoji: string;
  rating?: number;
};

// Die ID vergibt die API erst beim Anlegen.
export type NewProduct = Omit<Product, "id">;
