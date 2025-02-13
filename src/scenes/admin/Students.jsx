import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Modal,
  Card,
  CardContent,
  Grid,
  Button,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { CircularProgress } from '@mui/material';
import {shallowEqual, useSelector} from "react-redux";
import {getAllStudents, updateStudentStatus} from "../../state/userSlice";
// TODO(Amitkumar)
// Add dummy ML models data
// Save it in DB
const AVAILABLE_ML_MODELS = [
  {
    id: 1,
    name: "Material Analysis Model",
    description: "AI model for analyzing material properties",
  },
  {
    id: 3,
    name: "Defect Detection Model",
    description: "AI model for detecting material defects",
  }
];

// Save it in DB
// Update dummy student data to include allowed models
// let Student_list = [
//   {
//     id: 1,
//     username: "john_doe",
//     email: "john@example.com",
//     status: "approved",
//     organization: "University XYZ",
//     description: "Research student in Material Science",
//     joinDate: "2024-03-15",
//     allowedModels: [1, 2],
//   },
//   {
//     id: 2,
//     username: "jane_smith",
//     email: "jane@example.com",
//     status: "pending",
//     organization: "ABC Institute",
//     description: "PhD candidate in Metallurgy",
//     joinDate: "2024-03-16",
//     allowedModels: [2, 3],
//   },
//   {
//     id: 3,
//     username: "mike_wilson",
//     email: "mike@example.com",
//     status: "approved",
//     organization: "Tech University",
//     description: "Masters student in Materials Engineering",
//     joinDate: "2024-03-17",
//     allowedModels: [1],
//   },
//   {
//     id: 4,
//     username: "sarah_johnson",
//     email: "sarah@example.com",
//     status: "rejected",
//     organization: "Research Institute XYZ",
//     description: "Doctoral researcher in Advanced Materials",
//     joinDate: "2024-03-18",
//     allowedModels: [],
//   },
//   {
//     id: 5,
//     username: "alex_brown",
//     email: "alex@example.com",
//     status: "pending",
//     organization: "Materials Lab",
//     description: "Research Assistant",
//     joinDate: "2024-03-19",
//     allowedModels: [2],
//   },
//   {
//     id: 6,
//     username: "emma_davis",
//     email: "emma@example.com",
//     status: "approved",
//     organization: "State University",
//     description: "PhD student in Material Science",
//     joinDate: "2024-03-20",
//     allowedModels: [1, 3],
//   },
//   {
//     id: 7,
//     username: "chris_martin",
//     email: "chris@example.com",
//     status: "pending",
//     organization: "Innovation Labs",
//     description: "Research Fellow",
//     joinDate: "2024-03-21",
//     allowedModels: [],
//   },
//   {
//     id: 8,
//     username: "lisa_white",
//     email: "lisa@example.com",
//     status: "approved",
//     organization: "Materials Research Center",
//     description: "Graduate Researcher",
//     joinDate: "2024-03-22",
//     allowedModels: [2, 3],
//   },
//   {
//     id: 9,
//     username: "david_clark",
//     email: "david@example.com",
//     status: "pending",
//     organization: "Tech Institute",
//     description: "Masters Student",
//     joinDate: "2024-03-23",
//     allowedModels: [1],
//   },
//   {
//     id: 10,
//     username: "amy_taylor",
//     email: "amy@example.com",
//     status: "approved",
//     organization: "Science Academy",
//     description: "Research Scholar",
//     joinDate: "2024-03-24",
//     allowedModels: [1, 2, 3],
//   },
//   {
//     id: 11,
//     username: "peter_anderson",
//     email: "peter@example.com",
//     status: "pending",
//     organization: "Research Hub",
//     description: "PhD Candidate",
//     joinDate: "2024-03-25",
//     allowedModels: [2],
//   },
//   {
//     id: 12,
//     username: "rachel_green",
//     email: "rachel@example.com",
//     status: "approved",
//     organization: "Materials Institute",
//     description: "Senior Researcher",
//     joinDate: "2024-03-26",
//     allowedModels: [1, 3],
//   },
//   {
//     id: 13,
//     username: "tom_wilson",
//     email: "tom@example.com",
//     status: "rejected",
//     organization: "University Lab",
//     description: "Graduate Student",
//     joinDate: "2024-03-27",
//     allowedModels: [],
//   },
//   {
//     id: 14,
//     username: "julia_roberts",
//     email: "julia@example.com",
//     status: "approved",
//     organization: "Science Center",
//     description: "Research Assistant",
//     joinDate: "2024-03-28",
//     allowedModels: [2, 3],
//   },
//   {
//     id: 15,
//     username: "mark_thompson",
//     email: "mark@example.com",
//     status: "pending",
//     organization: "Tech Research Lab",
//     description: "Materials Scientist",
//     joinDate: "2024-03-29",
//     allowedModels: [1, 2],
//   },
// ];

let Student_list = [];
let updateList = false;
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [oldSelectedStatus, setOldSelectedStatus] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const { user } = useSelector(
      (state) => state.userReducer,
      shallowEqual
  );

// TODO(Amitkumar): Need to test
  useEffect(() => {
    if (user && user.isAdmin !== true) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selectedStudent) {
      setSelectedStatus(selectedStudent.status);
      setSelectedModels(selectedStudent.allowedModels || []);
      setHasChanges(false); // Reset changes flag when modal opens
    }
  }, [selectedStudent]);

  useEffect(() => {
    console.log("fetching students Page:",page," rowsPerPage",rowsPerPage);
    const fetchStudents = async () => {
      let students = await getAllStudents(page, rowsPerPage);
      console.log("students", students);
        if (students) {
          setStudents(students);
        }
    };
    fetchStudents();
  }, [page, rowsPerPage, updateList]);



  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setHasChanges(selectedStatus !== oldSelectedStatus);
  };

  const handleModelChange = (event) => {
    setSelectedModels(event.target.value);
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
     const isSuccess = await updateStudentStatus(selectedStudent._id,selectedStatus);
        if(isSuccess) {
          setHasChanges(false);
          setOpenModal(false);
          updateList = !updateList;
        }
        else
          throw("Error in updating student status");
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        setOpenModal(false);
        setSelectedStudent(null);
        setHasChanges(false);
      }
    } else {
      setOpenModal(false);
      setSelectedStudent(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'REJECTED':
        return 'error';
      case 'REQUESTED':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Student Management
        </Typography>

        {/* Add total students count */}
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Total Students: {students.length}
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="student table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Sr. No.</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Organization</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Join Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => (
                  <TableRow
                    key={student._id}
                    hover
                    onClick={(event) => {
                      if (event.target.type !== 'checkbox') {
                        handleRowClick(student);
                      }
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.organization ? student.organization : "Missing"}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        color={getStatusColor(student.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(student.createdAt).toISOString().split('T')[0]}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={students.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
          />
        </TableContainer>

        {/* Detail Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="student-detail-modal"
        >
          <Card sx={modalStyle}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Student Details
              </Typography>

              {selectedStudent && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Name
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedStudent.email}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Organization
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedStudent.organization}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedStudent.description}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="status-select-label">Status</InputLabel>
                      <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={selectedStatus}
                        label="Status"
                        onChange={handleStatusChange}
                        sx={{ minWidth: 120 }}
                      >
                        <SelectMenuItem value="APPROVED">
                          <Chip
                            label="APPROVED"
                            color="success"
                            size="small"
                            sx={{ minWidth: '80px' }}
                          />
                        </SelectMenuItem>
                        <SelectMenuItem value="REQUESTED">
                          <Chip
                              label="REQUESTED"
                              color="info"
                              size="small"
                              sx={{ minWidth: '80px' }}
                          />
                        </SelectMenuItem>
                        <SelectMenuItem value="PENDING">
                          <Chip
                            label="PENDING"
                            color="warning"
                            size="small"
                            sx={{ minWidth: '80px' }}
                          />
                        </SelectMenuItem>
                        <SelectMenuItem value="REJECTED">
                          <Chip
                            label="REJECTED"
                            color="error"
                            size="small"
                            sx={{ minWidth: '80px' }}
                          />
                        </SelectMenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Join Date
                    </Typography>
                    <Typography variant="body1">
                      {selectedStudent.createdAt}
                    </Typography>
                  </Grid>

                  {/*<Grid item xs={12}>*/}
                  {/*  <Typography variant="subtitle2" color="text.secondary" gutterBottom>*/}
                  {/*    ML Model Access*/}
                  {/*  </Typography>*/}
                  {/*  <FormControl fullWidth size="small">*/}
                  {/*    <InputLabel id="model-select-label">Allowed Models</InputLabel>*/}
                  {/*    <Select*/}
                  {/*      labelId="model-select-label"*/}
                  {/*      id="model-select"*/}
                  {/*      multiple*/}
                  {/*      value={selectedModels}*/}
                  {/*      label="Allowed Models"*/}
                  {/*      onChange={handleModelChange}*/}
                  {/*      renderValue={(selected) => (*/}
                  {/*        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>*/}
                  {/*          {selected.map((modelId) => (*/}
                  {/*            <Chip*/}
                  {/*              key={modelId}*/}
                  {/*              label={AVAILABLE_ML_MODELS.find(m => m.id === modelId)?.name}*/}
                  {/*              size="small"*/}
                  {/*              color="primary"*/}
                  {/*            />*/}
                  {/*          ))}*/}
                  {/*        </Box>*/}
                  {/*      )}*/}
                  {/*    >*/}
                  {/*      {AVAILABLE_ML_MODELS.map((model) => (*/}
                  {/*        <SelectMenuItem key={model.id} value={model.id}>*/}
                  {/*          <Box>*/}
                  {/*            <Typography variant="subtitle2">*/}
                  {/*              {model.name}*/}
                  {/*            </Typography>*/}
                  {/*            <Typography variant="caption" color="text.secondary">*/}
                  {/*              {model.description}*/}
                  {/*            </Typography>*/}
                  {/*          </Box>*/}
                  {/*        </SelectMenuItem>*/}
                  {/*      ))}*/}
                  {/*    </Select>*/}
                  {/*  </FormControl>*/}
                  {/*</Grid>*/}

                  <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveChanges}
                      disabled={!hasChanges || isSaving}
                      startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleCloseModal}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </Grid>

                  {/* Optional: Add a helper text to show unsaved changes */}
                  {hasChanges && (
                    <Grid item xs={12}>
                      <Typography variant="caption" color="warning.main">
                        * You have unsaved changes
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Modal>
      </Box>
    </Container>
  );
};

export default Students;
