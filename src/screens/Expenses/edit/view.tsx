import { ExpensesEditHooks } from "./hooks";
import { Container } from "./style";

const ExpensesEditView = () => {
  const { state, setState } = ExpensesEditHooks();

  return (
    <Container>
      <h1>ExpensesEditView</h1>
    </Container>
  );
};

export default ExpensesEditView;