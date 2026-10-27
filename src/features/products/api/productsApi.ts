import type { CategoryFilter, NewProduct, Product } from "../../shared/types/product";

// Simulierte Backend-API: keine Serverinstallation nötig. In einer echten App
// würden diese Funktionen fetch() auf einen REST-Endpunkt aufrufen.
let products: Product[] = [
  { id: 1, name: "Espresso-Tastatur", description: "Mechanische Tastatur für wache Code-Sessions.", price: 89.9, category: "Schreibtisch", emoji: "⌨️" },
  { id: 2, name: "Debugging-Bohnen", description: "Kaffee für die letzte Fehlersuche am Freitagnachmittag.", price: 14.5, category: "Kaffee", emoji: "☕" },
  { id: 3, name: "Meeting-Magnet", description: "Macht Meetings leider nicht kürzer.", price: 4.2, category: "Kurioses", emoji: "🧲" },
  { id: 4, name: "Code-Review-Becher", description: "Für konstruktive Kommentare und warme Getränke.", price: 12.5, category: "Kaffee", emoji: "🥤" },
  { id: 5, name: "Ergonomischer Kaktus", description: "Stacheliges Feedback für deinen Schreibtisch.", price: 19.99, category: "Schreibtisch", emoji: "🌵" },
];

let simulateFailure = false;
export function setSimulateApiFailure(value: boolean) { simulateFailure = value; }
function wait(ms: number) { return new Promise<void>((resolve) => window.setTimeout(resolve, ms)); }
function maybeFail() {
  if (simulateFailure) throw new Error("Demo-Fehler: Die simulierte Produkt-API ist gerade nicht erreichbar.");
}

export async function fetchProducts(category: CategoryFilter): Promise<Product[]> {
  await wait(550); // Macht den Ladezustand während der Vorführung sichtbar.
  maybeFail();
  const result = category === "Alle" ? products : products.filter((p) => p.category === category);
  // Kopien zurückgeben, damit die UI das interne Array nicht versehentlich mutiert.
  return result.map((product) => ({ ...product }));
}

export async function createProduct(input: NewProduct): Promise<Product> {
  await wait(650);
  maybeFail();
  const created: Product = { ...input, id: Math.max(0, ...products.map((p) => p.id)) + 1 };
  products = [...products, created]; // Immutable Update wie bei typischen API-Daten.
  return { ...created };
}
