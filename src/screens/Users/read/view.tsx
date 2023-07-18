import { UsersReadHooks } from "./hooks";
import { Container } from "./style";

const UsersReadView = () => {
  const { state, setState } = UsersReadHooks();

  return (
    <Container>
      <h1>UsersReadView</h1>
    </Container>
  );
};

export default UsersReadView;