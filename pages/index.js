import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";




const Home = () => {

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log("session_googlee_1", session);
      router.push("/dashboard");
    }
  }, [session]);

  console.log("session_googlee", session);

  return (
    <Container sx={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(111.85deg, #AAB4BD 1.7%, #6F8199 99.3%)",
      "@media (min-width: 1200px)": {
        maxWidth: "none", // or any value you prefer
      },
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 0,
      paddingRight: 0
    }}>

      <Box sx={{
        background: "linear-gradient(119.5deg, #2A4759 2.77%, #131D36 97.91%)",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.09)",
        borderRadius: "20px",
        width: "50%",
        padding: "0rem 1.5rem",
        paddingBottom: "2.5rem"
      }}>
        <Stack
          direction={"column"}>
          <Image
            alt="tatvic logo"
            src={"/images/tatvic_logo.svg"}
            width={100}
            height={100}
          />

          <Stack
            direction={"column"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              // background: "red"
            }}>
            <Image
              alt="tatvic logo"
              src={"/images/badger_banner.svg"}
              width={300}
              height={100}
            />

            <Image
              alt="tatvic logo"
              src={"/images/badger_text.svg"}
              width={300}
              height={100}
            />
            <Typography variant="subtitle1" sx={{ fontSize: 18 }}>Sign in to your account to continue.</Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={
                <Image
                  alt="tatvic logo"
                  src={"/images/google_logo.svg"}
                  width={24}
                  height={24}
                  style={{ marginRight: "18px" }}
                />
              }
              sx={{
                backgroundColor: "white", // Google's brand color
                color: "#10174F",
                fontWeight: "600",
                padding: "0.9rem 3rem",
                fontSize: 18,
                "&:hover": {
                  backgroundColor: "#f8f8f8",
                },
                textTransform: "uppercase",
                marginTop: "2rem",
              }}
              onClick={() =>
                // signOut()
                signIn("google")
              }
            >
              Sign in with Google
            </Button>
          </Stack>
        </Stack>
      </Box>

    </Container>
  );
};

export default Home;