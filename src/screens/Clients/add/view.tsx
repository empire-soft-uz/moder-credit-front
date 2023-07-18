import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  Select,
  TextField,
  FormLabel,
} from "@mui/material";
import { ClientsAddHooks } from "./hooks";
import { Container, Title, SpaceBetween, Text, Bottom, styles } from "./style";

const ClientsAddView = () => {
  const { loading, client, onSetClient, onSubmit } = ClientsAddHooks();

  return (
    <Container>
      <Title>{"Add client"}</Title>
      <SpaceBetween>
        <TextField value={client.name} label="Name" variant="outlined" />

        <TextField value={client.phone} label="Phone Number" variant="outlined" />

        <TextField value={client.address} label="Address" variant="outlined" />


      </SpaceBetween>

      <Bottom loading={loading}>
        <LoadingButton
          variant="outlined"
          onClick={onSubmit}
          loading={loading}
          startIcon={<></>}
          style={styles.btn}
          loadingPosition={"start"}
        >
          <Text loading={loading}>{"Save"}</Text>
        </LoadingButton>
      </Bottom>
    </Container>
  );
};

export default ClientsAddView;