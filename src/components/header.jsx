import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "./theme";


const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="30px">
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                fontFamily="serif"
                sx={{ mb: "5px" }}>
                {title}
            </Typography>

            <Typography variant="h4"
                color={colors.greenAccent[400]}
                fontFamily={"-moz-initial"}>
                {subtitle}
            </Typography>
        </Box >
    )
}


export default Header;