import { useState } from 'react';
import { Box, Typography, Container, Paper, Avatar, Grid, Card, CardContent, IconButton, Button, Badge } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

// Styled components for the upload functionality
const Input = styled('input')({
  display: 'none',
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));

const AdminProfile = () => {
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const adminInfo = {
    name: "Admin User",
    email: "admin@example.com",
    role: "System Administrator",
    lastLogin: new Date().toLocaleString()
  };

  const handleAvatarChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);

      // Here you would typically upload the file to your server
      // For now, we'll just store it in state
      setAvatar(file);

      // Example of how you might handle the upload:
      // const formData = new FormData();
      // formData.append('avatar', file);
      // try {
      //   const response = await fetch('/api/admin/avatar', {
      //     method: 'POST',
      //     body: formData,
      //   });
      //   const data = await response.json();
      //   if (data.url) {
      //     setPreviewUrl(data.url);
      //   }
      // } catch (error) {
      //   console.error('Error uploading avatar:', error);
      // }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Header Section with Avatar Upload */}
        <Box display="flex" alignItems="center" mb={4}>
          <Box position="relative">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: '#1976d2',
                  cursor: 'pointer'
                }}
                src={previewUrl}
              >
                {!previewUrl && <PersonIcon sx={{ fontSize: 50 }} />}
              </Avatar>
            </StyledBadge>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleAvatarChange}
              />
              <IconButton
                aria-label="upload picture"
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                }}
              >
                <PhotoCameraIcon color="primary" />
              </IconButton>
            </label>
          </Box>

          <Box ml={3}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {adminInfo.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {adminInfo.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {adminInfo.email}
            </Typography>
          </Box>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <SchoolIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                  <Typography variant="h6">Students</Typography>
                </Box>
                <Typography variant="h3" component="div" color="primary">
                  15
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Total registered students
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <AutoFixHighIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                  <Typography variant="h6">microSdetect by theoRmets</Typography>
                </Box>
                <Typography variant="h3" component="div" color="primary">
                  8
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Total available models
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                  <Typography variant="h6">Last Login</Typography>
                </Box>
                <Typography variant="body1" color="primary">
                  {adminInfo.lastLogin}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  System access timestamp
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Info */}
        <Box>
          <Typography variant="h6" gutterBottom color="text.secondary">
            System Information
          </Typography>
          <Typography variant="body1">
            Welcome to your admin dashboard. Here you can monitor student registrations,
            manage microSdetect by theoRmets, and control system settings. Use the navigation menu to
            access different sections.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminProfile;
