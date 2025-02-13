import { Box, styled, Typography } from "@mui/material";
import React from "react";
import firstImg from "../assets/First.png";
import secondImg from "../assets/Second.png";

const Policy = () => {
  return (
    <Box color="#191927" maxWidth="780px" margin="0 auto" padding="64px 20px">
      {/* Website Policy Header */}
      <Header>Website Policy</Header>
      
      {/* Application Overview Section */}
      <Section>
        <SectionTitle>Application Overview</SectionTitle>
        <Typography variant="body1">
          Welcome to <strong>microSdetect by theoRmets</strong>. This platform serves as an innovative tool designed for detecting key features in microstructure using advanced deep-learning models.
        </Typography>
      </Section>

      {/* ML Model Details Section */}
      <Section>
        <SectionTitle>ML Model Details</SectionTitle>
        <Typography variant="body1" gutterBottom>
          A regression-based deep-learning model, through adequate training, is extended to martensite-austenite (MA) island detection in bainite microstructure. The detection accuracy, estimated through mean Average Precision (mAP), is 98% for 0.5 IoU (Intersection over Union). The tool works best with gray scale 4000x scanning electron microscopic images of bainite.
        </Typography>
        <Typography variant="body1">
          Simply upload your image, and you'll receive the detection result. Below are examples with ground truth:
        </Typography>
        <ImagesWrapper>
          <ExampleImage src={firstImg} alt="Example 1" />
          <ExampleImage src={secondImg} alt="Example 2" />
        </ImagesWrapper>
      </Section>

      {/* About & Terms Section */}
      <Section>
        <SectionTitle>About & Terms</SectionTitle>
        <Typography variant="body1">
          This platform is a novice attempt to facilitate the detection of key features in microstructure, including secondary phases, precipitates, and porosity. In its current, preliminary form, the tool is available to realise martensite-austenite (MA) islands in scanning electron microscopic (SEM) images of bainite. We continue to work on enhancing its capabilities and accuracy.
        </Typography>
      </Section>

      {/* Disclaimer Section */}
      <Section>
        <SectionTitle>Simply Put</SectionTitle>
        <Typography variant="body1">
          "An effort by a UNKNOWN group in a LESS KNOWN institute to identify UNIQUE features in KNOWN materials employed in WELL-KNOWN applications."
        </Typography>
      </Section>
    </Box>
  );
};

export default Policy;

const Header = styled(Typography)({
  fontSize: "46px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "32px",
  fontFamily: "'Noto Serif JP', serif",
});

const Section = styled(Box)({
  marginBottom: "32px",
});

const SectionTitle = styled(Typography)({
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "16px",
  fontFamily: "'Noto Serif JP', serif",
});

const ImagesWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
  gap: "16px",
});

const ExampleImage = styled("img")({
  width: "200px",
  height: "200px",
  objectFit: "cover",
});
