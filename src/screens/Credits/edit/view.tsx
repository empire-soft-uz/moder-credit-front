import { CreditsEditHooks } from "./hooks";
import { Container } from "./style";

const CreditsEditView = () => {
  const { state, setState } = CreditsEditHooks();

  return (
    <Container>
      <h1>CreditsEditView</h1>
    </Container>
  );
};

export default CreditsEditView;