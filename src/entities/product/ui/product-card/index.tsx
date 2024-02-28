import styled from './style.module.scss';

type ProductCardProps = {
  data: {
    id: number;
    name: string;
    price: number;
    brand: string;
  };
};

export function ProductCard(props: ProductCardProps) {
  const { data } = props;
  const { id, name, price, brand } = data;
  return (
    <>
      <div className={styled.container}>
        <h4 className={styled.id}>{id}</h4>
        <h4 className={styled.name}>{name}</h4>
        <h4 className={styled.price}>{price}</h4>
        <h4 className={styled.brand}>{brand}</h4>
      </div>
    </>
  );
}
