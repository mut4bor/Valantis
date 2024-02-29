export type ProductCardProps = {
  data: {
    id: string;
    name: string;
    price: number;
    brand: string | null;
  };
};
export type ProductCardContainerProps = {
  children: React.ReactNode;
};
