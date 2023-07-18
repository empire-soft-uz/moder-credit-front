import { CreditsReadHooks } from "./hooks";
import { Container } from "./style";

const CreditsReadView = () => {
  const { state, setState } = CreditsReadHooks();

  return (
    <Container>
      <h1>CreditsReadView</h1>
    </Container>
  );
};

export default CreditsReadView;