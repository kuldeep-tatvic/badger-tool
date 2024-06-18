import { Box, Container } from "@mui/material";
import MyLogo from "components/MyLogo";

const LoginTheme = ({ children }) => {
    return (<Container sx={{
        display: "flex",
        height: "100vh",
        background: "#fff"
    }}
        maxWidth={false}
        disableGutters
    >
        <Box sx={{
            width: "30%",
            height: "100%",
            background: "#F0F0F9",
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                height: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <MyLogo />
            </Box>

            <Box
                component="img"
                src="/images/loginCreatives.png"
                alt="login-creatives"
                sx={{
                    position: "absolute",
                    width: "100%",
                    bottom: 0,
                }}
            />
        </Box>
        <Box sx={{
            width: "70%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {children}
        </Box>
    </Container>);
};

export default LoginTheme;