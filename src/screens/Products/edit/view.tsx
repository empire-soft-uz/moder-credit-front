import { ProductsEditHooks } from "./hooks";
import { Container } from "./style";

const ProductsEditView = () => {
  const { state, setState } = ProductsEditHooks();

  return (
    <Container>
      <h1>ProductsEditView</h1>
    </Container>
  );
};

export default ProductsEditView;