import { ExpensesReadHooks } from "./hooks";
import { Container } from "./style";

const ExpensesReadView = () => {
  const { state, setState } = ExpensesReadHooks();

  return (
    <Container>
      <h1>ExpensesReadView</h1>
    </Container>
  );
};

export default ExpensesReadView;