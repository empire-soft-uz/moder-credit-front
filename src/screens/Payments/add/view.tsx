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
import { PaymentsAddHooks } from "./hooks";
import { Container, Title, SpaceBetween, Text, Bottom, styles } from "./style";

const PaymentsAddView = () => {
  const { loading, payment, onSetPayment, onSubmit } = PaymentsAddHooks();

  return (
    <Container>
      <Title>{"Add payment"}</Title>
      <SpaceBetween>
        <TextField value={payment.index} label="Index" variant="outlined" />

        <TextField value={payment.credit_id} label="Credit ID" variant="outlined" />

        <TextField value={payment.paid_amount} label="Paid Amount" variant="outlined" />

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

export default PaymentsAddView;