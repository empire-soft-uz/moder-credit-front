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
import { ExpensesAddHooks } from "./hooks";
import { Container, Title, SpaceBetween, Text, Bottom, styles } from "./style";

const ExpensesAddView = () => {
  const { loading, expense, onSetExpense, onSubmit } = ExpensesAddHooks();

  return (
    <Container>
      <Title>{"Add expense"}</Title>
      <SpaceBetween>

        <TextField value={expense.amount} label="Amount" variant="outlined" />

        <TextField value={expense.description} label="Credit" variant="outlined" />


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

export default ExpensesAddView;