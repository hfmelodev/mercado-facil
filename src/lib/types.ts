export type ProductItem = {
  id: string;
  name: string;
  quantity: string | null;
  isPurchased: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ActionFeedback = {
  success: boolean;
  message: string;
};

export type ProductsResponse = {
  products: ProductItem[];
};

export function sortProducts(products: ProductItem[]) {
  return [...products].sort((left, right) => {
    if (left.isPurchased !== right.isPurchased) {
      return Number(left.isPurchased) - Number(right.isPurchased);
    }

    return (
      new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()
    );
  });
}

export function splitProducts(products: ProductItem[]) {
  const pending = products.filter((product) => !product.isPurchased);
  const purchased = products.filter((product) => product.isPurchased);

  return { pending, purchased };
}
