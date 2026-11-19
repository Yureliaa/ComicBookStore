export interface PricedItem {
  id: number;
  price: number;
}

export function calculateTotal(comicIds: number[], comics: PricedItem[]): number {
  const sum = comicIds.reduce((acc, id) => {
    const comic = comics.find((c) => c.id === id);
    return acc + (comic ? comic.price : 0);
  }, 0);
  return Math.round(sum * 100) / 100;
}
