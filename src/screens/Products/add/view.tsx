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
import { ProductsAddHooks } from "./hooks";
import { Container, Title, SpaceBetween, Text, Bottom, styles } from "./style";

const ProductsAddView = () => {
  const { loading, product, onSetProduct, onSubmit } = ProductsAddHooks();

  return (
    <Container>
      <Title>{"Add product"}</Title>
      <SpaceBetween>
        <TextField value={product.name} label="Name" variant="outlined" />

        <TextField value={product.price} label="Price" variant="outlined" />

        <TextField value={product.photoUrl} label="Image" variant="outlined" />

        <TextField value={product.imei} label="IMEI" variant="outlined" />

        <TextField value={product.iCloudLogin} label="iCloud" variant="outlined" />

        <TextField value={product.iCloudPassword} label="Password" variant="outlined" />

        <TextField value={product.description} label="Description" variant="outlined" />


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

export default ProductsAddView;