import { PaymentsEditHooks } from "./hooks";
import { Container } from "./style";

const PaymentsEditView = () => {
  const { state, setState } = PaymentsEditHooks();

  return (
    <Container>
      <h1>PaymentsEditView</h1>
    </Container>
  );
};

export default PaymentsEditView;