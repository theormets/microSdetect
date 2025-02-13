import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  CircularProgress,
  Stack, useMediaQuery
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import CollectionsIcon from '@mui/icons-material/Collections';
import { styled } from '@mui/material/styles';
import PostPreviewModal from '../../components/PostPreviewModal';
import CreateCollection from '../../components/CreateCollection';
import { FlexBox } from "../../components/FlexBox";
import { shades } from "../../theme";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {STATUS} from "../../utils";
import DDButton from "../singleImage/DDButton";
import {createPost} from "../../state/postsSlice";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {MODEL_DEV_API} from "../../env";

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const MLModelUse = () => {
  const { modelId } = useParams();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:767px)");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [openPostData, setOpenPostData] = useState(null);
  const [openCollection, setOpenCollection] = useState(false);
  const navigate = useNavigate();
  // Mock model data - replace with actual API call
  const { formReducer, postsReducer } = useSelector(
      (state) => state,
      shallowEqual
  );
  const { status } = postsReducer;
  const shareBtnlabel =
      "Once you've created the image you want, you can share it with others in the community";

  const modelData = {
    1: {
      name: "Material Analysis Model",
      description: "AI model for analyzing material properties and characteristics",
    },
    2: {
      name: "Quality Prediction Model",
      description: "Predictive model for material quality assessment",
    }
  }[modelId];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleShare = () => {
    let image =[resultImage]
    let prompt = imageName
    const args = { image, prompt };
    dispatch(createPost(args));
  };

  const handleSubmit = async () => {
    if (!selectedFile || !imageName) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('filename', imageName);
      const response = await fetch(`${MODEL_DEV_API}/yolo/upload/`, {
        method: 'POST',
        body: formData,
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      console.log("result is",result)

      // Perform the GET request to fetch the list of images
      const getResponse = await fetch('http://localhost:8000/yolo/getImages/');
      // if (!getResponse.ok) {
      //   throw new Error('Failed to fetch images');
      // }
      const data = await getResponse.json();
      const images = data.images;
      if (images.length === 0) {
        throw new Error('No images found');
      }

      const firstImage = images[0];

      const dummyResult = {
        resultImageUrl: `data:image/jpeg;base64,${firstImage.image_data}`,
        _id: '12345', // Replace with actual ID if available
        prompt: imageName,
        image: {
          url: previewUrl,
          public_id: 'public_id', // Replace with actual public ID if available
        },
      };

      setResultImage(dummyResult);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage.resultImageUrl;
      link.download = `processed_${imageName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePreview = () => {
    if (resultImage) {
      const encodedImageUrl = encodeURIComponent(resultImage.resultImageUrl);
      setOpenPostData({
        image: { url: resultImage.resultImageUrl },
        prompt: imageName,
        _id: resultImage._id,
      });
      setOpenPost(true);
    }
  };

  return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          {modelData.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {modelData.description}
        </Typography>

        {openPostData && (
            <PostPreviewModal
                openPost={openPost}
                setOpenPost={setOpenPost}
                openPostData={openPostData}
                community={true}
            />
        )}

        <CreateCollection
            open={openCollection}
            setOpen={setOpenCollection}
        />

        <Grid container spacing={3}>
          {/* Input Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Input Image
                </Typography>

                <TextField
                    fullWidth
                    label="Image Name"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    margin="normal"
                    disabled={resultImage}
                />

                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mt: 2, mb: 2 }}
                >
                  Upload Image
                  <VisuallyHiddenInput type="file" onChange={handleFileSelect} accept="image/*" />
                </Button>

                {previewUrl && (
                    <Box mt={2}>
                      <img
                          src={previewUrl}
                          alt="Preview"
                          style={{ maxWidth: '100%', maxHeight: '300px' }}
                      />
                    </Box>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!selectedFile || !imageName || loading}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Process Image'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Result Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Result
                </Typography>

                {resultImage && (
                    <>
                      <Box
                          sx={{
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                            overflow: 'hidden'
                          }}
                      >
                        {/* Image Container */}
                        <Box
                            sx={{
                              width: '100%',
                              height: '300px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#f5f5f5',
                              borderBottom: '1px solid #eee'
                            }}
                        >
                          <img
                              src={resultImage.resultImageUrl}
                              alt="Result"
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                cursor: 'pointer'
                              }}
                              onClick={handlePreview}
                          />
                        </Box>

                        {/* Result Name Container */}
                        <Box
                            sx={{
                              padding: '16px',
                              borderBottom: '1px solid #eee'
                            }}
                        >
                          <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                color: '#1a1a1a',
                                mb: 1
                              }}
                          >
                          </Typography>
                          <Typography
                              variant="body1"
                              sx={{
                                color: '#4a4a4a',
                                fontFamily: "'Roboto', sans-serif",
                              }}
                          >
                            {imageName}
                          </Typography>
                        </Box>

                        {/* Action Buttons */}
                        <Box
                            sx={{
                              padding: '16px',
                              display: 'flex',
                              gap: 2,
                              justifyContent: 'space-between'
                            }}
                        >
                          <FlexBox columnGap="10px" center>
                            {(
                                <>
                                  <Btn onClick={handleDownload}>
                                    <FileDownloadOutlinedIcon />
                                  </Btn>
                                </>
                            )}
                            {/*<DDButton {...{ resultImage, prompt }} />*/}
                          </FlexBox>

                          {/*Save*/}
                          {/*</Button>*/}
                        </Box>
                      </Box>
                    </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
  );
};

const Btn = styled(Button)(({ mobile }) => ({
  fontWeight: "bold",
  transition: "0.2s",
  minWidth: 0,
  padding: `${mobile === "true" ? "20px" : "8px 12px"}`,
  background: `${shades.secondary[300]}`,
  borderRadius: "5px",
  ":hover": {
    background: `${shades.secondary[100]}`,
  },
}));


export default MLModelUse;
