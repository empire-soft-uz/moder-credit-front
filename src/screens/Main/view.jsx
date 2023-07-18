import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../components/theme";
import StatBox from "../../components/StatBox";
import { Calcs } from "./hooks";
import Header from "../../components/header";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import MoneyOffCsredSharpIcon from '@mui/icons-material/MoneyOffCsredSharp';


// import { Button } from "@material-tailwind/react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const calcs = Calcs();


  return (
    <>
      <Box m='20'>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>

        { /** Grids */}
        <Box display="grid" gridTemplateColumns="repeat(12,1fr)"
          gridAutoRows="140px"
          gap="20px">

          { /**Row 1 */}

          <Box gridColumn="span 3"
            backgroundColor={colors.primary[600]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title={calcs.currentDeposit}
              subtitle="Balance"
              progress="0.65"
              icon={
                <MonetizationOnRoundedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />
              } />
          </Box>


          { /**Row 2 */}

          <Box gridColumn="span 3"
            backgroundColor={colors.primary[600]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title={calcs.deposit}
              subtitle="Deposit  "
              progress="0.75"
              icon={
                <PriceChangeRoundedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />
              } />
          </Box>

          { /**Row 3 */}

          <Box gridColumn="span 3"
            backgroundColor={colors.primary[600]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title={calcs.profit}
              subtitle="Profit   "
              progress="0.30"
              icon={
                <PriceCheckIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />
              } />
          </Box>

          { /**Row 4 */}

          <Box gridColumn="span 3"
            backgroundColor={colors.primary[600]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title={calcs.expense}
              subtitle="Expense"
              progress="0.90"
              icon={
                <MoneyOffCsredSharpIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />
              } />
          </Box>

        </Box>
      </Box >



      <Box gridColumn="span 3"
        backgroundColor={colors.primary[900]}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        fontSize={"30px"}
        fontFamily={"initial"}
        color={"ButtonFace"}
        sx={{ margin: 4, padding: 4, backgroundColor: "#103E61", minWidth: 1300, maxWidth: 1600, alignItems: "center", display: "flex", justifyContent: "center" }}>
        Payments by month
      </Box>


      <Button
        display="flex"
        alignItems="center"
        justifyContent="center"

        sx={{ color: colors.greenAccent[600], marginLeft: 8, marginBottom: 1, padding: 2, backgroundColor: "#5F6161", minWidth: 1450, fontSize: "20px", fontFamily: "initial" }} >
        July
      </Button >

      <Button display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={"30px"}
        sx={{ color: colors.greenAccent[600], marginLeft: 8, marginBottom: 1, padding: 2, backgroundColor: "#5F6161", minWidth: 1450, fontSize: "20px", fontFamily: "initial" }} >
        August
      </Button >

      <Button display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={"30px"}
        sx={{ color: colors.greenAccent[600], marginLeft: 8, marginBottom: 1, padding: 2, backgroundColor: "#5F6161", minWidth: 1450, fontSize: "20px", fontFamily: "initial" }} >
        September
      </Button >

      <Button display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={"30px"}
        sx={{ color: colors.greenAccent[600], marginLeft: 8, marginBottom: 1, padding: 2, backgroundColor: "#5F6161", minWidth: 1450, fontSize: "20px", fontFamily: "initial" }} >
        October
      </Button >

      <Button display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={"30px"}
        sx={{ color: colors.greenAccent[600], marginLeft: 8, marginBottom: 1, padding: 2, backgroundColor: "#5F6161", minWidth: 1450, fontSize: "20px", fontFamily: "initial" }} >
        November
      </Button >

      <Button display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={"30px"}
        sx={{ color: colors.greenAccent[600], marginLeft: 8, marginBottom: 1, padding: 2, backgroundColor: "#5F6161", minWidth: 1450, fontSize: "20px", fontFamily: "initial" }} >
        December
      </Button >

    </>

  )
}


export default Dashboard;