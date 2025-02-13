import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { Dialog } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import {updateStudentStatus} from "../../state/userSlice";
import {toast} from "react-toastify";

const MLModels = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const [approvedStatus, setApprovedStatus] = useState(false);
  // Redirect to signin if not logged in
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
    console.log("User: inside mlmodels ", user);
    if(user && user.status!==""){
      setApprovedStatus(user.status);
    }
  }, [user, navigate]);
  const dispatch = useDispatch();
  if (!user) {
    return null;
  }
  const handleRequest = async () => {
      try {
        const isSuccess = await updateStudentStatus(user._id,"REQUESTED");
        toast.info('Request sent successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error saving changes:', error);
        alert('Error saving changes. Please try again.');
      }
   console.log("handle request clicked")
  };
  const models = [
    {
      id: 1,
      name: "Material Analysis Model",
      description: "AI model for analyzing material properties and characteristics",
      status: "Active",
    },
  ];
  switch (approvedStatus) {
    case "APPROVED":
      return (
          <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography variant="h4" gutterBottom>
              microSdetect by theoRmets
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Select a model to get started with your analysis
              </Typography>

              <Grid container spacing={3}>
                {models.map((model) => (
                    <Grid item xs={12} sm={6} md={4} key={model.id}>
                      <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            '&:hover': {
                              boxShadow: 6,
                            }
                          }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h5" component="h2" gutterBottom>
                            {model.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {model.description}
                          </Typography>
                          <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                            Status: {model.status}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                              size="small"
                              color="primary"
                              onClick={() => navigate(`/mlmodels/${model.id}`)}
                          >
                            Use Model
                          </Button>
                          <Button
                              size="small"
                              color="primary"
                              variant="outlined"
                          >
                            View Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
      );
    case "REQUESTED":
      return (
          <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography variant="h4" gutterBottom>
              microSdetect by theoRmets
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Your account is pending approval. Please wait for approval to access microSdetect by theoRmets.
              </Typography>
            </Box>
          </Container>
      );
    case "REJECTED":
      return (
          <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography variant="h4" gutterBottom>
              microSdetect by theoRmets
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Your account has been rejected. Please contact support for further assistance.
              </Typography>
            </Box>
          </Container>
      );
      case "PENDING":
        return (
            <div className="max-w-4xl mx-auto p-6 space-y-8">
              {/* Martensitic Island Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Martensitic Island detection in Bainite
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The Martensitic Site Detection model utilizes the YOLOv5 pre-trained framework to identify
                  martensitic regions in metallurgical samples with a high accuracy of 98.5% mAP. Trained on
                  a robust dataset of approximately 7,000 images, this model is designed for precise and
                  efficient detection across diverse microstructural patterns. Its real-time processing
                  capabilities make it an invaluable tool for automating microstructure analysis in both
                  academic and industrial contexts, providing consistent results and saving time. The model's
                  outputs are easy to interpret, highlighting detected regions with confidence scores, enabling
                  users to streamline research and quality control processes effectively.
                </p>
              </div>

              {/* Porosity Detection Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Porosity detection in Titanium alloys
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The Porosity Detection model employs the YOLOv8 architecture to identify and evaluate
                  porosities in titanium alloys with an accuracy of 72% mAP. Trained on a dataset of
                  approximately 4,000 images, the model leverages YOLOv8's advanced capabilities to detect
                  subtle porosity patterns with improved efficiency. Designed specifically for the intricate
                  microstructures of titanium alloys, this model provides actionable insights into defect
                  distribution, assisting in quality control and enhancing manufacturing processes for
                  high-performance applications.
                </p>
              </div>

              {/* Request Button */}
              <div className="flex justify-center">
                <button
                    onClick={handleRequest}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg
          transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Request Access
                </button>
              </div>

              {/* Modal Dialog */}
              <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className="fixed inset-0 z-10 overflow-y-auto"
              >
                <div className="flex items-center justify-center min-h-screen">
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>

                  <div className="relative bg-white rounded-lg p-8 max-w-md mx-auto">
                    <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
                      Request Submitted
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-600">
                      Your request has been sent to the admin. Please wait for 24 hours.
                      Thank you for using our service!
                    </Dialog.Description>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4
              rounded-lg transition duration-300 ease-in-out"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog>
            </div>
        );
    default:
      return null;
  }
};

export default MLModels;
