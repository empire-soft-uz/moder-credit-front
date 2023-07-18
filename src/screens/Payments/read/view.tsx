import { PaymentsReadHooks } from "./hooks";
import { Container } from "./style";

const PaymentsReadView = () => {
  const { state, setState } = PaymentsReadHooks();

  return (
    <Container>
      <h1>PaymentsReadView</h1>
    </Container>
  );
};

export default PaymentsReadView;