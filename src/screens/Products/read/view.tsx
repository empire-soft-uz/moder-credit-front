import { ProductsReadHooks } from "./hooks";
import { Container } from "./style";

const ProductsReadView = () => {
  const { state, setState } = ProductsReadHooks();

  return (
    <Container>
      <h1>ProductsReadView</h1>
    </Container>
  );
};

export default ProductsReadView;