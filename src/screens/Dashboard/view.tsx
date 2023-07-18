import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components";
import { DashboardHooks } from "./hooks";
import { Container, Main } from "./style";

const DashboardView = () => {
  DashboardHooks();

  return (
    <Container>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default DashboardView;