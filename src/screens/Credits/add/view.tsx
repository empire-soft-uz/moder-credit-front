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
import { CreditsAddHooks} from "./hooks";
import { Container, Title, SpaceBetween, Text, Bottom, styles } from "./style";


export const CreditsAddView = () => {
  const { loading, credit, onSetCredit, onSubmit } = CreditsAddHooks();

  return (
    <Container>
      <Title>{"Add credit"}</Title>
      <SpaceBetween>
        <TextField value={credit.client_id} label="Client" variant="outlined" />

        <TextField
          value={credit.product_id}
          label="Product"
          variant="outlined"
        />

        <TextField
          value={credit.client_deposit}
          label="Client Deposit"
          variant="outlined"
        />

        <TextField
          value={credit.deposit_amount}
          label="Company Deposit"
          variant="outlined"
        />

        <TextField value={credit.period} label="Period" variant="outlined" />

        <TextField value={credit.percent} label="Percentt" variant="outlined" />

        <TextField
          value={credit.status}
          label="Credit status"
          variant="outlined"
        />
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