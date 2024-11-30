import React from "react";
import { Store, DollarSign, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { type Ingredient } from "@/lib/recipeMatching";

interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  storeId: string;
}

interface Store {
  id: string;
  name: string;
  distance: number;
  priceLevel: 1 | 2 | 3;
}

interface PriceComparisonTableProps {
  products?: StoreProduct[];
  stores?: Store[];
  selectedStore?: string;
  selectedIngredients?: Ingredient[];
  onStoreSelect?: (storeId: string) => void;
  className?: string;
}

const defaultProducts: StoreProduct[] = [
  {
    id: "1",
    name: "Tomatoes",
    category: "Vegetables",
    price: 2.99,
    inStock: true,
    storeId: "1",
  },
  {
    id: "2",
    name: "Onions",
    category: "Vegetables",
    price: 1.99,
    inStock: true,
    storeId: "1",
  },
  {
    id: "3",
    name: "Olive Oil",
    category: "Pantry",
    price: 8.99,
    inStock: true,
    storeId: "1",
  },
  {
    id: "4",
    name: "Tomatoes",
    category: "Vegetables",
    price: 3.49,
    inStock: true,
    storeId: "2",
  },
  {
    id: "5",
    name: "Onions",
    category: "Vegetables",
    price: 1.79,
    inStock: false,
    storeId: "2",
  },
  {
    id: "6",
    name: "Olive Oil",
    category: "Pantry",
    price: 7.99,
    inStock: true,
    storeId: "2",
  },
];

const PriceComparisonTable = ({
  products = defaultProducts,
  stores = [
    { id: "1", name: "Grocery Store A", distance: 0.5, priceLevel: 2 },
    { id: "2", name: "Supermarket B", distance: 1.2, priceLevel: 1 },
  ],
  selectedStore = "",
  selectedIngredients = [],
  onStoreSelect = () => {},
  className = "",
}: PriceComparisonTableProps) => {
  // Filter products based on selected ingredients
  const filteredProducts =
    selectedIngredients.length > 0
      ? products.filter((product) =>
          selectedIngredients.some(
            (ingredient) =>
              product.name
                .toLowerCase()
                .includes(ingredient.name.toLowerCase()) ||
              ingredient.name
                .toLowerCase()
                .includes(product.name.toLowerCase()),
          ),
        )
      : products;

  // Group products by category
  const productsByCategory = filteredProducts.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {} as Record<string, StoreProduct[]>,
  );

  // Get unique product names within each category
  const uniqueProductsByCategory = Object.entries(productsByCategory).reduce(
    (acc, [category, products]) => {
      acc[category] = Array.from(new Set(products.map((p) => p.name))).map(
        (name) => ({
          name,
          stores: stores.map((store) => ({
            ...store,
            product: products.find(
              (p) => p.name === name && p.storeId === store.id,
            ),
          })),
        }),
      );
      return acc;
    },
    {} as Record<
      string,
      Array<{ name: string; stores: Array<Store & { product?: StoreProduct }> }>
    >,
  );

  return (
    <Card className={cn("w-full bg-background p-4", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Price Comparison</h3>
        <Badge variant="outline" className="text-sm">
          {selectedIngredients.length
            ? `${filteredProducts.length} items found`
            : "Select ingredients to compare prices"}
        </Badge>
      </div>

      <ScrollArea className="h-[320px]">
        {selectedIngredients.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
            <p>Add ingredients from the search panel</p>
            <p>to see price comparisons across stores</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(uniqueProductsByCategory).map(
              ([category, products]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {category}
                  </h4>

                  <div className="space-y-4">
                    {products.map(({ name, stores }) => (
                      <div key={name} className="space-y-2">
                        <div className="font-medium">{name}</div>
                        <div className="grid gap-2">
                          {stores.map((store) => (
                            <button
                              key={store.id}
                              onClick={() => onStoreSelect(store.id)}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-md transition-colors text-sm",
                                selectedStore === store.id
                                  ? "bg-accent"
                                  : "hover:bg-accent/50",
                              )}
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Store className="h-4 w-4 shrink-0" />
                                <span className="truncate">{store.name}</span>
                                <div className="flex items-center text-muted-foreground shrink-0">
                                  {Array.from({ length: store.priceLevel }).map(
                                    (_, i) => (
                                      <DollarSign key={i} className="h-3 w-3" />
                                    ),
                                  )}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                  <MapPin className="h-3 w-3" />
                                  <span>{store.distance} mi</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {store.product ? (
                                  <>
                                    <span className="font-medium">
                                      ${store.product.price.toFixed(2)}
                                    </span>
                                    {!store.product.inStock && (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        Out
                                      </Badge>
                                    )}
                                  </>
                                ) : (
                                  <span className="text-muted-foreground">
                                    N/A
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default PriceComparisonTable;
