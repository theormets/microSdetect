import { Box, styled, Typography } from "@mui/material";
import React from "react";
// import firstImg from "../../assets/First.png";
// import secondImg from "../../assets/Second.png";

const Terms = () => {
  return (
    <Box color="#191927" maxWidth="780px" margin="0 auto" padding="64px 20px">
      <Text sx={{ fontSize: "46px" }}>Terms of Use</Text>
      <Typography color="#19192780" sx={{ fontSize: "15px", pt: "10px" }}>
        Last modified March 31, 2024
      </Typography>
      <br />
      <br />
      <Text>
        Our platform utilizes a sophisticated regression-based deep-learning model, extensively trained to detect martensite-austenite (MA) islands in bainite microstructure.
      </Text>
      <br />
      <Text>
        The model achieves a detection accuracy of 98% for 0.5 IoU (Intersection over Union), measured using mean Average Precision (mAP), and performs optimally with gray scale 4000x scanning electron microscopic images of bainite.
      </Text>
      <br />
      <Text>
        {/* Few examples along with ground truth are provided below. Simply upload your image and you'll receive the detection result: */}
      </Text>
      {/* <ImagesWrapper>
        <ExampleImage src={firstImg} alt="Example 1" />
        <ExampleImage src={secondImg} alt="Example 2" />
      </ImagesWrapper> */}
      <br />
      <Text>
        By using our Services, you agree to these terms.
      </Text>
    </Box>
  );
};

export default Terms;

const Text = styled(Typography)({
  fontSize: "18px",
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
