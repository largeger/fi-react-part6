import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/productsApi";
import type { CategoryFilter } from "../../../shared/types/product";

const categories: CategoryFilter[] = ["Alle", "Kaffee", "Schreibtisch", "Kurioses", "Homeoffice"];

function isCategory(value: string | null): value is CategoryFilter {
  return value !== null && categories.includes(value as CategoryFilter);
}

// Custom Hook extrahiert die Query-Logik aus der Komponente.
// Die Komponente wird zum reinen "Presenter" – sie bekommt Daten, rendert sie.
export function useProducts() {
  const [params, setParams] = useSearchParams();
  // URL als Quelle der Wahrheit: Filter überlebt Reloads und kann geteilt werden.
  const raw = params.get("category");
  const category: CategoryFilter = isCategory(raw) ? raw : "Alle";

  const query = useQuery({
    // Der Filter verändert die Serverantwort, gehört also in den Query Key.
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });

  function changeCategory(next: CategoryFilter) {
    const nextParams = new URLSearchParams(params);
    if (next === "Alle") nextParams.delete("category");
    else nextParams.set("category", next);
    setParams(nextParams);
  }

  return { query, category, categories, changeCategory };
}
