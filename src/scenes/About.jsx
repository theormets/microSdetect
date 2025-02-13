import { Box, styled, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box color="#191927" maxWidth="780px" margin="0 auto" padding="64px 20px">
      <Text sx={{ fontSize: "46px" }}>About the Platform</Text>
      <Typography color="#19192780" sx={{ fontSize: "15px", pt: "10px" }}>
        Updated March 30, 2024
      </Typography>
      <br />
      <Text>
        This platform is a novice attempt to facilitate detection of key features in microstructure. These features include secondary phases, precipitates and porosity. In its present form, which is preliminary, a tool is available to realise martensite-austenite (MA) island in the scanning electron microscopic (SEM) images of bainite. Attempts are underway to facilitate accurate detection of other microstructural features as well.
      </Text>
    </Box>
  );
};

export default About;

const Text = styled(Typography)({
  fontSize: "18px",
  fontFamily: "'Noto Serif JP', serif",
});
