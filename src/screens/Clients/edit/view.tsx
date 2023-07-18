import { ClientsEditHooks } from "./hooks";
import { Container } from "./style";

const ClientsEditView = () => {
  const { state, setState } = ClientsEditHooks();

  return (
    <Container>
      <h1>ClientsEditView</h1>
    </Container>
  );
};

export default ClientsEditView;