import { ClientsReadHooks } from "./hooks";
import { Container } from "./style";

const ClientsReadView = () => {
  const { state, setState } = ClientsReadHooks();

  return (
    <Container>
      <h1>ClientsReadView</h1>
    </Container>
  );
};

export default ClientsReadView;